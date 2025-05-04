import React, {useState} from 'react';
import {Box, Typography, Grid, FormControl, TextField, Button, Alert} from '@mui/material';
import Link from '@mui/material/Link';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {useAuth} from '../context/AuthProvider';
import {useNavigate} from 'react-router-dom';
import {NavLink} from 'react-router-dom';

function Login() {

    const {login} = useAuth()
    let navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState(null)

    const loginSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be a minimum of 8 characters')
            .required('Password is required')
    })

    const submitUser = async (values) => {
        try {
            const res = await fetch('/api/login',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const userData = await res.json()

            if (!res.ok){
                console.log('error', userData.error)
                setAlertMessage(userData.error)
                return
            } else {
                login(userData)
                navigate('/dashboard')
            }
        } catch (error) {
            console.error('error loggin in')
            alert(error.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: submitUser,
    })

    return (
        <Box sx={{marginTop: '100px'}}>
            {alertMessage && (
                <Alert severity='error'>{alertMessage}</Alert>
            )}
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction='column' justifyContent='center' alignItems='center'>
                    <Grid item sx={{marginTop: '10px'}}>
                        <FormControl>
                            <TextField
                                fullWidth
                                id='email'
                                name='email'
                                label='Email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            >

                            </TextField>
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
                            >
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button type='submit' variant='contained' size='large' sx={{marginTop: '10px'}}>Log In</Button>
                    </Grid>
                </Grid>
            </form>
            <Box sx={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
            <Link 
                component={NavLink}
                to='/Signup'
            >
            <Typography>Don't have an account? Sign Up</Typography>
            </Link>
            </Box>
        </Box>
    );
}

export default Login

