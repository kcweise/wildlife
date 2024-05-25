
from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timedelta
from sqlalchemy.orm import validates
import re

def get_current_time():
    return datetime.now().replace(microsecond=0)
class User (db.Model, SerializerMixin):
    __tablename__= "users"
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    created_date = db.Column(db.DateTime, default=get_current_time)
    public_private = db.Column(db.Integer, nullable=False, default=0)
    
    #Relationships
    user_photos = db.relationship("Photo", back_populates="user", cascade="all, delete-orphan")
    user_access = db.relationship("PhotoAccess", back_populates="user", cascade="all, delete-orphan")
    user_comp_photos = db.relationship("CompetitionPhoto", back_populates="user", cascade="all, delete-orphan")
    user_posted_ratings = db.relationship("Rating", back_populates="user", cascade="all, delete-orphan")
    
    #Serializer Rules
    serialize_rules = ("-user_photos.users","-user_access.users","-user_comp_photos.users","-user_posted_ratings.users",)
    
    @validates('phone')
    def validate_phone(self, key, value):
        phone_regex = r'^\(\d{3}\)-\d{3}-\d{4}$'
        if not re.match(phone_regex, value):
            raise ValueError("Invalid phone number format. Please use (xxx)-xxx-xxxx format.")
        return value
    
    @validates ('email')
    def validate_email(self, key, value):
        email_regex = r'^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$'
        if not re.match(email_regex, value):
            raise ValueError("Invalid email address")
        return value

    