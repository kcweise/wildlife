from config import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timedelta
from sqlalchemy.orm import validates

def get_current_time():
    return datetime.now().replace(microsecond=0)

class Photo(db.Model, SerializerMixin):
    __tablename__="photos"
    
    id = db.Column(db.Integer, primary_key=True)
    post_date_time = db.Column(db.DateTime, default=get_current_time)
    taken_date_time = db.Column(db.DateTime, nullable=True)
    title = db.Column(db.String, nullable=True)
    animal = db.Column(db.String, nullable=True )
    description = db.Column(db.String, nullable=True)
    photo_url = db.Column(db.String, nullable=False)
    #blob = db.Column(db.LargeBinary, nullable=True)
    
    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    
    #Relationships
    user = db.relationship("User", back_populates="user_photos")
    photo_access = db.relationship("PhotoAccess", back_populates="photo", cascade="all, delete-orphan")    
    competition_photo = db.relationship("CompetitionPhoto", back_populates="photo", uselist=False, cascade="all, delete-orphan")
    
    #Serializer Rules
    serialize_rules = ("-user.user_photos", "-photo_access.photo","-competition_photo.photo",)
    
    @validates('title')
    def title_val(self, key, value):
        if len(value)>50:
            ValueError("Title must be less than 50 characters")
        return value
    
    @validates('animal')
    def animal_val(self, key, value):
        if len(value)>50:
            ValueError("Animal must be less than 50 characters")
        return value
    
    @validates('post_date_time', 'taken_date_time')
    def validate_date_time(self, key, date_time):
        
        try:
            datetime.datetime.strptime(date_time, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            raise ValueError("Invalid date-time format. Use YYYY-MM-DD HH:MM:SS format.")
               
        return date_time