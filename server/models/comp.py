
from config import db, SerializerMixin, validates



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
    competition_photos = db.relationship("CompetitionPhoto", back_populates="competition", cascade="all, delete orphan")
    
    #Serializer Rules
    serialize_rules = ("-competition_photos.competition", )