# Cooley's Beat Emporium :shopping_cart:

## Description

This application allows users to rent percussion instruments.

<img src='/client/public/readme_images/home.png'>

## Usage

- npm install
- pipenv install && pipenv shell
- _to setup the database:_
- flask db init
- flask migrate -m _'comment'_
- flask db upgrade
- _to seed the database:_
- python seed.py
- _to run the application:_
- cd into the server then run python app.py
- in another terminal run: npm run dev --prefix client

# Instruments List

Without logging in, users may view the available instruments.

<img src='/client/public/readme_images/instruments_list.png'>

#### Login

A user can create an account or login if they already have an account.

<img src='/client/public/readme_images/login.png'>

#### Dashboard

Once logged in, users can view their profile, previous rentals, current rentals, their shopping cart, and their reviews.

<img src='/client/public/readme_images/dashboard.png'>

#### Adding Items

Users can add instruments to rent into their shopping cart and select their rental duration.

<img src='/client/public/readme_images/add_to_cart.png'>

#### Payment

When the user checks out, they are directed to a Stripe payment page.

<img src='/client/public/readme_images/stripe.png'>

#### Admin

If a user has admin access, they can view an instruments panel page which allows them to perform CRUD actions on the instruments.

<img src='/client/public/readme_images/instruments_panel.png'>

## Support

If you have any questions, you can find me on Discord: cooleywc

## Acknowledgement

Application built using Vite + React, Material UI, and Stripe. Included application images are from unsplash.com.
