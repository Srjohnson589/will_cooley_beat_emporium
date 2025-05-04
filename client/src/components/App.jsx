import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useCart} from './context/CartProvider'
import Login from './forms/Login'
import ErrorPage from './pages/ErrorPage'
import Signup from './forms/Signup'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import PaymentPage from './pages/PaymentPage'
import PaymentResult from './pages/PaymentResult'
import NavBar from './NavBar'
import Review from './forms/Review'
import { useAuth } from './context/AuthProvider'
import Instruments from './pages/Instruments'
import InstrumentsPanel from './administration/InstrumentsPanel'
import InstrumentDetails from './pages/InstrumentDetails'

function App(){

  const {login, user, update} = useAuth()
  const {cartItems, emptyCart} = useCart()
  const [allInstruments, setAllInstruments] = useState([])
  const [allReviews, setAllReviews] = useState([])

  useEffect(()=>{
    checkUser()
  }, [])
  
  const checkUser = async () =>{
    try{ 
      const res = await fetch('/api/check_session')
      const userData = await res.json()
      if(res.ok){
        login(userData)
      } else {
        logout()
      }
    } catch (error) {
      console.error('Error - try logging in again', error.message)
    }
  }

  useEffect(()=>{
    fetch('/api/instruments')
    .then(res=>res.json())
    .then(instrumentsData=>{
      setAllInstruments(instrumentsData)
    })
  }, [])

  useEffect(()=>{
    fetch('/api/reviews')
    .then(res=>res.json())
    .then(reviewsData=>{
      setAllReviews(reviewsData)
    })
  }, [])


  const stageRentals = ()=>{
    if(cartItems && user){
      const rentalObjArr = cartItems.map((instrument)=>{
        return({
          "user_id": user.id,
          "instrument_id": instrument.id,
          "created_at": new Date(),
          "start_date": instrument.start_date,
          "return_date": instrument.end_date
        })
      })
      newRentalPost(rentalObjArr)
    } else {
      console.log('there was a problem creating rentalObjArr - the rental post will fail')
    }
  }

  const newRentalPost = (arr)=>{
        fetch('/api/rentals', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(arr)
        })
        .then((res)=>{
          if(res.ok){
            res.json()
            .then(data=>{
              handleNewRental(data)
              emptyCart()
            })
          } else {
            res.json()
            .then(error=>console.log(error))
          }
        })
      }
  
  const handleNewRental = (newRentalArr) =>{

    for(let rental of newRentalArr){
      update(prevUserData=>({
        ...prevUserData, rentals: [...prevUserData.rentals, rental]
      }))
    }

    fetch('/api/instruments')
    .then(res=>res.json())
    .then(instrumentsData=>{
      setAllInstruments(instrumentsData)
    })
    }
  
  
  const handleRentalDelete = (id) =>{
    const userRentals = user.rentals
    const rentalsAfterDelete = userRentals.filter((rental)=>{
      return rental.id !== id
    })

    update(prevUserData=>({
      ...prevUserData, rentals: [...rentalsAfterDelete]
    }))
    fetch('/api/instruments')
    .then(res=>res.json())
    .then(instrumentsData=>{
      setAllInstruments(instrumentsData)
    })
  }

  const afterReviewPost = (newReview) =>{

    setAllReviews([...allReviews, newReview])
    update(prevUserData=>({
      ...prevUserData, reviews: [...prevUserData.reviews, newReview]
    }))
  } 

  const afterInstrumentPost = (newInstr) =>{
    setAllInstruments([...allInstruments, newInstr])
  }

  const afterInstrumentDelete = (id) =>{
    const instrumentsAfterDelete = allInstruments.filter((instrument)=>{
      return instrument.id != id
    })

    setAllInstruments(instrumentsAfterDelete)
  }

  const afterInstrumentUpdate = (updatedInstr)=>{
   
    const updatedInstrumentsArr = allInstruments.map((instrument)=>{
      if(instrument.id===updatedInstr.id){
        return updatedInstr
      } else {
        return instrument
      }
    })
    setAllInstruments(updatedInstrumentsArr)
  }
    
  return(

    <Router>
      <Routes>
        <Route path='/' errorElement={<ErrorPage />} element={<NavBar />}>
          <Route index element={<Home />}/>
          <Route path='instruments' element={<Instruments allInstruments={allInstruments} allReviews={allReviews}/>}/>
          <Route path='/instrument/:id' element={<InstrumentDetails />} />
          <Route path='*' element={<ErrorPage/>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/dashboard' element={<Dashboard handleRentalDelete={handleRentalDelete}/>}/>
          <Route path='dashboard/:section' element={<Dashboard handleRentalDelete={handleRentalDelete}/>} />
          <Route path='/payment_page' element={<PaymentPage />}/>
          <Route path='/payment_result' element={<PaymentResult user={user} stageRentals={stageRentals}/>}/>
          <Route path='/review_form' element={<Review afterReviewPost={afterReviewPost}/>}/>
          <Route path='/instruments_panel' element={<InstrumentsPanel allInstruments={allInstruments} afterInstrumentPost={afterInstrumentPost} afterInstrumentDelete={afterInstrumentDelete} afterInstrumentUpdate={afterInstrumentUpdate}/>}/>
        </Route>
    
      </Routes>
    </Router>
  )
}

export default App
