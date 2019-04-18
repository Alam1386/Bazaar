const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 12
const crypto = require('crypto')
const Promise = require('bluebird')
const authenticate = require('../authenticate')

/* For Emergencies only */
const emergencysignup = require('./signup')  /* <-- Use Me for emergencies */
/* For Emergencies only */

module.exports = {
  Mutation: {
    async signUp( parent, input, { req, app, postgres }){
      console.log('show me input ', input);
      let email = input.email.toLowerCase();
      let hashedpassword = await bcrypt.hash(input.password, saltRounds)
      const newUserInsert = {
        text: "INSERT INTO bazaar.users (email, password) VALUES ($1, $2) RETURNING *", 
        values: [email, hashedpassword]
      }
      let insertResult = await postgres.query(newUserInsert);
      console.log('insert result', insertResult);
      return{
        token: hashedpassword,
        message: 'sucess'
      }
    },
    async login ( parent, input, {req, app, postgres}){
      console.log('The input is', input);
      //let email = input.email.toLowerCase();
      //let fName = input.fullName;
      
      const getPassword = {
        text: "SELECT  password FROM bazaar.users  where email = $1",
        values: [input.email]
      }
      console.log(getPassword)
      let matchPassword = await postgres.query(getPassword);
      console.log(matchPassword)
      const abc = matchPassword.rows[0].password;
      let comparePassword = await bcrypt.compare (input.password, abc)
        if(comparePassword === true){
          return{
            message: 'You are logged in!'
          }
        }
        else{
          return {
            message: 'You are not logged in!'
          }
        }
    }
  },
}




