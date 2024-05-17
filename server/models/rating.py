
from config import db, SerializerMixin, validates, datetime


class Rating(db.Model, SerializerMixin):
    __tablename__="ratings"
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    
    #Foreign Keys
    comp_photo_id = db.Column(db.Integer, db.ForeignKey("competition_photos.id"))
    user_rated_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    
    #Relationships
    user_rated = db.relationship("User", back_populates="user_posted_ratings")
    competition_photos = db.relationship("CompetitionPhoto", back_populates="competition_photo_ratings")
    
    #Serializer Rules
    serialize_rules = ("-user_rated.user_posted_ratings", "-competition_photos.competition_photo_ratings", )