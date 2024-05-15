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
    photo_url = db.Column(db.String, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    
class PhotoAccess(db.Model, SerializerMixin):
    __tablename__="photo_access"
    
    id = db.Column(db.Integer, primary_key=True)
    access_level = db.Column(db.String)
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))    
    photo_id = db.Column(db.Integer, db.ForeignKey("photo.id"))