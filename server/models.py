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
    
    #Relationships
    user_photos = db.relationship("Photo", back_populates="users")
    user_access = db.relationship("PhotoAccess", back_populates="users")
    user_comp_photos = db.relationship("CompetitionPhoto", back_populates="users")
    user_posted_ratings = db.relationship("Rating", back_populates="users")
    
class Photo(db.Model, SerializerMixin):
    __tablename__="photos"
    
    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.String)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    photo_url = db.Column(db.String, nullable=False)
    
    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    
    #Relationships
    user = db.relationship("User", back_populates="user_photos")
    photo_access = db.relationship("PhotoAccess", back_populates="photo")    
    competition_photo = db.relationship("CompetitionPhoto", back_populates="photo", uselist=False)
    
class PhotoAccess(db.Model, SerializerMixin):
    __tablename__="photo_access"
    
    id = db.Column(db.Integer, primary_key=True)
    access_level = db.Column(db.String)
    
    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))    
    photo_id = db.Column(db.Integer, db.ForeignKey("photo.id"))
    
    #Relationships
    user = db.relationship("User", back_populates="user_access")
    photo = db.relationship("Photo", back_populates="photo_access")
    
class CompetitionPhoto(db.Model, SerializerMixin):
    __tablename__="competition_photos"
    
    id = db.Column(db.Integer, primary_key=True)
    votes = db.Column(db.Integer, nullable=False)
    
    #Foreign Keys
    competition_id = db.Column(db.Integer, db.ForeignKey("competition.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))    
    photo_id = db.Column(db.Integer, db.ForeignKey("photo.id"))
    
    #Relationships
    user = db.relationship("User", back_populates="user_comp_photos")
    photo = db.relationship("Photo", back_populates="competition_photo")
    competition = db.relationship("Competition", back_populates="competition_photos")
    competition_photo_ratings = db.relationship("Rating", back_populates="competition_photos")
    
class Competition(db.Model, SerializerMixin):
    __tablename__="competitions"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    start_date = db.Column(db.String, nullable=False)
    end_date = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    
    #Foreign Keys
    winner_id = db.Column(db.Integer, db.ForeignKey("competition_photos.id"), nullable=True, default=None)
    
    #Relationships
    competition_photos = db.relationship("CompetitionPhoto", back_populates="competition")
    
    
class Rating(db.Model, SerializerMixin):
    __tablename__="ratings"
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)
    
    #Foreign Keys
    comp_photo_id = db.Column(db.Integer, db.ForeignKey("competition_photos.id"))
    user_rated_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    
    #Relationships
    user_rated = db.relationship("User", back_populates="user_posted_ratings")
    competition_photos = db.relationship("CompetitionPhoto", back_populates="competition_photo_ratings")
        