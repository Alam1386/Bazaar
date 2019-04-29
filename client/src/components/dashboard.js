import React from 'react';
import '../../src/App';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Bazaar from './bazaar.png'

const imgUrl = './image2.jpg'
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    backgroundImage: 'url(' + imgUrl + ')',
    backgrounSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '70vh'
  },
  Typography: {
    color: '#fff',
    border: '1px solid red'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    backgroundImage: 'url(' + imgUrl + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
})

const dashbaord = props => {
  const { classes } = props;
  return(
      <main className = {classes.main}> 
      <Paper className={classes.paper}>
        <div className = "container">
          <p className ="title"> Bazaar Dashbaord </p>
          
          <form className = {classes.form}>
              <Link to='/addItem/'>
                <p className="btn">Add item </p>
            </Link>
            <Link to='/login'>
              <p className = "btn">Log Out </p>
            </Link>
          </form>
        </div>
      </Paper>
     </main>
    )
  };

dashbaord.propType = {
  classes: PropTypes.object,
};

export default withStyles(styles)(dashbaord)
