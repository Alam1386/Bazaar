import React from 'react';
import './App.css';
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'
import apolloClient from './apolloclient'
import signUp from './components/Signup'
import Index from './components/Index'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

function App(props) {
  const { classes } = props;
  return(     
      <ApolloProvider client ={apolloClient}>
        <Router>
        <AppBar position="static">
        
        <Toolbar>
            <WithState>
              {({ anchorEl, updateAnchorEl }) => {
                const open = Boolean(anchorEl);
                const handleClose = () => {
                  updateAnchorEl(null);
                };

                return (
                  <React.Fragment>
                    <Button
                    className={classes.menuButton} color="inherit" aria-label="Menu"
                      aria-owns={open ? 'render-props-menu' : undefined}
                      aria-haspopup="true"
                      onClick={event => {
                        updateAnchorEl(event.currentTarget);
                      }}
                    >
                     <MenuIcon />
                    </Button>
                    <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                      <MenuItem onClick={handleClose}>Dashbaord</MenuItem>
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </React.Fragment>
                );
              }}
            </WithState>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Bazaar Market Place
          </Typography>
          <Link to="/signup" color="inherit" >Signup </Link>
          <Button to="/signup" color="inherit">Login</Button>
        </Toolbar>
        </AppBar>
          
          <Route path="/" exact component={Index} />
          <Route path="/Signup"  component={signUp} />
          
        </Router>
      </ApolloProvider>
  )   
}
signUp.propType = {
  classes: PropTypes.object,
};

export default withStyles(styles)(App)
