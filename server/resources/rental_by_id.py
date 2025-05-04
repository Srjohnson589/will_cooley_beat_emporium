from config import app, api, db
from flask_restful import Resource
from flask import request, session

from models.rentals import Rental

class RentalByID(Resource):
    def get(self, id):
        try:
            rental = Rental.query.filter(Rental.id == id).first()
            rental_dict = rental.to_dict()
            return rental_dict, 200
        except:
            error = {'error': 'problem getting rental: {id}'}
            return error, 400
    
    def delete(self, id):
        try:
            rental = Rental.query.filter(Rental.id == id).first()

            db.session.delete(rental)
            db.session.commit()

            return {'success-message': 'the rental {id} was successfully deleted'}, 200
        except:
            error = {'error': 'problem deleting rental: {id}'}
            return error, 422