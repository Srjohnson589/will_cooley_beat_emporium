from config import app, api, db
from flask_restful import Resource
from flask import request, session

from models.instruments import Instrument

class Instruments(Resource):
    def get(self):
        print('instruments get ran')
        instruments = [instrument.to_dict() for instrument in Instrument.query.all()]
        return instruments, 200
    
    def post(self):
        json = request.get_json()
        print(json)

        try:
            for_rent_bool = None
            in_stock_bool = None
            for attr in json:
                
                if attr == 'for_rent':
                    if json.get(attr) == 'true':
                     
                        for_rent_bool = True
                    
                    else:
                        for_rent_bool = False
                if attr == 'in_stock':
                    if json.get(attr) == 'true':
                        in_stock_bool = True
                    else:
                        in_stock_bool = False
         
            instrument = Instrument(
                name = json.get('name'),
                brand = json.get('brand'),
                model = json.get('model'),
                size = json.get('model'),
                color = json.get('color'),
                description = json.get('description'),
                image = json.get('image'),
                for_rent = for_rent_bool,
                rent_price = int(json.get('rent_price')),
                sale_price = int(json.get('sale_price')),
                in_stock = in_stock_bool
            )

            

            db.session.add(instrument)
            db.session.commit()

            instrument_dict = instrument.to_dict()

            return instrument_dict, 201
        except:
            error={'error': 'error adding new instrument'}
            return error, 422