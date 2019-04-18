const { gql } = require('apollo-server-express')

module.exports = gql`

  type User {
    id: ID!,
    fullname: String
  }
  type Query {
    getAllUsers: [User],
    user(id : ID): User,
    test: String!
    #TODO 
  }
  type Mutation {
    signUp(email: String!, password: String!): signupResponse!,
    login( email: String!, password: String!): loginResponse!
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

