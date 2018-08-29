import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Logo from '../../images/boomtown.svg'
import { Link } from 'react-router-dom'
import AuthContainer from '../../containers/AuthContainer'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

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
          <Toolbar>
            <Link to="/">
              <img src={Logo} alt="Boomtown Logo" />
            </Link>
            <Link to="/share">
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                SHARE SOMETHING
              </Typography>
            </Link>
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                    <MenuItem onClick={values => {logout.mutation()}}>Sign Out</MenuItem>
                  )}
                </AuthContainer>
              </Menu>
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
