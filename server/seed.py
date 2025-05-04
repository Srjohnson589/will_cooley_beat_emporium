from config import app, db
from faker import Faker
from models.users import User
from models.rentals import Rental
from models.reviews import Review
from models.instruments import Instrument
from datetime import datetime, date

if __name__ == "__main__":
  with app.app_context():
    print('starting seed...')

    User.query.delete()
    Rental.query.delete()
    Review.query.delete()
    Instrument.query.delete()

    fake = Faker()

    print('adding users')
    user_1 = User(first_name=fake.first_name(), last_name=fake.last_name(), email=fake.email(), location=fake.city(), admin=False)
    user_1.password_hash='paradiddle'
    user_2 = User(first_name=fake.first_name(), last_name=fake.last_name(), email=fake.email(), location=fake.city(), admin=False)
    user_2.password_hash='paradiddle'
    user_3 = User(first_name=fake.first_name(), last_name=fake.last_name(), email=fake.email(), location=fake.city(), admin=False)
    user_3.password_hash='paradiddle'
    user_4 = User(first_name='Will', last_name='Cooley', email='will@gmail.com', location='FTW', admin=True)
    user_4.password_hash='paradiddle'

    db.session.add_all([user_1, user_2, user_3, user_4])
    db.session.commit()

    print('adding instruments...')
    instrument_1 = Instrument(name='Snare Drum', brand='Pearl', model='Philharmonic', size='14x5', color='Maple', description=fake.paragraph(nb_sentences=5), image='https://images.unsplash.com/photo-1626962131658-603aae425e19?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', for_rent=True, rent_price=30, sale_price=400, in_stock=True)
    instrument_2 = Instrument(name='Marimba', brand='Marimba One', model='Standard', size='5 Octave', color='Natural Wood', description=fake.paragraph(nb_sentences=5), image='https://images.unsplash.com/photo-1635737775897-cbc4c19a697d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFyaW1iYXxlbnwwfHwwfHx8MA%3D%3D', for_rent=True, rent_price=70, sale_price=12000, in_stock=True)
    instrument_3 = Instrument(name='Tambourine', brand='Black Swamp', model='German Silver', size='10in', color='Natural Wood', description=fake.paragraph(nb_sentences=5), image='https://plus.unsplash.com/premium_photo-1702552106545-feef7cbecfe0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', for_rent=True, rent_price=10, sale_price=100, in_stock=True)
    instrument_4 = Instrument(name='Triangle', brand='Alan Abel', model='Alan Abel', size='9in', color='silver', description=fake.paragraph(nb_sentences=5), image='https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?q=80&w=3655&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', for_rent=True, rent_price=10, sale_price=200, in_stock=True)
    instrument_5 = Instrument(name='Djembe', brand='Meinl', model='World', size='9in', color='Maple', description=fake.paragraph(nb_sentences=5), image='https://plus.unsplash.com/premium_photo-1663956132370-e6208392d8b1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyY3Vzc2lvbnxlbnwwfHwwfHx8MA%3D%3D', for_rent=True, rent_price=40, sale_price=100, in_stock=True)
    instrument_6 = Instrument(name='Finger Cymbals', brand='Zildjian', model='FC100', size='4in', color='Bronze', description=fake.paragraph(nb_sentences=5), image='https://images.unsplash.com/photo-1627764494888-88b31b8566df?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYyfHxwZXJjdXNzaW9ufGVufDB8fDB8fHww', for_rent=True, rent_price=5, sale_price=50, in_stock=True)
    instrument_7 = Instrument(name='Timpani', brand='Adams', model='Timp100', size='23,26,29,32', color='Copper', description=fake.paragraph(nb_sentences=5), image='https://images.unsplash.com/photo-1548895342-cbe56c360e2a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI5fHxwZXJjdXNzaW9ufGVufDB8fDB8fHww', for_rent=True, rent_price=100, sale_price=12000, in_stock=True)
    instrument_8 = Instrument(name='Tabla', brand='Pearl', model='Tabla100', size='6in, 8in', color='Walnut/Steel', description=fake.paragraph(nb_sentences=5), image='https://images.unsplash.com/photo-1643098979608-1b22614abe88?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ2fHxwZXJjdXNzaW9ufGVufDB8fDB8fHww', for_rent=True, rent_price=40, sale_price=200, in_stock=True)

    db.session.add_all([instrument_1, instrument_2, instrument_3, instrument_4, instrument_5, instrument_6, instrument_7, instrument_8])
    db.session.commit()

    print('adding rentals...')

    rental_1 = Rental(user_id=1, instrument_id=1, created_at=datetime(2024,3,1,10,10,10), start_date=date(2024, 2, 14), return_date=date(2024, 3, 20))
    rental_2 = Rental(user_id=2, instrument_id=2, created_at=datetime(2024,5,10,11,1,0), start_date=date(2024, 6, 10), return_date=date(2024, 6, 22))
    rental_3 = Rental(user_id=3, instrument_id=3, created_at=datetime(2024,6,3,11,5,0), start_date=date(2024, 11, 9), return_date=date(2024, 11, 11))
    rental_4 = Rental(user_id=2, instrument_id=4, created_at=datetime(2024,5,11,10,1,0), start_date=date(2024, 6, 14), return_date=date(2024, 7, 10))
    rental_5 = Rental(user_id=4, instrument_id=1, created_at=datetime(2023,5,11,10,1,0), start_date=date(2023, 6, 14), return_date=date(2023, 7, 25))
    rental_6 = Rental(user_id=4, instrument_id=2, created_at=datetime(2024,1,11,10,1,0), start_date=date(2024, 11, 14), return_date=date(2024, 11, 25))
    rental_7 = Rental(user_id=3, instrument_id=1, created_at=datetime(2024,7,11,10,1,0), start_date=date(2024, 12, 1), return_date=date(2024, 12, 11))
    rental_8 = Rental(user_id=1, instrument_id=3, created_at=datetime(2024,6,11,10,1,0), start_date=date(2024, 10, 20), return_date=date(2024, 11, 7))


    db.session.add_all([rental_1, rental_2, rental_3, rental_4, rental_5, rental_6, rental_7, rental_8])
    db.session.commit()

    print('adding reviews')

    review_1 = Review(user_id=1, instrument_id=1, rental_id=1, created_at=datetime(2024,3,21,10,10,0), content=fake.paragraph(nb_sentences=5))
    review_2 = Review(user_id=2, instrument_id=2, rental_id=2, created_at=datetime(2024,6,24,10,10,0), content=fake.paragraph(nb_sentences=5))
    review_3 = Review(user_id=2, instrument_id=4, rental_id=4, created_at=datetime(2024,7,11,10,10,0), content=fake.paragraph(nb_sentences=4))
    review_4 = Review(user_id=4, instrument_id=1, rental_id=5, created_at=datetime(2023,9,10,10,10,0), content=fake.paragraph(nb_sentences=5))


    db.session.add_all([review_1, review_2, review_3, review_4])
    db.session.commit()

