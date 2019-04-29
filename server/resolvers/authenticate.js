const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const authenticate = (app, req) => {
  console.log('My cookies: ', req.cookies);
  const jwtCookie = req.cookies['bazaar_app'];
  try{
    const verified_information = jwt.verify(jwtCookie, 'secret');
    console.log('Check cookies: ', verified_information);
    return verified_information.data.user_id
  }catch(e){
    throw e.message;
  }
}

module.exports = authenticate
