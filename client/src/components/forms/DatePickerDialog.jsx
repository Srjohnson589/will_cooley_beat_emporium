import React, {useState} from 'react';
import {Typography, Button, FormControl} from '@mui/material'
import {useCart} from '../context/CartProvider'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function DatePickerDialog({open, handleClose, currentRentals, instrumentObj, name, model, numOfRentalDates, handleNumOfRentalDates}) {

    const today = dayjs().utc()
    const tomorrow = dayjs().utc().add(1, 'day')

    const {handleCartItems} = useCart()

    const [startInput, setStartInput] = useState(today)
    const [endInput, setEndInput] = useState(tomorrow)
    const [dateError, setDateError] = useState(null)
    
    const rentalDates = currentRentals.map((rental)=>{
        const dateArr = []

        const rentalStartArr = rental.start_date.split(' ')
        const startStr = rentalStartArr[0]

        const rentalEndArr = rental.return_date.split(' ')
        const endStr = rentalEndArr[0]

        const start = dayjs(startStr)
        const end = dayjs(endStr)

        let loop = dayjs(start)

        while (loop<=end){
            dateArr.push(loop.utc())
            let newDate = loop.add(1, 'day')
            loop = dayjs(newDate)
        }
        return ({dateArr})
    })

    const dateRangeCheck = () =>{

        let selectedArr = []
        const end = dayjs(endInput)
        let loop = dayjs(startInput)

        while(loop<=end){
            selectedArr.push(loop.utc())
            let newDate = loop.add(1, 'day')
            loop = dayjs(newDate)
        }

        let checkResult = null
        const copyOfRentalDates = rentalDates
        for(let date of selectedArr){
            let dateStr=date.utc().format('MM/DD/YYYY')

            for(let dateObj of copyOfRentalDates){
                const dateObjArr = dateObj.dateArr
                for(let rentalDateCheck of dateObjArr){
                    const rentalDateStr = rentalDateCheck.utc().format('MM/DD/YYYY')
                    if(dateStr===rentalDateStr){
                        checkResult = 'whoa!'
                    }
                }
            }
        }
        handleNumOfRentalDates(selectedArr.length)
        return checkResult
    }

    const disableDateFunc = (date)=>{
        const testDate = dayjs(date)
        const muiDate = testDate.utc().format('MM/DD/YYYY')

        for(let dateObj of rentalDates){
            const arrayOfDates = dateObj.dateArr

            for(let dateToCheck of arrayOfDates){
                const dateCheck = dateToCheck.utc().format('MM/DD/YYYY')
                if(muiDate === dateCheck){
                    return true
                }
            }
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: async (e)=>{
                    e.preventDefault()
                    if(!startInput || !endInput){
                        alert('You have to select both a start date and end date')
                        return
                    }
                    // check selected dates
                    if(dateRangeCheck() != null){
                        alert('There are conflicts with your selected dates.')
                        return
                    }

                    let selectedArr = []
                    const end = dayjs(endInput)
                    let loop = dayjs(startInput)

                    while(loop<=end){
                        selectedArr.push(loop.utc())
                        let newDate = loop.add(1, 'day')
                        loop = dayjs(newDate)
                    }

                    const numOfDates = selectedArr.length

                    try {
                        const response = await fetch('/api/check_dates', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                            },
                            body: JSON.stringify({
                                instrument_id: instrumentObj.id,
                                start_date: startInput.utc().format(),
                                return_date: endInput.utc().format(),
                            })
                        })
                        const result = await response.json()
                        if(result.conflict){
                            alert(result.message, result.conflicting_dates)
                            return
                        }
                        handleNumOfRentalDates(numOfDates)

                        const instrumentWithDates = {
                            "id": instrumentObj.id,
                            "brand": instrumentObj.brand,
                            "color": instrumentObj.color,
                            "description": instrumentObj.description,
                            "for_rent": instrumentObj.for_rent,
                            "image": instrumentObj.image,
                            "in_stock": instrumentObj.in_stock,
                            "model": instrumentObj.model,
                            "name": instrumentObj.name,
                            "rent_price": instrumentObj.rent_price,
                            "reviews": instrumentObj.reviews,
                            "rentals": currentRentals,
                            "sale_price": instrumentObj.sale_price,
                            "size": instrumentObj.size,
                            "start_date": startInput.utc().format(),
                            "end_date": endInput.utc().format(),
                            "num_of_rental_dates": numOfDates
                        }
                        console.log('instr with dates', instrumentWithDates)
                        handleCartItems(instrumentWithDates)
                        handleClose()

                    } catch (error) {
                        console.error('Error on date check', error)
                        alert('There was an error checking date availability')
                    }
                }
            }}
        >
            <DialogTitle>Select Your Rental Time Frame</DialogTitle>
            <DialogContent>
            <DialogContentText sx={{marginBottom: '20px'}}>* default is one day</DialogContentText>
            <DialogContentText sx={{marginBottom: '20px'}}>{`${name}, ${model}`}</DialogContentText>
            <FormControl>
                <DatePicker
                    shouldDisableDate={disableDateFunc}
                    disablePast
                    label='Rental Start Date'
                    value={startInput}
                    onChange={(newDate)=>setStartInput(newDate)}
                    onError={(newError)=>setDateError(newError)}
                />
            </FormControl>
            <FormControl>
                <DatePicker 
                    shouldDisableDate={disableDateFunc}
                    disablePast
                    label='Rental Return Date'
                    value={endInput}
                    onChange={(newDate)=>setEndInput(newDate)}
                    onError={(newError)=>setDateError(newError)}
                />
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{
                    handleNumOfRentalDates(0)
                    handleClose()
                    setStartInput(today)
                    setEndInput(tomorrow)
              
                    }}>Cancel</Button>
                {dateError === null ? 
                (<Button type='submit'>Complete Add To Cart</Button>)
                :
                (<Typography sx={{color: 'red'}}>Sorry, looks like this instrument is already booked for that day, please make another selection.</Typography>)
                }
            </DialogActions>
        </Dialog>
        </LocalizationProvider>
    );
}

export default DatePickerDialog;