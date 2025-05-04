import React from 'react';
import {Card, CardContent, Typography, CardMedia, Button, Box} from '@mui/material'

function CartCard({name, itemObj, image, handleRemoveCartItems, startDate, returnDate}) {

    const startDateObj = new Date(startDate)
    const returnDateObj = new Date(returnDate)

    const startStr = startDateObj.toLocaleString().split(',')
    const startString = startStr[0]

    const returnStr = returnDateObj.toLocaleString().split(',')
    const returnString = returnStr[0]

    let startDateCopy = startDateObj
    let returnDateCopy = returnDateObj
    let loop = new Date(startDateCopy)

    let totalRentalDays = 0

    while(loop <= returnDateCopy){
        totalRentalDays +=1
        let newDate = loop.setDate(loop.getDate()+1)
        loop = new Date(newDate)
    }

    const typeStyle = {
        fontSize: '20px',
        paddingBottom: '4px'
    }

    return (
        <Card sx={{backgroundColor: '#e7ecef', padding: '20px', marginBottom: '20px'}}>
            <Box sx={{
                display: {sm: 'flex', xs: 'grid'},
                justifyContent: {sm: 'flex-start', xs: 'center'},
                alignItems: {sm: 'flex-start',xs: 'center'},
                gap: {sm: '20px', xs: '10px'}
             }}>
                <CardMedia 
                    component='img'
                    image={image}
                    sx={{
                        paddingTop: '25px', 
                        maxHeight: {sm: '30%', xs: '80%'}, 
                        maxWidth: {sm: '30%', xs: '80%'},
                        margin: '0 auto'
                    }}
                />
                <CardContent sx={{paddingRight: '5%', paddingTop: '25px'}}>
                    <Typography sx={typeStyle}>Instrument:{name}</Typography>
                    <Typography sx={typeStyle}>Brand: {itemObj.brand}</Typography>
                    <Typography sx={typeStyle}>Start Date: {startString}</Typography>
                    <Typography sx={typeStyle}>Return Date: {returnString}</Typography>
                    <Typography sx={typeStyle}>Rent Price: ${itemObj.rent_price} per day</Typography>
                    <Typography sx={typeStyle}>Total Rental Days: {totalRentalDays} </Typography>
                    <Button 
                        variant='contained' 
                        color='error' 
                        sx={{
                            marginTop: '20px', 
                            maxHeight: '40px'
                            }} 
                        onClick={()=>handleRemoveCartItems(itemObj)}>Remove From Cart</Button>
                </CardContent>
            </Box>
        </Card>
    );
}

export default CartCard;