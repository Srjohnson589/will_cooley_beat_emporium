import React from 'react';
import {Typography, Box, FormControl, TextField, Grid, Button} from '@mui/material'
import {useFormik} from 'formik';
import * as yup from 'yup';
import { useReview } from '../context/ReviewProvider';
import {useNavigate} from 'react-router-dom';

function Review({afterReviewPost}) {

    let navigate = useNavigate()

    const {reviewData} = useReview()

    if(!reviewData){
        return <p>...loading</p>
    }

    const returnDateObj = reviewData.rentalReturnDate
    const returnDateStr = returnDateObj.split(' ')
    const returnStr = returnDateStr[0]

    const handleReturnClick = () =>{
        navigate('/dashboard')
    }
  
    const reviewSchema = yup.object({
        content: yup
            .string('Write your review')
            .min(10, 'Must be at least 10 characters')
            .max(250, 'Must be no longer than 250 charachters')
            .required('Your review must have content in order to submit')
    })

    const submitReview = async (values) =>{
        let nowDate = new Date().toISOString()

        const reviewPostObj={
            user_id:reviewData.userId,
            instrument_id:reviewData.instrumentId,
            rental_id:reviewData.rentalId,
            created_at: nowDate,
            content: values.content
        }

        try{
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(reviewPostObj)
            })
            const revResData = await res.json()

            if(!res.ok){
                console.log('error submitting review')
            } else {
                afterReviewPost(revResData)
                navigate('/dashboard')
            }
        } catch {
            console.error('error submitting review')
        }
    }

    const formik = useFormik({
        initialValues: {
            content: '',
        },
        validationSchema: reviewSchema,
        onSubmit: submitReview,
    })

    return (
        <Box sx={{marginTop: '100px'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography sx={{fontSize: '40px'}}>Review</Typography>
                <Button variant='contained' size='small' onClick={handleReturnClick}>Return to Dashboard</Button>
            </Box>
            <Grid container direction='column' justifyContent='center' alignItems='center'>
                <Grid item>
            <Typography sx={{marginTop: '10px'}}>Instrument: {reviewData.instrumentName}</Typography>
            <Typography>Rental Return Date: {returnStr}</Typography>
            </Grid>
            <form onSubmit={formik.handleSubmit}>
                <Grid item sx={{marginTop: '10px'}}>
                <FormControl >
                    <TextField
                        multiline
                        fullWidth
                        rows={5}
                        id='content'
                        name='content'
                        label='Write your review here'
                        type='text'
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        error={formik.touched.content && Boolean(formik.errors.content)}
                        helperText={formik.touched.content && formik.errors.content}
                        sx={{minWidth: '800px'}}
                    >

                    </TextField>
                </FormControl>
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained' size='large' sx={{marginTop: '10px'}}>Submit</Button>
                </Grid>
            </form>
            </Grid>
        </Box>

    );
}

export default Review;