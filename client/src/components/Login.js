import React from 'react';
import { Formik } from 'formik';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';

/* =========================== Matial Ui Styles ==================== */
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
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

/* =========================== Mutation code stats from here ==================== */

const LOGIN_MUTATION = gql` 
    mutation LoginMutation ($input: loginInput!){
        login( input: $input ){
            message
        }
    }
`
const Login = props => {
  const { classes } = props;
    return(
      <Mutation
        mutation = {LOGIN_MUTATION}
        onError = {(error) =>{
            console.log(error)
        }}
        onCompleted = {data => {
            console.log("Data is: ", data)
            console.log('The message is : ', data.message)
            if(data.message === 'You are not logged in!'){
                props.history.push("/login")
            }else{
                props.history.push("/dashboard")
            }
            alert (data.message)
        }}
      >
        {(Login, {data}) =>(
          <Formik
          initialValues={{email: '',  password: ''}}
          onSubmit={(values, { setSubmitting }) => {
              console.log('Values', values)
              Login({variables: {input: values}})
          }}
          validationSchema={Yup.object().shape({
              email: Yup.string()
              .email()
              .required('Required')
            
          })}
          >
          {props => {
              const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              } = props;
              /* =========================== Matial Ui Statrs from here ==================== */
              return (
                <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    LOGIN
                  </Typography>
              <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off" >
              {/* const { classes } = this.props; */}
              <FormControl margin="normal" required fullWidth>
                  <TextField
                    id="outline-required"
                    label="Email address*"
                    margin="normal"
                    type="text"
                    name="email"
                    value = {values.email}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    variant="outlined"
                  />
                  <TextField
                    id="standard-password-input"
                    label="Password*"
                    type="password"
                    margin="normal"
                    name="password"
                    value = {values.password}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    variant="outlined"
                  />
                  {errors.email &&
                  touched.email && <div className="input-feedback">{errors.email}</div>}
                  <Button 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit} disabled={isSubmitting}>
                    Login
                  </Button>
                </FormControl>
              </form>
            </Paper>
          </main>
          ); // end of second return which contains Form elements. 
          }}
          </Formik>
        )} 
    </Mutation>
  )
  };
  
Login.propType = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Login)
