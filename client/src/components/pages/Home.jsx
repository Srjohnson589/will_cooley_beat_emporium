import React from 'react';
import {Box} from '@mui/material'

function Home() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}
        >
            <Box
                component='img'
                alt='beat emporium logo'
                src='/images/cbe_logo-2.png'
                sx={{
                    paddingTop: {xs: 5, md: 10},
                    maxWidth: {xs: 500 }
                }}
            >
            </Box>
        </Box>
    );
}

export default Home;