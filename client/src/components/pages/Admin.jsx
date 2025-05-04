import React from 'react';
import {Box, Typography, Button} from '@mui/material'
import {useNavigate} from 'react-router-dom';

function Admin() {

    let navigate = useNavigate()

    const handleInstPanelClick = () =>{
        navigate('/instruments_panel')
    }

    return (
        <Box style={{marginTop: '10px'}}>
            <Typography sx={{fontSize:'30px'}}>Admin Section</Typography>
            <Button variant='contained'onClick={handleInstPanelClick}>Instruments Panel</Button>
        </Box>
    );
}

export default Admin;