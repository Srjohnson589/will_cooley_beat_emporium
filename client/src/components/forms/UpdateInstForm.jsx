import React, {useState} from 'react';
import {Box, FormControl, InputLabel, Select, MenuItem, TextField, Button} from '@mui/material'

function UpdateInstForm({instrumentObj, onUpdateInstr}) {

    const [attrSelect, setAttrSelect] = useState('--Select an Attribute--')
    const [textInput, setTextInput] = useState('')

    const VALID_SELECT_OPTIONS = [
        '--Select an Attribute--',
        'name',
        'brand',
        'model',
        'size',
        'color',
        'description',
        'image',
        'for_rent',
        'rent_price',
        'sale_price',
        'in_stock'
    ]

    const handleSelectChange = (e) =>{
        setAttrSelect(e.target.value)
    }

    const handleUpdate = (e) =>{
        e.preventDefault()

        const parsedTxt = parseInt(textInput)
        const checkIfInt = Number.isInteger(parsedTxt)

        if(attrSelect === 'name'){
            if(checkIfInt === true){
                alert('Must be a String')
                return
            }
            if(textInput.length <2 || textInput.length >25){
                alert('Must be between 2 and 25 characters')
                return
            }
        }

        if(attrSelect === 'brand' || attrSelect === 'model'){
            if(checkIfInt === true){
                alert('Must be a String')
                return
            }
            if(textInput.length <2 || textInput.length >15){
                alert('Must be between 2 and 15 characters')
                return
            }
        }

        if(attrSelect === 'size'){
            if(textInput.length >7){
                alert('Must be be less than 7 characters')
                return
            }
        }

        if(attrSelect === 'color'){
            if(checkIfInt === true){
                alert('Must be a String')
                return
            }
            if(textInput.length <2 || textInput.length >10){
                alert('Must be between 2 and 10 characters')
                return
            }
        }

        if(attrSelect === 'description'){
            if(checkIfInt === true){
                alert('Must be a String')
                return
            }
            if(textInput.length <10 || textInput.length >250){
                alert('Must be between 10 and 250 characters')
                return
            }
        }

        if(attrSelect === 'image'){
            if(checkIfInt === true){
                alert('Must be a String')
                return
            }
            if(textInput.length >300){
                alert('Must be less than 300 characters')
                return
            }
        }

        if(attrSelect === 'for_rent' && textInput !== 'false' && textInput !== 'true'){
            alert('for_rent must be a boolean')
            return
        }

        if(attrSelect === 'in_stock' && textInput !== 'false' && textInput !== 'true'){
            alert('for_rent must be a boolean')
            return
        }
        if(attrSelect === 'rent_price' || attrSelect === 'sale_price'){
            if(checkIfInt === false){
                alert('Must be a number')
                return
            }
        }

        const updatedInstr = {...instrumentObj, [attrSelect]: textInput}
        onUpdateInstr(instrumentObj.id, updatedInstr)
        setAttrSelect('--Select an Attribute--')
        setTextInput('')
    }

    return (
        <>
        <form onSubmit={handleUpdate}>
        <Box sx={{marginTop: '10px'}}>
            <FormControl fullWidth>
                <InputLabel label='update-detail-select-label'>Update</InputLabel>
                <Select
                    labelId='update-detail-select-label'
                    id='detail-select'
                    value={attrSelect}
                    label='Attribute'
                    onChange={handleSelectChange}
                >
                {VALID_SELECT_OPTIONS.map((option)=>{
                    return(
                        <MenuItem
                            key={option}
                            value={option}
                        >
                            {option}
                        </MenuItem>
                    )
                })}
                </Select>
            </FormControl>
        </Box>
        <Box sx={{marginTop: '10px'}}>
            {attrSelect !== '--Select an Attribute--' && (
                <>
                <FormControl>
                    <TextField
                        id='textInput'
                        name='textInput'
                        label='Enter update'
                        value={textInput}
                        onChange={(e)=>setTextInput(e.target.value)}
                    >
                    </TextField>
                </FormControl>
                <Button sx={{marginLeft: '10px'}} variant='contained' type='submit'>Submit</Button>
                </>
            )}
        </Box>
        </form>
        </>
    );
}

export default UpdateInstForm;