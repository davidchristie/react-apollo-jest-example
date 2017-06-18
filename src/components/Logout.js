import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import clearToken from '../authentication/clearToken'

export class Header extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    clearToken()
    this.props.data.refetch()
  }

  render () {
    return (
      <button onClick={this.handleClick}>Logout</button>
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
