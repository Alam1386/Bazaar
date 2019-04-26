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
    async signUp( parent, {input}, { req, app, postgres }){
      console.log('show me input ', input);
      let email = input.email.toLowerCase();
      let hashedpassword = await bcrypt.hash(input.password, saltRounds)
      const newUserInsert = {
        text: "INSERT INTO bazaar.users (first_name, last_name, email, user_name, password, status, country, date_created, age, gender, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *", 
        values: [input.first_name, input.last_name, email, input.user_name, hashedpassword, input.status, input.country, input.date_created, input.age, input.gender, input.rating]
      }
      let insertResult = await postgres.query(newUserInsert);
      //console.log('insert result', insertResult);
      return{
        token: hashedpassword,
        message: 'sucess'
      }
    },
    async login ( parent, {input}, {req, app, postgres}){
      //  input = { input: { email: 'sfsdfsdf@one.ocm', password: 'sdfsdfsd' } }
      const getPassword = {
        text: "SELECT  password FROM bazaar.users  where email = $1",
        values: [input.email]
      }
      //console.log(getPassword)
      let matchPassword = await postgres.query(getPassword);
      console.log('Input', input)
      console.log(matchPassword)
      const pass = matchPassword.rows[0].password;
      let comparePassword = await bcrypt.compare (input.password, pass)
        if(comparePassword === true){
          return{
            message: 'You are logged in!'
          }
        } else{
          return {
            message: 'You are not logged in!'
          }
        }
    },
    async addItem (parent, input, {req, app, postgres}){
      //console.log('The item input is:', input);
      const insertItem = {
        text: "INSERT INTO bazaar.items (name, type, status, price, inventory, description, thumbnail_url, condition, owner_id, date_created, amount_sold) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
        values: [input.name, input.type, input.status, input.price, input.inventory,  input.description, input.thumbnail_url, input.condition, input.owner_id, input.date_created,  input.amount_sold]
      }
      //console.log('The insert function is: ', insertItem);
      let insertedItem = await postgres.query(insertItem);
      console.log('The inserted items are: ', insertedItem);
      return{
        message: 'Items are inserted into database'
      }
    },
    async removeItem (parent, input, {req, app, postgres}){
      const removingItem = {
        text: "DELETE FROM bazaar.items WHERE ID = $1",
        values: [input.id]
      }
      let removedItem = await postgres.query(removingItem);
      console.log(removedItem)
      return {
        message: 'The item is removed successfully!'
      }
    },
    async updateItem (parent, input, {req, app, postgres}){
      const updatingItem = {
        text: "UPDATE bazaar.items SET item_name = $1, price = $2, item_description = $3, condition = $4 WHERE ID = $5",
        values: [input.item_name, input.price || null, input.item_description, input.condition, input.id]
      }
      let updatedItem = await postgres.query(updatingItem);
      console.log(' The items update: ', updatedItem)
      return{
        message: ' The item is updated successfully!'
      }
    } 
  },
  
  
}




