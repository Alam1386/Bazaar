import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql'
})

const appCache = new InMemoryCache();
//console.log( 'The appCache: ', appCache)
const stateLink = withClientState({
    cache: appCache
})

let Apolloclient = new ApolloClient({
    link: ApolloLink.from([stateLink, httpLink]),
    cache: appCache
})
export default Apolloclient;