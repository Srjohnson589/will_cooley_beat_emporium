import React, {useState} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Typography, Button} from '@mui/material'

function PaymentResult({stageRentals}) {

    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState('');

    let navigate = useNavigate()

    useEffect(()=>{
        if(status==='complete'){
            stageRentals()
        } 
    }, [status])

    useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const sessionId = urlParams.get('session_id')
        fetch(`/session_status?session_id=${sessionId}`)
        .then((res)=>res.json())
        .then((data)=>{
            setStatus(data.status);
            setCustomerEmail(data.customer_email)

        });
    }, [])

    const handleDashClick = ()=>{
        navigate('/dashboard')
    }

    if (status === null){
        return (
            <section id='loading' style={{marginTop: '200px'}}>
                <p>loading</p>
            </section>
        )
    }

    if (status === 'open'){
        return (
            <Box id='pay fail' style={{marginTop: '200px'}}>
                <Typography>the payment failed</Typography>
            </Box>
        )
    }

    if (status === 'complete'){
        return (
        <>
            <Box id='success' style={{marginTop: '200px', marginBottom: '50px', display: 'flex', justifyContent: 'center'}}>
                <Typography sx={{fontSize: '25px'}}>{`Thank You! We appreciate your business! Check your email: ${customerEmail} for receipt`}</Typography>
            </Box>
            <Box style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant='contained' size='large' onClick={handleDashClick}>Back To Dashboard</Button>
            </Box>
        </>
        )
    }

    return null
}

export default PaymentResult;