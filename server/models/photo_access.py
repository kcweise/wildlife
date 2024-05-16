
from config import db, SerializerMixin, validates


class PhotoAccess(db.Model, SerializerMixin):
    __tablename__="photo_access"
    
    id = db.Column(db.Integer, primary_key=True)
    access_level = db.Column(db.String)
    
    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))    
    photo_id = db.Column(db.Integer, db.ForeignKey("photo.id"))
    
    #Relationships
    user = db.relationship("User", back_populates="user_access")
    photo = db.relationship("Photo", back_populates="photo_access")
    
    #Serializer Rules
    serialize_rules = ("-user.user_access","-photo.photo_access",)