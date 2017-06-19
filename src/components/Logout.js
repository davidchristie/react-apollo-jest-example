import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { DropdownItem } from 'reactstrap'

import clearToken from '../authentication/clearToken'

export class Logout extends Component {
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
      <DropdownItem onClick={this.handleClick}>
        Logout
      </DropdownItem>
    )
  }
}

export const QUERY = gql`
  query Logout {
    user {
      id
    }
  }
`

export const withData = graphql(QUERY)

export default withData(Logout)
