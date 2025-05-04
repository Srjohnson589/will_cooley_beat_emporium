import React from 'react';
import {useCart} from '../context/CartProvider'
import { useNavigate } from 'react-router-dom';
import CartCard from '../cards/CartCard';
import {Box, Typography, Button} from '@mui/material'

function ShoppingCart() {

    const {cartItems, handleRemoveCartItems} = useCart()
    let navigate = useNavigate()

    const itemsToDisplay = cartItems.map((item)=>{
        return ( 
            <CartCard 
                key={item.id}
                itemObj={item}
                name={item.name}
                image={item.image}
                startDate={item.start_date}
                returnDate={item.end_date}
                handleRemoveCartItems={handleRemoveCartItems}
            />
        )
    })

    const handleCheckoutClick = ()=>{
        navigate('/payment_page')
    }

    return (
        <Box style={{marginTop: '10px'}}>
            <Typography sx={{fontSize: '30px', textAlign: 'center', marginBottom: '20px'}}>Shopping Cart</Typography>
                {cartItems.length == 0 ? <Typography sx={{marginLeft: '10px'}}>(no items in cart)</Typography> :(
                <>
                    <Box>{itemsToDisplay}</Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant='contained' size='large' sx={{backgroundColor: 'green', marginTop: '10px'}} onClick={handleCheckoutClick}>Checkout</Button>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default ShoppingCart;