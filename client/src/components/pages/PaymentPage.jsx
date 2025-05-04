import React, {useCallback} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js'
import {Box} from '@mui/material'
import { useCart } from '../context/CartProvider';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () =>{

  const {cartItems} = useCart()

  if(!cartItems || cartItems.length == 0){
    return (
      <div style={{marginTop: '100px'}}>
        <p>...loading cart items</p>
      </div>
    )
  }
  
  const cartIds = cartItems.map((item)=>{
    return (
      {"id": item.id, "num_of_rental_dates": item.num_of_rental_dates}
    )
  })

  const fetchClientSecret = useCallback(() => {
     
      return fetch("/create_checkout_session", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          items: cartIds
        })
      })
        .then((res) => res.json())
        .then((data) => {
          return data.clientSecret});
    }, []);

  
    const options = {fetchClientSecret};
  
    return (
      <Box sx={{marginTop: '100px'}} id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </Box>
    )

}

export default PaymentPage
