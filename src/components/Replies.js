import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import Comment from './Comment'

export class Replies extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.show = this.show.bind(this)
    this.state = {
      show: false
    }
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
    if (this.props.data.Comment.replies.length === 0) {
      return null
    }
    if (!this.state.show) {
      const count = this.props.data.Comment.replies.length
      return <button onClick={this.show}>{count} Replies</button>
    }
    return (
      <span>
        <ul>
          {
            this.props.data.Comment.replies.map((reply, index) => {
              return <Comment id={reply.id} key={index} />
            })
          }
        </ul>
      </span>
    )
  }

  show () {
    this.setState({
      show: true
    })
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
