import React from 'react';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import ReviewCard from '../cards/ReviewCard';
import DatePickerDialog from '../forms/DatePickerDialog';
import {Card, CardContent, Typography, CardMedia, Button, Box, Grid, Alert} from '@mui/material'
import { useAuth } from '../context/AuthProvider';
import {useCart} from '../context/CartProvider'

function InstrumentDetails() {

    let navigate = useNavigate()

    const params = useParams();
    const instId = params.id
    const [instrumentData, setInstrumentData] = useState({})
    const [open, setOpen] = useState(false);
    const [revOpen, setRevOpen] = useState(false);
    const [hasReviews, setHasReviews] = useState(0)
    const [addAlert, setAddAlert] = useState(null)

    const [numOfRentalDates, setNumOfRentalDates] = useState(0)

    const handleNumOfRentalDates = (num)=>{
        setNumOfRentalDates(num)
    }


    useEffect(()=>{
        fetch(`/api/instrument_by_id/${instId}`)
        .then(res=>res.json())
        .then(data=>{
            setInstrumentData(data)
        })
        .catch(error=>console.error(error))
    }, [instId])

    if(!instrumentData){
        return <p>loading...</p>
    }

    useEffect(()=>{
        if(instrumentData && instrumentData.reviews){
            const numOfReviews = instrumentData.reviews.length
            setHasReviews(numOfReviews)
        }
        
    }, [instrumentData])

    

    const handleClickOpen = () => {
        setOpen(true);
    };
      
    const handleClose = () => {
        setOpen(false);
    };

    const handleRevOpen = () => {
        setRevOpen(true);
    };
      
    const handleRevClose = () => {
        setRevOpen(false);
    };

    const {user} = useAuth()
    const {cartItems, handleCartItems, handleRemoveCartItems} = useCart()

    const checkIfItemInCart = cartItems.find((item)=>{
        return item.id === instrumentData.id
    })

    const handleAdd = ()=>{
        if(!user){
            setAddAlert(true)
            return
        }
        handleClickOpen()
    }

    const handleRemove = ()=>{
        handleRemoveCartItems(instrumentData)
    }

    return (
        <Box sx={{paddingTop: '100px'}}>
            {addAlert && (
                <Alert severity='error' onClose={() => setAddAlert(false)}>Please login to add items to your cart</Alert>
            )}
            <Button variant='outlined' onClick={()=>navigate('/instruments')}>Back to Instruments</Button>
            <Card sx={{minHeight: '300px'}}>
                <Grid container spacing={2} sx={{paddingLeft: '10px'}}>
                    <Grid item xs={12} sm={4} sx={{marginTop: '50px'}}>
                        <CardMedia 
                            component='img'
                            image={instrumentData.image}
                            sx={{height: '200px'}}
                            />
                    </Grid>
                    <Grid item xs={12} sm={8} sx={{marginTop: '20px'}}>
                        <CardContent>
                            <Typography sx={{fontSize: '40px'}}>{instrumentData.name}</Typography>
                                {hasReviews>0 ? (<Button variant='text' onClick={handleRevOpen}> {hasReviews} Reviews</Button>) : (<Button disabled>0 Reviews</Button>)}
                            <Typography>{instrumentData.brand}</Typography>
                            <Typography>{instrumentData.model}</Typography>
                            <Typography>{instrumentData.size}</Typography>
                            <Typography>{instrumentData.color}</Typography>
                            <Typography>{instrumentData.description}</Typography>
                            <Typography>Rent Price: ${instrumentData.rent_price}</Typography>
                            {/* {numOfRentalDates > 0 && (
                                <Typography>Number of Rental Days Selected: {numOfRentalDates}</Typography>
                            )} */}
                            {checkIfItemInCart ? <Button variant='contained' color='error' onClick={handleRemove}>Remove From Cart</Button>: <Button sx={{backgroundColor: 'green'}} variant='contained' onClick={handleAdd}>Add To Cart</Button>}
                        </CardContent>
                    </Grid>
                </Grid>
                <Box sx={{marginTop: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                </Box>
            </Card>
            {/* Reviews */}
            <Box>
                {revOpen && <Button type='text' onClick={handleRevClose}>Close Reviews</Button>}
                {revOpen &&(
                    instrumentData.reviews.map((review)=>{
                        return(
                            <ReviewCard 
                                key={review.id}
                                author={review.user.first_name}
                                reviewDate={review.created_at}
                                reviewContent={review.content}
                            />)
                    })
                )}
            </Box>
            {/* DatePicker Dialog */}
            {open && instrumentData && (<DatePickerDialog 
                open={open} 
                handleClose={handleClose}
                currentRentals={instrumentData.rentals}
                instrumentObj={instrumentData}
                name={instrumentData.name}
                model={instrumentData.model}
                handleNumOfRentalDates={handleNumOfRentalDates}
                numOfRentalDates={numOfRentalDates}
                />
                )}
        </Box>
    );
}

export default InstrumentDetails;