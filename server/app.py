from flask import Flask, request, jsonify, make_response, session
from flask_cors import CORS
from flask_restful import Resource, Api
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token, 
    jwt_required, get_jwt_identity, set_access_cookies, 
    set_refresh_cookies, unset_jwt_cookies)
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timedelta

# Importing models triggers __init__.py to register all imports within
from models import User, Photo, Competition, CompetitionPhoto, Rating
from config import Config, db, migrate

# Instantiate app, set attributes
app = Flask(__name__)
app.config.from_object(Config)  # Load the config from Config class
#bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Instantiate db and migrate
db.init_app(app)
migrate.init_app(app, db)


# Instantiate REST API
api = Api(app)

# Enable CORS
CORS(app, supports_credentials=True, origins=["http://127.0.0.1:4000"])



@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):

    def post(self):

        data = request.get_json()

        first_name = data.get("first_name")
        last_name = data.get("last_name")
        username = data.get("username")
        password = data.get("password")
        phone = data.get("phone")
        email = data.get("email")
        
        


        user = User(
            first_name=first_name,
            last_name=last_name,
            username=username,
            password=password,
            phone=phone,
            email=email,
            )
        
        try:

            db.session.add(user)
            db.session.commit()

            #session["user_id"] = user.id  # session is a dictionary that stores user_id

            return make_response(user.to_dict(), 201)

        except IntegrityError:

            return {"error": "422 Unprocessable Entity"}, 422


api.add_resource(Signup, "/signup", endpoint="signup")


class PublicUsers(Resource):
    def get(self):
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        users = User.query.filter_by(public_private=1).paginate(page=page, per_page=per_page, error_out=False)

        return jsonify({
            'total': users.total,
            'pages': users.pages,
            'current_page': users.page,
            'users': [user.to_dict(rules = ("-user_photos.user", "-user_posted_ratings",)) for user in users.items]
        })
    
api.add_resource(PublicUsers, "/public_users")

class UserById(Resource):
 
    def patch(self, id):
        user = User.query.filter_by(id=id).first()

        if not user:
            return make_response({"error": "user not found"}, 404)

        try:
            data = request.get_json()
            for attr in data:
                setattr(user, attr, data.get(attr))
                          
            db.session.commit()
            
            updated_user = User.query.get(id)
            
            if not updated_user:
                return make_response({"error": "User not found"}, 404)
            
            return make_response({"message": "User updated", "user": updated_user.to_dict()}, 200)

        except ValueError:
            return ({"errors": ["validation errors"]}, 400)
        
api.add_resource(UserById, "/user/<int:id>")



class Competitions(Resource):
    def get(self):
        current_datetime = datetime.now()
        comps = Competition.query.all()
        
        if comps:
            past_comps = [comp.to_dict() 
                          for comp in comps if comp.end_date < current_datetime]
            active_comps = [comp.to_dict() for comp in comps if comp.start_date <= 
                            current_datetime <= comp.end_date]
            future_comps = [comp.to_dict() for comp in comps if comp.start_date >
                            current_datetime]
        
        return make_response({
            "active_competitions": active_comps,
            "future_competitions": future_comps,
            "past_competitions": past_comps}, 200)
    
api.add_resource(Competitions, "/competitions")

class EnterCompetitionPhoto(Resource):
    def post(self, competition_id):
        # Get the photo ID from the request body
        data = request.get_json()
        photo_id = data.get('photo_id')

        # Validates that the required fields are provided
        if not photo_id:
            return make_response(jsonify({'error': 'Photo ID is required'}), 400)

        # Check if the photo is already entered in the competition
        existing_entry = CompetitionPhoto.query.filter_by(competition_id=competition_id, photo_id=photo_id).first()
        if existing_entry:
            return make_response(jsonify({'error': 'Photo already entered in the competition'}), 400)
         
        photo = Photo.query.get(photo_id)
        if not photo:
            return make_response(jsonify({'error': 'Photo not found'}), 404)
        
        user_id = photo.user_id
        # Create a new competition photo entry
        new_entry = CompetitionPhoto(competition_id=competition_id, photo_id=photo_id, user_id=user_id)

        try:
            # Add the new entry to the database
            db.session.add(new_entry)
            db.session.commit()
            
            updated_user = User.query.get(new_entry.photo.user_id)

            return make_response(jsonify({'message': 'Photo successfully entered in the competition', 'user': updated_user.to_dict(rules = ("-user_posted_ratings.user",))}), 201)
        except Exception as e:
            # If an error occurs, rollback the transaction and return an error response
            db.session.rollback()
            return make_response(jsonify({'error': str(e)}), 500)
        
api.add_resource(EnterCompetitionPhoto, "/competition-photos/<int:competition_id>/enter")
        

class Login(Resource):
    
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()
        
        if user and user.password == password:
            access_token = create_access_token(identity = {'username': user.username})
            refresh_token = create_refresh_token(identity = {'username': user.username})
            
            response = make_response(jsonify ({'msg': 'Login Successful', 'user': user.to_dict(rules = ('-user_photos.user',"-user_posted_ratings.user",))}), 200)
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)
            return response
        
        return {'error': 'Incorrect username or password'}, 401

api.add_resource(Login, '/login')


class Logout(Resource):
    def post(self):
        response = make_response(jsonify({'msg': 'Logout Successful'}), 200)
        unset_jwt_cookies(response)
        
        return response
    
api.add_resource(Logout, '/logout')


