import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import Comment from './Comment'

export class Replies extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired
  }

  render () {
    if (this.props.data.loading) {
      return null
    }
    if (this.props.data.error) {
      return (
        <span>
          {this.props.data.error.name}: {this.props.data.error.message}
        </span>
      )
    }
    return (
      <div>
        {
          this.props.data.Comment.replies.map((reply, index) => {
            return <Comment id={reply.id} key={index} />
          })
        }
      </div>
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
        first: 8,
        id: props.to
      }
    })
  }
)

export default withData(Replies)
