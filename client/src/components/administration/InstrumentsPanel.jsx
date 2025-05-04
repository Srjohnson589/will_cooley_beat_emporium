import React, {useState} from 'react';
import {Box, Typography, Stack, Button} from '@mui/material'
import { useAuth } from '../context/AuthProvider'
import AdminInstCard from '../cards/AdminInstCard';
import NewInstrument from '../forms/NewInstrument';


function InstrumentsPanel({allInstruments, afterInstrumentPost, afterInstrumentDelete, afterInstrumentUpdate}) {

    const [newInstrumentClick, setNewInstrumentClick] = useState(null)
    const {user} = useAuth()

    if(user===null || !user){
        return <p>loading...</p>
    }

    if(user.admin !== '1'){
        return <p>You do not have admin access to this page</p>
    }

    if(!allInstruments || allInstruments.length === 0){
        return <p>...loading instruments</p>
    }

    const handleDeleteInstrument = (id) =>{
        fetch(`/api/instrument_by_id/${id}`, {
            method: 'DELETE',
        })
        .then((res)=>{
            if(res.ok){
                afterInstrumentDelete(id)
            } else {
                console.log(res.error)
            }
        })
    }

    const handleUpdateInstrument = async (id, updatedInstr) =>{
        const res = await fetch(`/api/instrument_by_id/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedInstr)
        })

        const instrData = await res.json()

        if(!res.ok){
            console.log('error', instrData.error)
            afterInstrumentUpdate(instrData)
        } else {
            afterInstrumentUpdate(instrData)
        }
    }

    const adminInstrCards = allInstruments.map((instrument)=>{
        return (
            <AdminInstCard
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
                onDeleteInstr={handleDeleteInstrument}
                onUpdateInstr={handleUpdateInstrument}
            />
        )
    })

    const viewAddForm = () =>{
        setNewInstrumentClick(true)
    }

    const closeAddForm = () =>{
        setNewInstrumentClick(false)
    }
 
    return (
        <>
        <Box sx={{marginTop: '100px', display: 'flex', justifyContent: 'center'}}>
            <Typography sx={{fontSize: '55px'}}>Instruments Panel</Typography>
        </Box>
        <Box sx={{marginTop: '10px', marginBottom: '10px'}}>
            <Button variant='contained' onClick={viewAddForm}>Add New Instrument</Button>
        </Box>
        <Box>
            {newInstrumentClick && (
                <NewInstrument onNewInstClose={closeAddForm} onAddInstrument={afterInstrumentPost}/>
            )}
        </Box>
        <Box>
            <Stack spacing={1}>
                {adminInstrCards}
            </Stack>
        </Box>
        </>
    );
}

export default InstrumentsPanel;