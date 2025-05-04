import React, {useState} from 'react';
import {Box, Typography, Stack} from '@mui/material'
import { useParams } from 'react-router-dom';
import UserProfileCard from '../cards/UserProfileCard';
import { useAuth } from '../context/AuthProvider';
import RentalCard from '../cards/RentalCard';
import ShoppingCart from '../pages/ShoppingCart';
import Admin from './Admin';
import {useReview} from '../context/ReviewProvider'
import {useNavigate} from 'react-router-dom';
import UserReviewCard from '../cards/UserReviewCard';
import DashDrawer from '../DashDrawer';
import { useEffect } from 'react';

function Dashboard({handleRentalDelete}) {

    let navigate = useNavigate();
    const drawerWidth = 250

    const {section} = useParams();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {user} = useAuth();
    const {handleReviewData} = useReview();
    const [isAdmin, setIsAdmin] = useState(false)


    useEffect(()=>{
       if(user && user.admin === '1'){
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        } 
    }, [user, isAdmin])

    if(user===null || !user){
        return <p>loading...</p>
    }

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    const userRentals = user.rentals

    const handleDelete = (id)=>{
        fetch(`/api/rental_by_id/${id}`, {
            method: 'DELETE'
        })
        .then((res)=>{
            if(res.ok){
                handleRentalDelete(id)
            }
        })
    }

    const reviewIntent = (rentalObj, instrumentObj)=>{
        const reviewIntentObj = {
            userId: user.id,
            rentalId: rentalObj.id,
            rentalStartDate: rentalObj.start_date,
            rentalReturnDate: rentalObj.return_date,
            instrumentId: instrumentObj.id,
            instrumentName: instrumentObj.name,
        }
        handleReviewData(reviewIntentObj)
        navigate('/review_form')
    }

    const prevRentalsMap = userRentals.map((rental)=>{

        const todayDate = new Date()
        const returnObj = new Date(rental.return_date)
        if(todayDate > returnObj){
            return (
                <RentalCard 
                    key={rental.id}
                    rentalObj={rental}
                    instrumentObj={rental.instrument}
                    rentalId={rental.id}
                    created_at={rental.created_at}
                    instrumentName={rental.instrument.name}
                    instrument_id={rental.instrument.id}
                    return_date={rental.return_date}
                    start_date={rental.start_date}
                    onDeleteRental={handleDelete}
                    onReviewIntent={reviewIntent}
                />
            )
        }
        return null
    })
    // this ensures that undefined will not be returned
    // and allows for the conditional check to see if there are elements or not
    .filter(Boolean)

        const upcomingRentalsMap = userRentals.map((rental)=>{

            const todayDate = new Date()
            const returnObj = new Date(rental.return_date)
            if(todayDate < returnObj){
                return (
                    <RentalCard 
                        key={rental.id}
                        rentalObj={rental}
                        instrumentObj={rental.instrument}
                        rentalId={rental.id}
                        created_at={rental.created_at}
                        instrumentName={rental.instrument.name}
                        instrument_id={rental.instrument.id}
                        return_date={rental.return_date}
                        start_date={rental.start_date}
                        onDeleteRental={handleDelete}
                        onReviewIntent={reviewIntent}
                    />
                )
            }
            return null
        })
        .filter(Boolean)
    
    return (
        <>
        <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'row'}
            }}>
            {/* side drawer */}
            <Box sx={{
                width: {xs: '100%', sm: drawerWidth}
                }}>
                <DashDrawer  
                    isAdmin={isAdmin}
                    drawerOpen={drawerOpen} 
                    toggleDrawer={toggleDrawer}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex', 
                    justifyContent: 'center',
                    flexGrow: 1, 
                    alignItems: 'center',
                    p:3, 
                    width: {sm: `calc(100% - ${drawerWidth}px)`}, 
                    marginLeft: {xs:0}, 
                    marginTop: {xs: '450px', sm: '100px'}
                }}
            >
                {(!section || section==='user_profile') && (
                    <UserProfileCard 
                    key={user.id}
                    user={user}
                    first_name={user.first_name}
                    last_name={user.last_name}
                    email={user.email}
                    location={user.location}
                />
                )}
                {section === 'previous_rentals' && (
                    <Box sx={{width: '100%', borderRadius: '7px'}}>
                        {prevRentalsMap.length > 0 ? (
                            <Stack spacing={1}>
                                {prevRentalsMap}
                            </Stack>
                        ): (
                            <Typography>No previous rentals found.</Typography>
                        )}
                    </Box>
                    )}
                {section === 'upcoming_rentals' && (
                    <Box sx={{width: '100%', borderRadius: '7px'}}>
                        {upcomingRentalsMap.length > 0 ? (
                            <Stack spacing={1}>
                                {upcomingRentalsMap}
                            </Stack>
                        ): (
                            <Typography>No upcoming rentals found.</Typography>
                        )}
                    </Box>
                    )}    
                {(section === 'user_reviews') && (
                    <Box sx={{width: '100%', borderRadius: '7px'}}>
                        {user.reviews.length > 0 ? (
                            user.reviews.map((review)=>(
                                <UserReviewCard
                                user={user}
                                review={review} 
                                key={review.id}
                            />
                        ))
                    ) : (
                        <Typography>
                            No Reviews Found
                        </Typography>
                    )}
                    </Box>
                )}
                {(section === 'shopping_cart') && (
                    <Box sx={{width: '100%'}}>
                        <ShoppingCart />
                    </Box>
                )}
                {(section === 'admin') && (
                    <Box>
                        <Admin />
                    </Box>   
                )}
            </Box>
        </Box>  
        </>
    );
}

export default Dashboard;
