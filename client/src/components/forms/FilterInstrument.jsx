import React from 'react';
import {Box, TextField, FormControl} from '@mui/material'

function FilterInstrument({onInstSearch, instrumentSearch}) {
    return (
    <>
        <Box>
            <FormControl>
                <TextField
                 variant='outlined'
                 label='Search By Instrument Name'
                 onChange={onInstSearch}
                 value={instrumentSearch}
                 sx={{minWidth: '235px'}}
                >
                </TextField>
            </FormControl>
       </Box>
    </>
    );
}

export default FilterInstrument;