class Protected(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        return jsonify(logged_in_as = current_user)
    
api.add_resource(Protected, '/protected')


class PhotosByUserId(Resource):
    def get(self, id):
        user = User.query.get(id)
        photos = Photo.query.filter_by(user_id=user.id).all()
        
        if not photos:
            return{'message': 'No photos found for this user'}, 404
        
        return [photo.to_dict(rules=("-user",)) for photo in photos], 200
    
    def post(self, id):
                
        user = User.query.get(id)
        if not user:
            return make_response({'message': 'User not found'}, 404)
        
        try:
            data = request.get_json()
            title = data.get("title")
            animal = data.get("animal")
            description = data.get("description")
            photo_url = data.get("photo_url")
                                
            # if file:
            #     # Save the file to a directory and get the file URL
            #     photos_dir = os.path.join(os.getcwd(), 'client', 'photos')
            #     if not os.path.exists(photos_dir):
            #         os.makedirs(photos_dir)
            #     file_path = os.path.join(photos_dir, file.filename)
            #     file.save(file_path)
            #     photo_url = f'/photos/{file.filename}'
            
            if not photo_url:
                return make_response(jsonify({'message': 'No photo URL provided'}), 400)
                
            photo = Photo(
                title=title,
                animal=animal,
                description=description,
                photo_url=photo_url,
                user_id=id
            )
            db.session.add(photo)
            db.session.commit()
            
            updated_user = User.query.get(id)
            
            return make_response(updated_user.to_dict(rules = ("-user_posted_ratings.user",)), 201)
        
        except ValueError:
            return make_response({"error": ["Validation errors"]}, 400)
    
api.add_resource(PhotosByUserId, "/users/<int:id>/photos")




class Photos(Resource):

    def get(self):
        photos = Photo.query.all()
        
        
        if not photos:
            return{'message': 'No photos found for this user'}, 404
        
        return [photo.to_dict(rules=("-user",)) for photo in photos], 200
    
api.add_resource(Photos, "/photos")


class PhotosById(Resource):
 
    def patch(self, id):
        photo = Photo.query.filter_by(id=id).first()

        if not photo:
            return make_response({"error": "photo not found"}, 404)

        try:
            data = request.get_json()
            for attr in data:
                setattr(photo, attr, data.get(attr))
                
            user_id = photo.user_id
            #db.session.add(photo)
            db.session.commit()
            
            updated_user = User.query.get(user_id)
            
            if not updated_user:
                return make_response({"error": "User not found"}, 404)
            
            return make_response({"message": "Photo updated", "user": updated_user.to_dict(rules = ("-user_posted_ratings.user",))}, 200)

        except ValueError:
            return ({"errors": ["validation errors"]}, 400)
            
    def delete(self, id):
        photo = Photo.query.filter_by(id=id).first()

        if not photo:
            return make_response({"error": "photo not found"}, 404)

        try:
            user_id = photo.user_id
            db.session.delete(photo)
            db.session.commit()
            
            updated_user = User.query.get(user_id)
            
            if not updated_user:
                return make_response({"error": "User not found"}, 404)
            
            return make_response({"message": "Photo deleted", "user": updated_user.to_dict(rules = ("-user_posted_ratings.user",))}, 200)

        except Exception as e:
            print(f"Error deleting photo: {str(e)}")
            return ({"errors": ["validation errors"]}, 400)
        
api.add_resource(PhotosById, "/photos/<int:id>")

class Vote(Resource):
    def post(self):
                
        data = request.get_json()
        
        id = data.get('user_id')
        
        try:
            new_rating = Rating(
            rating = 1,
            created_at=datetime.now(),
            comp_photo_id = data.get('photo_id'),
            user_rated_id= data.get('user_id'),
            )
            
            
            db.session.add(new_rating)
            db.session.commit()
            
            updated_user = User.query.get(id)
            
            if updated_user:
                return make_response(jsonify({"message": "Vote submitted successfully", 
                                              "user": updated_user.to_dict()}), 200)
            else:
                return jsonify({"message": "User not found"}), 404
            
        except Exception as e:
            return jsonify({"message": f"Error submitting vote: {str(e)}"}), 500
        
api.add_resource(Vote, '/ratings')
 
class CompVoting(Resource):
    
    def patch(self, id):
        
        
        competition_photo = CompetitionPhoto.query.filter_by(id=id).first()

        if not competition_photo:
            return make_response({"error": "photo not found"}, 404)

        try:
                          
            competition_photo.votes +=1
            
            db.session.commit()
            
            return make_response({"message": "Photo updated", "competition_photo": competition_photo.to_dict()}, 200)

        except Exception as e:
            return make_response({"errors": [str(e)]}, 400)
        
api.add_resource(CompVoting, '/vote/<int:id>')

class UserVote(Resource):
    def get(self, id, competition_id):
        user = User.query.get(id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        one_day_ago = datetime.utcnow() - timedelta(days=1)
        votes = db.session.query(Rating).join(CompetitionPhoto, CompetitionPhoto.id == Rating.comp_photo_id) \
                .join(User, User.id == Rating.user_rated_id) \
                .filter(User.id == id, CompetitionPhoto.competition_id == competition_id, Rating.created_at > one_day_ago).all()

        votes_data = [{'photo_id': vote.competition_photos.photo_id, 'competition_id': vote.competition_photos.competition_id, 'created_at': vote.created_at} for vote in votes]

        return jsonify({'votes': votes_data})

api.add_resource(UserVote, '/user/<int:id>/competition/<int:competition_id>/votes')
    

             


if __name__ == '__main__':
    app.run(port=5555, debug=True)

