import ApolloClient, { createNetworkInterface } from 'apollo-client'

import addTokenToRequest from './addTokenToRequest'

export default function createApolloClient () {
  const uri = `https://api.graph.cool/simple/v1/cj3zn9tsd2tem0185ktmud9w1`
  const networkInterface = createNetworkInterface({uri})
  networkInterface.use([{
    applyMiddleware (request, next) {
      addTokenToRequest(request)
      next()
    }
  }])
  return new ApolloClient({
    initialState: {},
    networkInterface
  })
}
