import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'
import apolloClient from './apolloclient'
import signUp from './components/Signup'
import Index from './components/Index'

import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'

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

function App() {
  return(     
      <ApolloProvider client ={apolloClient}>
        <Router>
        <AppBar position="static">
          <Toolbar>
          <Typography variant="h6" color="inherit" >
            <Link to="/signup" color="inherit" >To Signup </Link>
          </Typography>
        </Toolbar>
        </AppBar>
          
          <Route path="/" exact component={Index} />
          <Route path="/Signup"  component={signUp} />
          
        </Router>
      </ApolloProvider>
  )   
}

export default App;
