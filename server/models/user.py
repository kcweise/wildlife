

from config import db, SerializerMixin, validates



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
    user_photos = db.relationship("Photo", back_populates="users", cascade="all, delete orphan")
    user_access = db.relationship("PhotoAccess", back_populates="users", cascade="all, delete orphan")
    user_comp_photos = db.relationship("CompetitionPhoto", back_populates="users", cascade="all, delete orphan")
    user_posted_ratings = db.relationship("Rating", back_populates="users", cascade="all, delete orphan")
    
    #Serializer Rules
    serialize_rules = ("-user_photos.users","-user_access.users","-user_comp_photos.users","-user_posted_ratings.users",)