import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import Login from './Login'
import Profile from './Profile'

export class Header extends Component {
  render () {
    if (this.props.data.loading) {
      return <nav />
    }
    if (this.props.data.error) {
      return (
        <nav>this.props.data.error.name: this.props.data.error.message</nav>
      )
    }
    if (this.props.data.user) {
      return (
        <nav>
          <Profile />
        </nav>
      )
    }
    return (
      <nav>
        <Login />
      </nav>
    )
  }
}

export const QUERY = gql`
  query Header {
    user {
      id
    }
  }
`

export const withData = graphql(QUERY)

export default withData(Header)
