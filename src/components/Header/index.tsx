import { useState, useEffect, MouseEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'

// @ts-ignore
import AuthService from '../../services/auth/auth.service'
import { AppDispatch, RootState } from '../../store'
import { asyncAuth, logout } from '../../store/authSlice'

const pages = [{ name: 'Test', url: '/test' }]
const settings = [
  { name: 'Profile', url: '/profile' }, {
    name: 'Settings',
    url: '/settings'
  }]

const Header = () => {

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  // const [currentUser, setCurrentUser] = useState(undefined)

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const isAuth = useSelector((state: RootState) => state.isAuth.isAuth)
  const currUser = useSelector((state: RootState) => state.isAuth.currUser)

  useEffect(() => {
    const accessToken = AuthService.getUserToken()
    if (accessToken) {
      dispatch(asyncAuth(accessToken))
    }
  }, [])

  const handleLogOut = () => {
    dispatch(logout())
    // AuthService.logout()
    navigate('/')
    // window.location.reload()
  }

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SportsSoccerIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
          <Typography
            href="/"
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none'
            }}
          >
            GHUA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page, index) => (
                <NavLink key={`${page.name}${index}`} to={page.url}>
                  <MenuItem
                    onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
              {isAuth && <NavLink key={`login-123`} to={'/login'}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              </NavLink>}
              {isAuth && <NavLink key={'signup-123'} to={'/signup'}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">SignUp</Typography>
                </MenuItem>
              </NavLink>}
            </Menu>
          </Box>
          <NavLink to="/">
            <SportsSoccerIcon
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}/>
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <NavLink key={`${page.name}-${index}`} to={page.url}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              </NavLink>

            ))}

            {!isAuth && <NavLink key={'login-321'} to={'/login'}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
            </NavLink>}

            {!isAuth && <NavLink key={'signup-321'} to={'/signup'}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Signup
              </Button>
            </NavLink>}
          </Box>

          {isAuth && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={!!currUser && currUser.username} src="/static/images/avatar/2.jpg"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <NavLink key={`${setting.name}-${index}`} to={setting.url}>
                  <MenuItem
                    onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
              <MenuItem key={'logout-123'} onClick={() => {
                handleCloseUserMenu()
                handleLogOut()
              }}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
