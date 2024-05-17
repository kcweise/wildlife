
from config import db, SerializerMixin, validates


class CompetitionPhoto(db.Model, SerializerMixin):
    __tablename__="competition_photos"
    
    id = db.Column(db.Integer, primary_key=True)
    votes = db.Column(db.Integer, nullable=False, default=None)
    
    #Foreign Keys
    competition_id = db.Column(db.Integer, db.ForeignKey("competitions.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))    
    photo_id = db.Column(db.Integer, db.ForeignKey("photos.id"))
    
    #Relationships
    user = db.relationship("User", back_populates="user_comp_photos")
    photo = db.relationship("Photo", back_populates="competition_photo")
    competition = db.relationship("Competition", back_populates="competition_photos", cascade="all, delete-orphan")
    competition_photo_ratings = db.relationship("Rating", back_populates="competition_photos", cascade="all, delete-orphan")
    
    #Serializer Rules
    serialize_rules = ("-user.user_comp_photos","-photo.competition_photo", "-competition.competition_photos", "-competition_photo_ratings.competition_photos", )