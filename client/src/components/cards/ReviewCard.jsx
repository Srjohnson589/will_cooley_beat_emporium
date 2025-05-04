import React from 'react';
import {Typography, Card, CardContent} from '@mui/material'

function ReviewCard({author, reviewDate, reviewContent}) {
    return(
        <Card
        >
            <CardContent>
                <Typography>Author: {author}</Typography>
                <Typography>Review Date: {reviewDate}</Typography>
                <Typography sx={{paddingTop: '10px', paddingLeft: '20px'}}>{reviewContent}</Typography>
            </CardContent>
        </Card>
   
    )
}

export default ReviewCard;