from flask import Flask, request, jsonify, make_response, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token, 
    jwt_required, get_jwt_identity, set_access_cookies, 
    set_refresh_cookies, unset_jwt_cookies)
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timedelta
import os

# Importing models triggers __init__.py to register all imports within
from models import User, Photo, PhotoAccess, Competition, CompetitionPhoto, Rating
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

        request_json = request.get_json()

        first_name = request_json.get("first_name")
        last_name = request_json.get("last_name")
        username = request_json.get("username")
        password = request_json.get("password")
        phone = request_json.get("phone")
        email = request_json.get("email")
        #created_date = request_json.get(


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

            session["user_id"] = user.id  # session is a dictionary that stores user_id

            return user.to_dict(), 201

        except IntegrityError:

            return {"error": "422 Unprocessable Entity"}, 422


api.add_resource(Signup, "/signup", endpoint="signup")



class ActiveCompetitions(Resource):
    def get(self):
        current_datetime = datetime.now()
        comps = Competition.query.all()
        
        if comps:
            active_comps = [comp.to_dict() for comp in comps if comp.start_date <= 
                        current_datetime <= comp.end_date]
        
        return make_response(active_comps, 200)
    
api.add_resource(ActiveCompetitions, "/active_competitions")

class Login(Resource):
    
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()
        
        if user and user.password == password:
            access_token = create_access_token(identity = {'username': user.username})
            refresh_token = create_refresh_token(identity = {'username': user.username})
            
            response = make_response(jsonify ({'msg': 'Login Successful', 'user': user.to_dict(rules = ('-user_photos.user',))}), 200)
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)
            return response
        
        return jsonify({'msg': 'Bad username or password'}), 401

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
            
            return make_response(updated_user.to_dict(), 201)
        
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
        photo = Photo.query.filter_by(id=id).all()

        if not photo:
            return make_response({"error": "photo not found"}, 404)

        try:
            data = request.get_json()
            for attr in data:
                setattr(photo, attr, data.get(attr))

            db.session.add(photo)
            db.session.commit()
            return make_response(
                photo.to_dict(), 202
            )

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
            
            return make_response({"message": "Photo deleted", "user": updated_user.to_dict()}, 200)

        except Exception as e:
            print(f"Error deleting photo: {str(e)}")
            return ({"errors": ["validation errors"]}, 400)
        
api.add_resource(PhotosById, "/photos/<int:id>")
 
 
        
    
    






if __name__ == '__main__':
    app.run(port=5555, debug=True)

