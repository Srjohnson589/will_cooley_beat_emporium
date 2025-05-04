import React, {useState, useEffect} from 'react';
import { Paper, Typography, Box, Button, Divider} from '@mui/material';

function RentalCard({created_at, instrumentName, return_date, start_date, rentalId, onDeleteRental, onReviewIntent, rentalObj, instrumentObj}) {

    const todayDate = new Date()

    const [complete, setComplete] = useState(false)

    const startObj = new Date(start_date)
    const startStr = startObj.toLocaleString().split(',')
    const startDisplay = startStr[0]

    const receiptObj = new Date(created_at)
    const receiptStr = receiptObj.toLocaleString().split(',')
    const receiptDisplay = receiptStr[0]

    const returnObj = new Date(return_date)
    const returnStr = returnObj.toLocaleString().split(',')
    const returnDisplay = returnStr[0]

    useEffect(()=>{
        if(todayDate > returnObj){
            setComplete(true)
        }
    }, [])

    const typeStyle = {
        paddingLeft: '1.5rem',
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
    
    }

    return (
        <>
        <Paper sx={{
            backgroundColor: complete ? "#dee2e6": "#0a9396",
            color: complete ? "black" : "white",
            display: {
                xs: 'grid',
                md: 'flex'
            },
            justifyContent: {
                md: 'space-between'
            },
            padding: '2rem'
        }}>
        <Box sx={{width: '100%', display: 'flex', alignItems: {md: 'center'}, flexDirection: {xs: 'column', md: 'row'}, justifyContent: {md: 'space-between'}}} >
           <Box sx={typeStyle}>
                <Typography>Instrument: {instrumentName}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Brand: {instrumentObj.brand}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Receipt Date: {receiptDisplay}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Rental Start Date: {startDisplay}</Typography>
            </Box>
            <Box sx={typeStyle}>
                <Typography>Rental Return Date: {returnDisplay}</Typography>
            </Box>
            </Box>
            <Divider sx={{
                borderColor: '#606060',
                display: {xs: 'block', md: 'none'},
                margin: '1.5rem 0'
                }}/>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: {xs: 'center', md: 'flex-end'},
                    gridColumn: {xs: '1/-1', md: 'auto'},
                    paddingLeft: '1rem'
                }}
            >
                {complete ? 
                (<Button variant='contained' sx={{alignSelf: 'start'}} onClick={()=>onReviewIntent(rentalObj, instrumentObj)}>Review this Instrument</Button>)
                :
                <Button variant='contained' color='error' sx={{alignSelf: 'start'}} onClick={()=>onDeleteRental(rentalId)}>Cancel</Button>
                }
            </Box>
        </Paper>
        </>
    );
}

export default RentalCard;