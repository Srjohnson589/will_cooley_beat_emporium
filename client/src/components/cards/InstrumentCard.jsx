import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, CardContent, Typography, CardMedia, Button, Box} from '@mui/material'

function InstrumentCard({brand, name, image, model, 
    rent_price, size, instrumentObj}) {

    let navigate = useNavigate()

    const handleParam = () =>{
        const instId = instrumentObj.id
        navigate(`/instrument/${instId}`)
    }

    return (
        <>
        <Card sx={{maxWidth: '400px', minHeight: '450px', maxHeight: '600px', marginBottom: '18px'}}>
            <CardMedia 
                component='img'
                image={image}
                sx={{height: '200px'}}
            />
            <CardContent>
                <Typography sx={{fontSize: '25px'}}>
                    {name}
                </Typography>
                <Typography>
                    {brand}
                </Typography>
                <Typography>
                    {model}
                </Typography>
                <Typography>
                    {size}
                </Typography>
                <Typography>
                    Rent Price: ${rent_price}
                </Typography>
                <Box sx={{marginTop: '20px', display: 'flex'}}>
                    <Button variant='contained' onClick={handleParam}>View Details</Button>
                </Box>
            </CardContent>
        </Card>
        </>
    );
}

export default InstrumentCard;

