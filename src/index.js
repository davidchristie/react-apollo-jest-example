import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Comments from './components/Comments'
import Layout from './components/Layout'
import SignUp from './components/SignUp'
import createApolloClient from './network/createApolloClient'

const client = createApolloClient()

ReactDOM.render(
  <ApolloProvider client={client}>
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route component={Comments} exact path='/' />
          <Route component={SignUp} exact path='/signup' />
        </Switch>
      </BrowserRouter>
    </Layout>
  </ApolloProvider>,
  document.getElementById('root')
)
