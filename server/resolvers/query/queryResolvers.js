const authenticate = require('../authenticate')

module.exports = {
  Query: {
    async test(parent, _, {postgres}, info){
      const getUsers = await postgres.query('SELECT * FROM bazaar.users')
      return getUsers.rows[0].fullname
    },
    async user(parent, { user_id }, { app, req, postgres }, info) {
      authenticate(app, req)
      const findUserQuery = {
        text: 'SELECT * FROM bazaar.users WHERE user_id = $1',
        values: [user_id],
      }
      const user = await postgres.query(findUserQuery)

      if (user.rows.length < 1) {
        throw 'User does not exist'
      }
      return user.rows[0]
    },
    async getAllUsers(parent, _, { app, req, postgres }, info) {
      authenticate(app, req)
      const findUserQuery = {
        text: 'SELECT * FROM bazaar.users',        
      }
      const user = await postgres.query(findUserQuery)

      if (user.rows.length < 1) {
        throw 'No users'
      }
      return user.rows
    },
    async getAllItems(parent, _, {app, req, postgres}, info){
      authenticate(app, req)
      const gettingAllItems = {
        text: 'SELECT * FROM bazaar.items',
      }
      const allItems = await postgres.query(gettingAllItems)
      if(allItems.rows.legnth <1 ){
        throw 'No items were found!'
      }
      return allItems.rows
    },
    async getItem(parent, output, {app, req, postgres}, info){
      authenticate(app, req)
      console.log('The info content', info)
      const gettingItem = {
        text: 'SELECT * FROM bazaar.items WHERE item_id = $1',
        values: [output.item_id]
      }
      const singleItem = await postgres.query(gettingItem)
      //console.log(' Single searched item is: ', singleItem)
      if(singleItem.rows.lenght <1){
        throw 'Not item is found!'
      }
      return singleItem.rows
    }
  },
}
