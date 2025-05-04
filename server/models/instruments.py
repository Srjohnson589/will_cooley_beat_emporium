from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db

class Instrument(db.Model, SerializerMixin):
    __tablename__ = 'instruments'

    serialize_rules = ('-users', '-rentals.instrument','-reviews.instrument',)

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    brand=db.Column(db.String, nullable=False)
    model=db.Column(db.String, nullable=False)
    size=db.Column(db.String, nullable=False)
    color=db.Column(db.String, nullable=False)
    description=db.Column(db.String, nullable=False)
    image=db.Column(db.String, nullable=False)

    for_rent=db.Column(db.Boolean)
    rent_price=db.Column(db.Integer, nullable=False)
    sale_price=db.Column(db.Integer, nullable=False)
    in_stock=db.Column(db.Boolean)

    reviews = db.relationship('Review', back_populates='instrument', cascade='all, delete-orphan')
    rentals = db.relationship('Rental', back_populates='instrument', cascade='all, delete-orphan')
    users = db.relationship('User', secondary='rentals', back_populates='instruments')

    @validates('name')
    def validate_name(self, key, name):
        if isinstance(name, str) and (2 <=len(name) <=25):
            return name
        else:
            raise ValueError('name must be a string between 2 and 25 characters')
    
    @validates('brand')
    def validate_brand(self, key, brand):
        if isinstance(brand, str) and (2 <=len(brand) <=15):
            return brand
        else:
            raise ValueError('brand must be a string between 2 and 15 characters')
        
    @validates('model')
    def validate_model(self, key, model):
        if isinstance(model, str) and (2 <=len(model) <=15):
            return model
        else:
            raise ValueError('model must be a string between 2 and 15 characters')
        
    @validates('size')
    def validate_size(self, key, size):
        if isinstance(size, str) and (len(size) <=15):
            return size
        else:
            raise ValueError('size must be less than 15 characters')
        
    @validates('color')
    def validate_color(self, key, color):
        if isinstance(color, str) and (2 <=len(color) <=15):
            return color
        else:
            raise ValueError('color must be a string between 2 and 15 characters')
    
    @validates('description')
    def validate_description(self, key, description):
        if isinstance(description, str) and (10 <=len(description) <=275):
            return description
        else:
            raise ValueError('description must be a string between 5 and 300 characters')
        
    @validates('image')
    def validate_image(self, key, image):
        if isinstance(image, str) and (len(image) <=300):
            return image
        else:
            raise ValueError('image must be a string less than 150 characters')
    
    @validates('for_rent')
    def validate_for_rent(self, key, for_rent):
        if isinstance(for_rent, bool):
            return for_rent
        else:
            raise ValueError('for_rent must be a boolean')
        
    @validates('rent_price')
    def validate_rent_price(self, key, rent_price):
        if isinstance(rent_price, int):
            return rent_price
        else:
            raise ValueError('rent_price must be an integer')
        
    @validates('sale_price')
    def validate_sale_price(self, key, sale_price):
        if isinstance(sale_price, int):
            return sale_price
        else:
            raise ValueError('sale_price must be an integer')
    
    @validates('in_stock')
    def validate_in_stock(self, key, in_stock):
        if isinstance(in_stock, bool):
            return in_stock
        else:
            raise ValueError('in_stock must be a boolean')
        
   
        
    

    
