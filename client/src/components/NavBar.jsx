import React from 'react';
import {Link, NavLink, Outlet} from 'react-router-dom';
import {AppBar, Container, Typography, Toolbar, IconButton, Button, Box, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from './context/AuthProvider';
import { useCart} from './context/CartProvider'
import {useNavigate} from 'react-router-dom';

const isUser = [
    {
        page: 'Instruments',
        route: '/instruments',
    },
    {
        page: 'Dashboard',
        route: '/dashboard',
    }
]

const noUser = [
    {
        page: 'Instruments',
        route: '/instruments',
    },
    {
        page: 'Login',
        route: '/login'
    }
]

function NavBar() {

    const {user, logout} = useAuth();
    const {emptyCart} = useCart();
    const [anchorElNav, setAnchorElNav] = React.useState(null)

    let navigate = useNavigate()
    

    const handleOpenNavMenu = (e)=>{
        setAnchorElNav(e.currentTarget);
    }

    const handleCloseNavMenu = ()=>{
        setAnchorElNav(null)
    }

    const handleLogoutClick = async ()=>{
        try{
            const res = await fetch('/api/logout',{
                method: 'DELETE',
            })
            if (!res.ok){
                console.log('logout failed')
            }
            emptyCart()
            logout()
        } catch (error){
            console.log(error.message)
            return error
        }
    }

    const handleShoppingCartClick = () => {
        navigate('/dashboard/shopping_cart')
    }

    return (
        <>
        {/* addition here 8-29-24 */}
        <AppBar position='fixed' sx={{backgroundColor: '#001d3d', zIndex: (theme)=>theme.zIndex.drawer + 1}}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component={Link}
                        to='/'
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'Helvetica',
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        Cooley's Beat Emporium
                    </Typography>
                    

                    <Box sx={{flexGrow:1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: {xs: 'block', md: 'none'},}}
                        >
                            {user && (
                                <ShoppingCartIcon />
                            )}
                            {user?(
                           
                                isUser.map(({page, route})=>(
                                    <MenuItem
                                        key={page}
                                        component={NavLink}
                                        to={route}
                                        onClick={handleCloseNavMenu}
                                    >
                                        {page}
                                    </MenuItem>
                                ))
                         
                            )
                                : (
                                    noUser.map(({page, route})=>(
                                        <MenuItem
                                            key={page}
                                            component={NavLink}
                                            to={route}
                                        >
                                            {page}
                                        </MenuItem>
                                    ))
                                )}
                                    {user && (
                                        <MenuItem
                                            onClick={handleLogoutClick}
                                            component={NavLink}
                                            to='/'
                                            sx={{color: 'black'}}
                                        >
                                            Logout
                                        </MenuItem>
                                        
                                    )}
                        </Menu>
                    </Box>
                    {/* next screen size */}
                    <Typography
                        variant='h5'
                        noWrap
                        component={Link}
                        to='/'
                        sx={{
                            mr:2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'helvetica',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Cooley's Beat Emporium
                    </Typography>
                    
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, justifyContent: 'flex-end'}}>
                        {user ? (
                            isUser.map(({page, route})=>(
                                <Button
                                    key={page}
                                    component={NavLink}
                                    to={route}
                                    sx={{my:2, color: 'white', display: 'block',
                                        '&: hover': {
                                            backgroundColor: 'white',
                                            color: 'black'
                                        }}}
                                        onClick={handleCloseNavMenu}
                                >
                                    <Typography>
                                        {page}
                                    </Typography>
                                </Button>
                            ))
                        )
                        :(
                            noUser.map(({page, route})=>(
                                <Button
                                    key={page}
                                    component={NavLink}
                                    to={route}
                                    sx={{my:2, color: 'white', display: 'block',
                                        '&: hover': {
                                            backgroundColor: 'white',
                                            color: 'black'
                                        }}}
                                        onClick={handleCloseNavMenu}
                                >
                                    <Typography>
                                        {page}
                                    </Typography>
                                </Button>
                            ))
                        )}
                        {user && (
                                <ShoppingCartIcon 
                                    sx={{my:2, fontSize: '1.8rem',
                                        '&: hover': {
                                        backgroundColor: 'white',
                                        color: 'black',
                                        cursor: 'pointer'
                                    }
                                    }}
                                    onClick={handleShoppingCartClick}
                                />
                            )}
                        {user && (
                            <Button
                                component={NavLink}
                                to='/'
                                sx={{my:2, color: 'white', display: 'block',
                                        '&: hover': {
                                            backgroundColor: 'white',
                                            color: 'black'
                                        }}}
                                        onClick={()=>{
                                            handleLogoutClick();
                                            handleCloseNavMenu();
                                        }}
                            >
                                <Typography>
                                    Logout
                                </Typography>

                            </Button>
                        )}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        <main>
            <Outlet />
        </main>
        </>
    );
}

export default NavBar;