import React, {useState} from 'react';
import {Box, Typography, Grid, Alert} from '@mui/material';
import InstrumentCard from '../cards/InstrumentCard';
import FilterInstrument from '../forms/FilterInstrument';

function Instruments({allInstruments, allReviews}) {

    // const [addAlert, setAddAlert] = useState(null)
    const [instrumentSearch, setinstrumentSearch] = useState('')
    
    if(allInstruments===null || !allInstruments){
        return <p>loading instruments...</p>
    }

    if(allReviews===null || !allReviews){
        return <p>loading reviews...</p>
    }

    const addBeforeLogin = () =>{
        setAddAlert(true)
    }

    const handleInstrumentSearch = (e) => {
    
        setinstrumentSearch(e.target.value)
    } 
    
    const instSearchFilter = allInstruments.filter((instrument)=>{

        if(instrumentSearch === ''){
            return instrument
        }

        if(instrument.name.toLowerCase().includes(instrumentSearch.toLowerCase())){
            return instrument
        }
    })

    const instrumentCards = 
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {instSearchFilter.map((instrument)=>(
                <Grid item key={instrument.id} xs={12} sm={6} md={3} lg={3}
                    sx={{
                        maxWidth: {xs:400},
                        margin:{xs:'0 auto'}}}
                >
                    <InstrumentCard 
                        brand={instrument.brand}
                        color={instrument.color}
                        key={instrument.id}
                        name={instrument.name}
                        description={instrument.description}
                        for_rent={instrument.for_rent}
                        image={instrument.image}
                        model={instrument.model}
                        rent_price={instrument.rent_price}
                        reviews={instrument.reviews}
                        sale_price={instrument.sale_price}
                        size={instrument.size}
                        currentRentals={instrument.rentals}
                        instrumentObj={instrument}
                        in_stock={instrument.in_stock}
                        allInstrumentReviews={allReviews}
                        onAddBeforeUser={addBeforeLogin}
                    />
                </Grid>
            ))}
        </Grid>

    return (
        <>
        <Box sx={{marginTop: '100px', display: 'flex', justifyContent: 'center'}}>
            {/* {addAlert && (
                <Alert severity='error'>Please login to add items to your cart</Alert>
            )} */}
            <Typography sx={{fontSize: '50px'}}>
                Instruments
            </Typography>
        </Box>
        <Box sx={{marginBottom: '10px'}}>
            <FilterInstrument onInstSearch={handleInstrumentSearch} instrumentSearch={instrumentSearch}/>
        </Box>
        <Box>
            {instrumentCards}
        </Box>
        </>
    );
}

export default Instruments;
