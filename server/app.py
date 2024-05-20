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
import re

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
CORS(app)



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
    
    def post():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()
        
        if user and user.password == password:
            access_token = create_access_token(identity = {'username': user.username})
            refresh_token = create_refresh_token(identity = {'username': user.username})
            
            response = make_response(jsonify ({'msg': 'Login Successful'}), 200)
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)
            return response
        
        return jsonify({'msg': 'Bad username or password'}), 401

api.add_resource(Login, '/login')


class Logout(Resource):
    def post():
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
    






if __name__ == '__main__':
    app.run(port=5555, debug=True)

