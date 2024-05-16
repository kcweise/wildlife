
from config import db, SerializerMixin, validates, datetime

class Photo(db.Model, SerializerMixin):
    __tablename__="photos"
    
    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.DateTime)
    title = db.Column(db.String, nullable=True)
    animal = db.Column(db.String, nullable=True )
    description = db.Column(db.String, nullable=True)
    photo_url = db.Column(db.String, nullable=False)
    blob = db.Column(db.LargeBinary, nullable=True)
    
    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    
    #Relationships
    user = db.relationship("User", back_populates="user_photos")
    photo_access = db.relationship("PhotoAccess", back_populates="photo", cascade="all, delete orphan")    
    competition_photo = db.relationship("CompetitionPhoto", back_populates="photo", uselist=False, cascade="all, delete orphan")
    
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
    
    @validates('date_time')
    def validate_date_time(self, key, date_time):
        
        try:
            datetime.datetime.strptime(date_time, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            raise ValueError("Invalid date-time format. Use YYYY-MM-DD HH:MM:SS format.")
               
        return date_time