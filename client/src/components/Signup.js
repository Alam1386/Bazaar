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

const SIGN_UP_MUTATION = gql` 
    mutation signupMutation ($input: signupInput!){
        signUp( input: $input ){
            message
        }
    }
`
const signUp = props => {
  const { classes } = props;
    return(
      <Mutation
        mutation = {SIGN_UP_MUTATION}
        onError = {(error) =>{
            console.log(error)
        }}
        onCompleted = {data => {
            console.log("Data is: ", data)
            props.history.push("/dashboard")
            alert ("We are signed up!")
        }}
      >
        {(signUp, {data}) =>(
          <Formik
          initialValues={{ email: '', first_name: '' }}
          onSubmit={(values, { setSubmitting }) => {
              signUp({variables: {input: values}})
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
                    SIGN UP
                  </Typography>
              <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off" >
              {/* const { classes } = this.props; */}
              <FormControl margin="normal" required fullWidth>
                  <TextField
                    id="standard-helperText"
                    name = "first_name"
                    label="First name"
                    margin="normal"
                    type="text"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
                  <TextField
                    id="standard-helperText"
                    name = "last_name"
                    label="Last name"
                    margin="normal"
                    type="text"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="outlined"
                  />
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
                    id="standard-helperText"
                    label="User name"
                    margin="normal"
                    type="text"
                    name="user_name"
                    value = {values.user_name}
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
                  <TextField
                    id="standard-helperText"
                    label="Status"
                    margin="normal"
                    type="text"
                    name="status"
                    value = {values.status}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    variant="outlined"
                  />
                  <TextField
                    id="standard-helperText"
                    label="Country"
                    margin="normal"
                    type="text"
                    name="country"
                    value = {values.country}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    variant="outlined"
                  />
                  <TextField
                    id="standard-helperText"
                    label="Date created"
                    margin="normal"
                    type="text"
                    name="date_created"
                    value = {values.date_created}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    variant="outlined"
                  />
                  <TextField
                    id="standard-helperText"
                    label="Age "
                    margin="normal"
                    type="number"
                    name="age"
                    value = {values.age}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    variant="outlined"
                  />
                  <TextField
                    id="standard-helperText"
                    label="Gender"
                    margin="normal"
                    type="text"
                    name="gender"
                    value = {values.gender}
                    onChange = {handleChange}
                    onBlur = {handleBlur}
                    variant="outlined"
                  />
                  <TextField
                    id="standard-helperText"
                    label="Rating"
                    margin="normal"
                    type="number"
                    name="rating"
                    value = {values.rating}
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
                    color="primary"
                    className={classes.submit} disabled={isSubmitting}>
                    Submit
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
  
signUp.propType = {
  classes: PropTypes.object,
};

export default withStyles(styles)(signUp)
