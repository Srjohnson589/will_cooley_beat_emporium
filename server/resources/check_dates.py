from config import app, api, db
from flask_restful import Resource
from flask import request
from datetime import datetime, date, timedelta
from dateutil import parser

from models.rentals import Rental
from models.instruments import Instrument

class CheckDates(Resource):
  def get(self):
    rentals = [rental.to_dict() for rental in Rental.query.all()]
    return rentals, 200
  
  def post(self):
    data=request.get_json()

    if isinstance(data, dict):
      data = [data]

    error_dict = {}

    for rental_request in data:
      instrument_id = rental_request['instrument_id']
      incoming_start = rental_request['start_date']
      incoming_end = rental_request['return_date']

      date_format = '%Y-%m-%d'

      incoming_start_obj = datetime.strptime(incoming_start.split('T')[0], date_format)
      incoming_end_obj = datetime.strptime(incoming_end.split('T')[0], date_format)

      rental_conflicts = Rental.query.filter(
        Rental.instrument_id == instrument_id,
        Rental.start_date <= incoming_end_obj,
        Rental.return_date >= incoming_start_obj
      ).all()

      if rental_conflicts:
        conflicting_dates = [
          {"start_date": rental.start_date.strftime('%Y-%m-%d'),
           "return_date": rental.return_date.strftime('%Y-%m-%d')
          }
          for rental in rental_conflicts
        ]

        error_dict[instrument_id] = {
          "message": "Uh oh - you got conflicting dates",
          "conflicting dates": conflicting_dates
        }

      if any(values for values in error_dict.values()):
        error = {"conflict": True, "message": "Uh oh - You got conflicting dates", "conflicting_dates": error_dict}
        return error, 422
      else:
        result = {'conflict': False, "message": "No conflicts. Dates are available."}
        return result, 200


    