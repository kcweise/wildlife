
from config import db, SerializerMixin, validates

class Photo(db.Model, SerializerMixin):
    __tablename__="photos"
    
    id = db.Column(db.Integer, primary_key=True)
    date_time = db.Column(db.String)
    title = db.Column(db.String, nullable=True)
    animal = db.Column(db.String, nullable=True )
    description = db.Column(db.String, nullable=True)
    photo_url = db.Column(db.String, nullable=False)
    
    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    
    #Relationships
    user = db.relationship("User", back_populates="user_photos")
    photo_access = db.relationship("PhotoAccess", back_populates="photo", cascade="all, delete orphan")    
    competition_photo = db.relationship("CompetitionPhoto", back_populates="photo", uselist=False, cascade="all, delete orphan")
    
    #Serializer Rules
    serialize_rules = ("-user.user_photos", "-photo_access.photo","-competition_photo.photo",)