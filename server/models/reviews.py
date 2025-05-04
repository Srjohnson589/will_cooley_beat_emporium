from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('-user.reviews', '-user.instruments', '-user.rentals', '-user.id', '-rentals', '-instrument.reviews', '-instrument.id',)


    id=db.Column(db.Integer, primary_key=True)

    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    instrument_id=db.Column(db.Integer, db.ForeignKey('instruments.id'))
    rental_id=db.Column(db.Integer, db.ForeignKey('rentals.id'))
    
    created_at=db.Column(db.DateTime)
    content=db.Column(db.String, default='')

    user = db.relationship('User', back_populates='reviews')
    rentals = db.relationship('Rental', back_populates='review')
    instrument = db.relationship('Instrument', back_populates='reviews')

    @validates('content')
    def validate_content(self, key,  content):
        if isinstance(content, str) and (10 <= len(content) <=250):
            return content
        else:
            raise ValueError('content must be a string between 10 and 150 characters')


    

