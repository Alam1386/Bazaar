import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'
import apolloClient from './apolloclient'

function App() {
  return (
    <ApolloProvider client = {apolloClient}> 
      <div className="App">
      <Query query ={gql`
          query{
            getAllItems{
              name
              price
              description
              condition
              inventory
              status
              date_created
              thumbnail_url
              owner_id
              amount_sold
            }
          }
      `}>
      {
        ({loading, errors, data}) =>{
          if(loading) return <div> Loading</div>
          if(errors) return <div> Errors {JSON.stringify(errors)}</div>
          return(
            <header className="App-header">       
              <div>
                <p> The data is: </p> <br />
                  {data.getAllItems.map(item => 
                  <div className="items">

                      Name: {item.name} <br />
                      Price: $ {item.price} <br />
                      Description: {item.description} <br />
                      Date Created: {item.date_created} <br />
                      Inventory: {item.inventory} <br />
                      Status: {item.status} <br />
                      Condition: {item.condition}<br />
                      thumbnail_url: {item.thumbnail_url}<br />
                      owner_id: {item.owner_id}<br />
                      amount_sold: {item.amount_sold}<hr />
                      
                    </div>
                    )}
                  
              </div>
              
            </header>
          )
        }
      }
      </Query>
        
      </div>
    </ApolloProvider>
  );
}

export default App;
