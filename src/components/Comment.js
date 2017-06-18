import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import CreateReply from './CreateReply'
import RelativeDate from './RelativeDate'
import Replies from './Replies'

export class Comment extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  render () {
    if (this.props.data.loading) {
      return <li>Loading...</li>
    }
    if (this.props.data.error) {
      return (
        <li>
          {this.props.data.error.name}: {this.props.data.error.message}
        </li>
      )
    }
    const {
      data: {
        Comment: {
          createdAt,
          createdBy: {
            name
          },
          text
        }
      }
    } = this.props
    return (
      <li>
        {text} by {name} <RelativeDate value={createdAt} />
        <Replies to={this.props.id} />
        <CreateReply to={this.props.id} />
      </li>
    )
  }
}

export const QUERY = gql`
  query Comment($id: ID!) {
    Comment(id: $id) {
      createdAt
      createdBy {
        id
        name
      }
      id
      text
    }
  }
`

export const withData = graphql(
  QUERY,
  {
    options: props => ({
      variables: {
        id: props.id
      }
    })
  }
)

export default withData(Comment)
