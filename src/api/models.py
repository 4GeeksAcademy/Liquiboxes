from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.dialects.postgresql import ARRAY

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(300), nullable=False)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    
    def __repr__(self):
        return f'<User {self.email}>'
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }

class Shop(db.Model):
    __tablename__ = "shop"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    user = db.relationship('User', backref=db.backref('shops', lazy=True))
    mystery_boxes = db.relationship('MysteryBox', backref='shop', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id
        }

class MysteryBox(db.Model):
    __tablename__ = "mystery_box"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    size = db.Column(db.String(20), nullable=False)
    possible_items = db.Column(ARRAY(db.String), nullable=False)
    image_url = db.Column(db.String(200), nullable=False)
    number_of_items = db.Column(db.Integer, nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey('shop.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'size': self.size,
            'possible_items': self.possible_items,
            'image_url': self.image_url,
            'number_of_items': self.number_of_items,
            'shop_id': self.shop_id
        }