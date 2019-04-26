const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar Date 
  type User {
    id: ID!,
    first_name: String,
    last_name: String,
    email: String,
    user_name: String,
    password: String,
    status: String,
    country: String,
    date_created: Date,
    age: Int,
    gender: String,
    rating: Int
  }
  type Item {
    id: ID!,
    name: String,
    type: String,
    status: String,
    price: Float,
    inventory: String,
    description: String,
    thumbnail_url: String,
    condition: String,
    owner_id: Int,
    date_created: Date,
    amount_sold: Float
  }
  type Query {
    getAllUsers: [User],
    user(user_id : ID): User,
    test: String!,
    getAllItems: [Item],
    getItem(item_id: ID): [Item]
    #TODO 
  }
  type Mutation {
    signUp(input: signupInput!): signupResponse!,

    login( input: loginInput!): loginResponse!,
    
    addItem(
      name: String,
      type: String,
      status: String,
      price: Float,
      inventory: String,
      description: String,
      thumbnail_url: String,
      condition: String,
      owner_id: Int,
      date_created: Date,
      amount_sold: Float
    ): addItemResponse!,

    removeItem(item_id: ID!): removeItemResponse!,
    updateItem(item_id: ID!, item_name: String, price: Float, item_description: String, condition: String): Item!
  }

  input signupInput {
    first_name: String,
    last_name: String,
    email: String!,
    user_name: String,
    password: String!,
    status: String,
    country: String,
    date_created: Date,
    age: Int,
    gender: String,
    rating: Int
  }
  input loginInput {
    email: String!,
    password: String!
  }
  type removeItemResponse {
    message: String
  }
  type addItemResponse{
    message: String
  }
  type signupResponse{
    message: String
  }
  type loginResponse{
    message: String
  }
  type Test {
    name: String
  }
  # type Mutation {
  #   #TODO
  # }

`

