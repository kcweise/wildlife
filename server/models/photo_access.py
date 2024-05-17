
from config import db, SerializerMixin, validates


class PhotoAccess(db.Model, SerializerMixin):
    __tablename__="photo_access"
    
    id = db.Column(db.Integer, primary_key=True)
    access_level = db.Column(db.Integer, default=0)
    
    #Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))    
    photo_id = db.Column(db.Integer, db.ForeignKey("photos.id"))
    
    #Relationships
    user = db.relationship("User", back_populates="user_access")
    photo = db.relationship("Photo", back_populates="photo_access")
    
    #Serializer Rules
    serialize_rules = ("-user.user_access","-photo.photo_access",)
    
    @validates('access_level')
    def access_val(self, key, value):
        if 0>value>2:
            ValueError("Invalid access")
        return value