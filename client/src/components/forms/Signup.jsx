import { Button, Box, FormControl, Typography, Grid, TextField, Alert} from '@mui/material';
import Link from '@mui/material/Link';
import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import {NavLink} from 'react-router-dom';

function Signup() {

    const {login} = useAuth()
    let navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState(null)

    const signupSchema = yup.object({
        email: yup
            .string('Enter Your Email')
            .email('Enter a valid Email')
            .required('Email is Required'),
        first_name: yup
            .string('Enter your first name')
            .min(2, 'Must be at least 2 characters')
            .max(15, 'Must be no bigger than 15 characters')
            .required('First Name is required'),
        last_name: yup
            .string('Enter your last name')
            .min(2, 'Must be at least 2 characters')
            .max(15, 'Must be no bigger than 15 characters')
            .required('Last Name is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Must be at least 2 characters')
            .max(20, 'Must be no bigger than 20 characters')
            .required('Password is required'),
        location: yup
            .string('Enter your location (city and state)')
            .min(3, 'Must be at least 2 characters')
            .max(20, 'Must be no bigger than 15 characters')
            .required('Location is required'),
    })

    const submitUser = async (values) =>{
      
        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-type': ' application/json'
                },
                body: JSON.stringify(values)
            })

            const userData = await res.json()
            if(!res.ok){
                console.log('error - signup failed', userData.error)
                setAlertMessage(userData.error)
                return
            }
            console.log('signup success', userData)
            login(userData)
            navigate('/dashboard')
        } catch (error){
            console.error('error', error.message)
            return error
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            location: '',
        },
        validationSchema: signupSchema,
        onSubmit: submitUser
    })

    return (
        <Box sx={{marginTop: '100px'}}>
            {alertMessage && (
                <Alert severity='error'>{alertMessage}</Alert>
            )}
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Grid item>
                        <FormControl>
                            <TextField
                        
                               fullWidth
                               id='email'
                               name='email'
                               label='Email Address'
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               error={formik.touched.email && Boolean(formik.errors.email)}
                               helperText={formik.touched.email && formik.errors.email}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                       
                                fullWidth
                               id='first_name'
                               name='first_name'
                               label='First Name'
                               value={formik.values.first_name}
                               onChange={formik.handleChange}
                               error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                               helperText={formik.touched.first_name && formik.errors.first_name}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                         
                                fullWidth
                               id='last_name'
                               name='last_name'
                               label='Last Name'
                               value={formik.values.last_name}
                               onChange={formik.handleChange}
                               error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                               helperText={formik.touched.last_name && formik.errors.last_name}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                          
                            fullWidth
                               id='password'
                               name='password'
                               label='Password'
                               type='password'
                               value={formik.values.password}
                               onChange={formik.handleChange}
                               error={formik.touched.password && Boolean(formik.errors.password)}
                               helperText={formik.touched.password && formik.errors.password}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                         
                            fullWidth
                               id='location'
                               name='location'
                               label='Location (city and state)'
                               value={formik.values.location}
                               onChange={formik.handleChange}
                               error={formik.touched.location && Boolean(formik.errors.location)}
                               helperText={formik.touched.location && formik.errors.location}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item sx={{marginTop: '20px'}}>
                        <Button type='submit' variant='contained'>Create New Account</Button>
                    </Grid>
                </Grid>
            </form>
            <Box sx={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
            <Link 
                component={NavLink}
                to='/Login'
            >
            <Typography>Already have an account? Log In</Typography>
            </Link>
            </Box>
        </Box>
    );
}

export default Signup;

