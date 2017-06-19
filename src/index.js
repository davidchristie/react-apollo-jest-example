import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'

import Comments from './components/Comments'
import Layout from './components/Layout'
import createApolloClient from './network/createApolloClient'

const client = createApolloClient()

ReactDOM.render(
  <ApolloProvider client={client}>
    <Layout>
      <Comments />
    </Layout>
  </ApolloProvider>,
  document.getElementById('root')
)
