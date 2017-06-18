import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

export class Comment extends Component {
  render () {
    return (
      <textarea placeholder='Post a comment' />
    )
  }
}

export const QUERY = gql`
  mutation CreateComment($id: ID!) {
    Comment(id: $id) {
      createdAt
      createdBy {
        id
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
