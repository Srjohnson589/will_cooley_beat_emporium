from config import db
from flask_restful import Resource
from flask import request
# from datetime import datetime, date, timedelta
from dateutil import parser
from models.rentals import Rental

class Rentals(Resource):
  def get(self):
    rentals = [rental.to_dict() for rental in Rental.query.all()]
    return rentals, 200
  
  def post(self):
    data=request.get_json()

    if isinstance(data, dict):
      data = [data]

    rentals_return = []
    
    try:
      for rental in data:
    
        start_obj = parser.parse(rental.get('start_date'))
        return_obj = parser.parse(rental.get('return_date'))
        created_obj = parser.parse(rental.get('created_at'))
        
        rental_to_save = Rental(
          user_id = rental.get('user_id'),
          instrument_id = rental.get('instrument_id'),
          created_at = created_obj,
          start_date = start_obj,
          return_date = return_obj,
        )

        db.session.add(rental_to_save)
        db.session.commit()

        rentals_return.append(rental_to_save.to_dict())
    except:
      error = {'error': 'there was a problem creating the rental(s)'}
      return error, 422
    return rentals_return, 200
