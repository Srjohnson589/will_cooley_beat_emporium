import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Drawer, List, ListItem, ListItemButton, ListItemText, Box, useMediaQuery, useTheme} from '@mui/material'

function DashDrawer({drawerOpen, toggleDrawer, isAdmin}) {

    let navigate = useNavigate();

    const drawerWidth = 250

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Drawer  
            variant='permanent' 
            anchor= {isMobile ? 'top' : 'left'}
            open={drawerOpen} 
            onClose={()=>toggleDrawer}  
            sx={{
                display: { sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: {xs: '100%', sm: drawerWidth} },
            }}>
            <Box sx={{ width: drawerWidth }}  role='presentation'>
                <List sx={{marginTop: '75px'}}>
                    <ListItem>
                        <ListItemButton
                            onClick={()=>{
                                navigate('/dashboard/user_profile') 
                                }}
                        >
                            <ListItemText>
                                Profile
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton 
                            onClick={()=>{
                                navigate('/dashboard/upcoming_rentals') 
                                }}>
                            <ListItemText>
                                Upcoming Rentals
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText
                            onClick={()=>{
                                navigate('/dashboard/previous_rentals')
                                }}
                            >
                                Previous Rentals
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText
                            onClick={()=>{
                                navigate('/dashboard/user_reviews')
                                }}
                            >
                                Your Reviews
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText
                            onClick={()=>{
                                navigate('/dashboard/shopping_cart')
                                }}
                            >
                                Shopping Cart
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {isAdmin && (
                        <ListItem>
                        <ListItemButton>
                            <ListItemText
                            onClick={()=>{
                                navigate('/dashboard/admin')
                                }}
                            >
                               Admin
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    )}
                </List>
            </Box>
        </Drawer>
    );
}

export default DashDrawer;