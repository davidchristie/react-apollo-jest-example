import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import Comment from './Comment'

export class Replies extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  render () {
    if (this.props.data.loading) {
      return <span>Loading...</span>
    }
    if (this.props.data.error) {
      return (
        <span>
          {this.props.data.error.name}: {this.props.data.error.message}
        </span>
      )
    }
    return (
      <ul>
        {
          this.props.data.Comment.replies.map((reply, index) => {
            return <Comment id={reply.id} key={index} />
          })
        }
      </ul>
    )
  }
}

export const QUERY = gql`
  query Replies($id: ID!) {
    Comment(id: $id) {
      id
      replies {
        id
      }
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

export default withData(Replies)
