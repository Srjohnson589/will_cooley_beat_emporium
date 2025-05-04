from config import app, api, db
from flask_restful import Resource
from flask import request
from dateutil import parser
from datetime import datetime


from models.reviews import Review

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return reviews, 200
    
    def post(self):
        json=request.get_json()
        try:
        
            created_input = json.get('created_at')
            created_str=parser.parse(created_input)
            
            review= Review(
                user_id=json.get('user_id'),
                instrument_id=json.get('instrument_id'),
                rental_id=json.get('rental_id'),
                created_at=created_str,
                content=json.get('content')
            )

            db.session.add(review)
            db.session.commit()

       

            review_dict = review.to_dict()
            return review_dict, 201
        except:
            error={'error': 'invalid input'}
            return error, 422