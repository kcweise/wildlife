
from config import db, SerializerMixin, validates, datetime



class Competition(db.Model, SerializerMixin):
    __tablename__="competitions"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String, nullable=False)
    
    #Foreign Keys
    winner_id = db.Column(db.Integer, db.ForeignKey("competition_photos.id"), nullable=True, default=None)
    
    #Relationships
    competition_photos = db.relationship("CompetitionPhoto", back_populates="competition", cascade="all, delete-orphan")
    
    #Serializer Rules
    serialize_rules = ("-competition_photos.competition", )
    
    @validates('start_date', 'end_date')
    def validate_date_time(self, key, date_time):
        
        try:
            datetime.datetime.strptime(date_time, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            raise ValueError("Invalid date-time format. Use YYYY-MM-DD HH:MM:SS format.")
               
        return date_time