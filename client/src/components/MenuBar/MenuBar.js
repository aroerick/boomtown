import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button
} from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/MoreVert'
import AddCircle from '@material-ui/icons/AddCircle'
import Logo from '../../images/boomtown.svg'
import { Link } from 'react-router-dom'
import AuthContainer from '../../containers/AuthContainer'
import styles from './styles'

class MenuBar extends Component {
  state = {
    anchorEl: null
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Link to="/">
              <Button className={classes.menuButton}>
                <img src={Logo} alt="Boomtown Logo" height="50" />
              </Button>
            </Link>
            <div className={classes.navOptions}>
              <Link to="/share">
                <Button>
                  <AddCircle />
                  <Typography color="inherit" className={classes.flex}>
                    SHARE SOMETHING
                  </Typography>
                </Button>
              </Link>
              <div className={classes.navMenu}>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <Link to="/profile">
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  </Link>
                  <AuthContainer>
                    {({ logout }) => (
                      <MenuItem
                        onClick={values => {
                          logout.mutation()
                        }}
                      >
                        Sign Out
                      </MenuItem>
                    )}
                  </AuthContainer>
                </Menu>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MenuBar)
