from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

from config import db


class Rental(db.Model, SerializerMixin):
    __tablename__ = 'rentals'

    serialize_rules = ('-user.rentals', '-user.reviews', '-user.instruments', 
                       '-instrument.rentals', '-instrument.reviews', '-review',)

    id=db.Column(db.Integer, primary_key=True)

    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    instrument_id=db.Column(db.Integer, db.ForeignKey('instruments.id'))

    created_at=db.Column(db.DateTime)
    start_date=db.Column(db.DateTime)
    return_date=db.Column(db.DateTime)

    user = db.relationship('User', back_populates='rentals')
    instrument = db.relationship('Instrument', back_populates='rentals')
    review = db.relationship('Review', back_populates='rentals', cascade='all, delete-orphan')

    def __repr__(self):
        user=self.user.first_name if self.user else None
        instrument=self.instrument.name if self.instrument else None
        return f'<Rental user: {user}, instrument: {instrument}'