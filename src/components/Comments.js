import gql from 'graphql-tag'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'

import Comment from './Comment'
import CreateComment from './CreateComment'

export class Comments extends Component {
  hasMoreComments () {
    const totalComments = this.props.data._allCommentsMeta.count
    const loadedComments = this.props.data.allComments.length
    return loadedComments < totalComments
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
    const totalComments = this.props.data._allCommentsMeta.count
    const loadedComments = this.props.data.allComments.length
    return (
      <div>
        <h1>Comments</h1>
        {this.props.data.user ? <CreateComment /> : null}
        <ul>
          {
            this.props.data.allComments.map((comment, index) => (
              <Comment id={comment.id} key={index} />
            ))
          }
        </ul>
        {
          this.hasMoreComments()
            ? (
              <div>
                {loadedComments} of {totalComments} comments<br />
                <button onClick={this.props.loadMore}>Load More</button>
              </div>
            )
            : null
        }
      </div>
    )
  }
}

export const QUERY = gql`
  query Comments(
    $filter: CommentFilter!,
    $first: Int!,
    $orderBy: CommentOrderBy!,
    $skip: Int
  ) {
    _allCommentsMeta(filter: $filter) {
      count
    }
    allComments(
      filter: $filter,
      first: $first,
      orderBy: $orderBy,
      skip: $skip
    ) {
      id
    }
    user {
      id
    }
  }
`

export const withData = compose(
  graphql(
    QUERY,
    {
      options: props => ({
        variables: {
          filter: {
            replyTo: null
          },
          first: 8,
          orderBy: 'createdAt_DESC'
        }
      }),
      props: ({ data }) => {
        return {
          data,
          loadMore: () => {
            return data.fetchMore({
              query: QUERY,
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const newComments = fetchMoreResult.allComments
                return {
                  _allCommentsMeta: fetchMoreResult._allCommentsMeta,
                  allComments: [...previousResult.allComments, ...newComments],
                  user: fetchMoreResult.user
                }
              },
              variables: {
                filter: {
                  replyTo: null
                },
                first: 8,
                orderBy: 'createdAt_DESC',
                skip: data.allComments.length
              }
            })
          }
        }
      }
    }
  )
)

export default withData(Comments)
