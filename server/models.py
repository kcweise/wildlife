from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from flask_sqlalchemy import SQLAlchemy  # add to pipfile
from sqlalchemy import MetaData, func  # add to pipfile
from sqlalchemy.orm import validates  # add to pipfile
from datetime import datetime, timedelta  # add to pipfile
import re  # add to pipfile

from config import db

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

class User (db.Model, SerializerMixin):
    __tablename__= "users"
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True) 
    
class Photo(db.Model, SerializerMixin):
    __tablename__="photos"
    
    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.String)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    photo_url = db.Column(db.String, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    
class PhotoAccess(db.Model, SerializerMixin):
    __tablename__="photo_access"
    
    id = db.Column(db.Integer, primary_key=True)
    access_level = db.Column(db.String)
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))    
    photo_id = db.Column(db.Integer, db.ForeignKey("photo.id"))
    
class CompetitionPhoto(db.Model, SerializerMixin):
    __tablename__="competition_photos"
    
    id = db.Column(db.Integer, primary_key=True)
    votes = db.Column(db.Integer, nullable=False)
    
    competition_id = db.Column(db.Integer, db.ForeignKey("competition.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))    
    photo_id = db.Column(db.Integer, db.ForeignKey("photo.id"))
    
class Competition(db.Model, SerializerMixin):
    __tablename__="competitions"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    start_date = db.Column(db.String, nullable=False)
    end_date = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    
    winner_id = db.Column(db.Intger, db.ForeignKey("competition_photos.id"), nullable=True, default=None)
    
    
class Rating(db.Model, SerializerMixin):
    __tablename__="ratings"
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String, nullable=True)
    created_at = db.Column(db.Datetime, nullable=False, default =datetime.datetime.now)
    
    comp_photo_id = db.Column(db.Integer, db.ForeignKey("competition_photos.id"))
    user_rated_id = db.Column(db.Integer, db.ForeignKey("users.id"))
        