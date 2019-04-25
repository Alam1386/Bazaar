import { ApolloClient } from 'apollo-client'
import {onError} from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
    credentials: "include"
})

const appCache = new InMemoryCache();
const errorLink = onError(({graphQLErrors})=>{
    if(graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});
//console.log( 'The appCache: ', appCache)
const stateLink = withClientState({
    cache: appCache
})

let Apolloclient = new ApolloClient({
    link: ApolloLink.from([errorLink, stateLink, httpLink]),
    cache: appCache
})
export default Apolloclient;