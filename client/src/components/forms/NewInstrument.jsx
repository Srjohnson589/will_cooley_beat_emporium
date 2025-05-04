import React from 'react';
import {Box, Typography, TextField, Button, Grid, FormControl} from '@mui/material'
import {useFormik} from 'formik';
import * as yup from 'yup';

function NewInstrument({onNewInstClose, onAddInstrument}) {

    const addInstSchema = yup.object({
        name: yup
            .string('Enter instrument name')
            .min(2, 'Name must be at least 2 characters')
            .max(25, 'Name must be no longer than 25 characters')
            .required('Name is required'),
        brand: yup
            .string('Enter instrument brand')
            .min(2, 'Must be at least 2 characters')
            .max(15, 'Must be no longer than 15 characters')
            .required('Brand is required'),
        model: yup
            .string('Enter instrument model')
            .min(2, 'Must be at least 2 characters')
            .max(15, 'Must be no longer than 15 characters')
            .required('Model is required'),
        size: yup
            .string('Enter instrument size')
            .max(7, 'Must be no longer than 7 characters')
            .required('Size is required'),
        color: yup
            .string('Enter instrument color')
            .min(2, 'Must be longer than 2 characters')
            .max(15, 'Must be no longer than 10 characters')
            .required('Color is required'),
        description: yup
            .string('Enter instrument model')
            .min(10, 'Must be longer than 10 characters')
            .max(250, 'Must be no longer than 40 characters')
            .required('Description is required'),
        image: yup
            .string('Enter instrument image address')
            .max(300,'Must be no longer than 300 characters')
            .required('Image is required'),
        for_rent: yup
            .boolean('Must be a boolean'),
        rent_price: yup
            .number('Enter a number')
            .positive('The number must be positive')
            .min(1),
        sale_price: yup
            .number('Enter a number')
            .positive('The number must be positive')
            .min(1),
        in_stock: yup
            .boolean('Must be a boolean')

    })

    const submitInstrument = async (values, {resetForm}) =>{
        try {
            const res = await fetch('/api/instruments', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(values)
            })
            const instrumentData = await res.json()

            if(!res.ok){
                console.log('error', instrumentData.error)
                return
            } else {
                onAddInstrument(instrumentData)
                resetForm()
            }
        } catch {
            console.log('error')
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            brand: '',
            model: '',
            size: '',
            color: '',
            description: '',
            image: '',
            for_rent: '',
            rent_price: '',
            sale_price: '',
            in_stock: ''
        },
        validationSchema: addInstSchema,
        onSubmit: submitInstrument,
    })

    return (
        <>
        <Box>
            <Typography>New Instrument Form</Typography>
            <Button color='error' onClick={onNewInstClose}>Close</Button>
        </Box>
        <Box sx={{marginBottom: '10px'}}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction='row' justifyContent='flex-start' spacing={1}>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                                id='name'
                                name='name'
                                label='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                                id='brand'
                                name='brand'
                                label='brand'
                                value={formik.values.brand}
                                onChange={formik.handleChange}
                                error={formik.touched.brand && Boolean(formik.errors.brand)}
                                helperText={formik.touched.brand && formik.errors.brand}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                                id='model'
                                name='model'
                                label='model'
                                value={formik.values.model}
                                onChange={formik.handleChange}
                                error={formik.touched.model && Boolean(formik.errors.model)}
                                helperText={formik.touched.model && formik.errors.model}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                                id='size'
                                name='size'
                                label='size'
                                value={formik.values.size}
                                onChange={formik.handleChange}
                                error={formik.touched.size && Boolean(formik.errors.size)}
                                helperText={formik.touched.size && formik.errors.size}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                                id='color'
                                name='color'
                                label='color'
                                value={formik.values.color}
                                onChange={formik.handleChange}
                                error={formik.touched.color && Boolean(formik.errors.color)}
                                helperText={formik.touched.color && formik.errors.color}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                                id='image'
                                name='image'
                                label='image'
                                value={formik.values.image}
                                onChange={formik.handleChange}
                                error={formik.touched.image && Boolean(formik.errors.image)}
                                helperText={formik.touched.image && formik.errors.image}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                                id='for_rent'
                                name='for_rent'
                                label='for rent? (bool)'
                                value={formik.values.for_rent}
                                onChange={formik.handleChange}
                                error={formik.touched.for_rent && Boolean(formik.errors.for_rent)}
                                helperText={formik.touched.for_rent && formik.errors.for_rent}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                                id='rent_price'
                                name='rent_price'
                                label='rent price'
                                value={formik.values.rent_price}
                                onChange={formik.handleChange}
                                error={formik.touched.rent_price && Boolean(formik.errors.rent_price)}
                                helperText={formik.touched.rent_price && formik.errors.rent_price}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                                id='sale_price'
                                name='sale_price'
                                label='sale price'
                                value={formik.values.sale_price}
                                onChange={formik.handleChange}
                                error={formik.touched.sale_price && Boolean(formik.errors.sale_price)}
                                helperText={formik.touched.sale_price && formik.errors.sale_price}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                                id='in_stock'
                                name='in_stock'
                                label='in stock? (bool)'
                                value={formik.values.in_stock}
                                onChange={formik.handleChange}
                                error={formik.touched.in_stock && Boolean(formik.errors.in_stock)}
                                helperText={formik.touched.in_stock && formik.errors.in_stock}
                            ></TextField>
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px', alignSelf: 'flex-start'}}>
                        <FormControl>
                            <TextField
                                multiline
                                fullWidth
                                rows={5}
                                id='description'
                                name='description'
                                label='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                sx={{minWidth: '800px'}}
                                
                            ></TextField>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button type='submit' variant='contained' size='large' sx={{marginTop: '10px', backgroundColor: 'green'}}>Submit Instrument</Button>
                </Box>
            </form>
        </Box>
        </>
    );
}

export default NewInstrument;