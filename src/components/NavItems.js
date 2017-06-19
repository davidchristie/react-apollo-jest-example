import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import Login from './Login'
import Profile from './Profile'

export class NavItems extends Component {
  render () {
    if (this.props.data.loading) {
      return <span>Loading...</span>
    }
    if (this.props.data.error) {
      return (
        <span>this.props.data.error.name: this.props.data.error.message</span>
      )
    }
    if (this.props.data.user) {
      return <Profile />
    } else {
      return <Login />
    }
  }
}

export const QUERY = gql`
  query Profile {
    user {
      id
    }
  }
`

export const withData = graphql(QUERY)

export default withData(NavItems)
