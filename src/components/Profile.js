import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import Logout from './Logout'

export class Profile extends Component {
  render () {
    if (this.props.data.loading) {
      return <span>Loading...</span>
    }
    if (this.props.data.error) {
      return (
        <span>this.props.data.error.name: this.props.data.error.message</span>
      )
    }
    return (
      <span>
        <img alt='profile' src={this.props.data.user.picture} width={100} />
        <Logout />
      </span>
    )
  }
}

export const QUERY = gql`
  query Profile {
    user {
      id
      name
      picture
    }
  }
`

export const withData = graphql(QUERY)

export default withData(Profile)
