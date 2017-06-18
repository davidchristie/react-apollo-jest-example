import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import hasToken from '../authentication/hasToken'

export class SignUp extends Component {
  render () {
    if (this.props.data.user || !hasToken()) {
      return <Redirect to={{pathname: '/'}} />
    }
    return <h1>Sign Up</h1>
  }
}

export const QUERY = gql`
  query SignUp {
    user {
      id
    }
  }
`

export const withData = graphql(QUERY)

export default withData(SignUp)
