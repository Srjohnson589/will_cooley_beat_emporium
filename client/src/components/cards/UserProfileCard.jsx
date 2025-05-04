import React from 'react';
import {Card, CardContent, Typography, Box} from '@mui/material'

function UserProfileCard({first_name, last_name, email, location, user}) {

    const instrumentNames = user.instruments?.map((instrument)=>{
        return instrument.name
    })
    
    const numOfReviews = user.reviews.length
  
    return (
        <Card sx={{backgroundColor: '#e7ecef', color: 'black', padding: '5%'}}>
            <CardContent>
                <Typography sx={{fontSize: '70px'}}>
                   {`${first_name} ${last_name}`}
                </Typography>
                <Typography sx={{fontSize: '20px'}}>
                    Email: {email}
                </Typography>
                <Typography sx={{fontSize: '20px'}}>
                    Location: {location}
                </Typography>
                <Typography sx={{fontSize: '20px'}}>
                    Instruments You Have Rented:
                </Typography>
                <Box>
                    {instrumentNames.length === 0 ? (
                        <Typography sx={{paddingLeft: '10px'}}>(You haven't rented any instruments yet)</Typography>
                    ) 
                    : (
                        instrumentNames.map(name=>(
                            <Typography
                                key={name}
                                sx={{paddingLeft: '5%'}}
                            >
                                {name}
                            </Typography>
                        ))
                    )}
                </Box>
                <Box>
                    <Typography sx={{fontSize: '20px'}}>Reviews Written: {numOfReviews}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default UserProfileCard;
