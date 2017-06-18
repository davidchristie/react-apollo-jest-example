import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloProvider } from 'react-apollo'

import Comments from './components/Comments'
import createApolloClient from './network/createApolloClient'

const client = createApolloClient()

ReactDOM.render(
  <ApolloProvider client={client}>
    <Comments />
  </ApolloProvider>,
  document.getElementById('root')
)
