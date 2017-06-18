import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'

import { QUERY as REPLIES_QUERY } from './Replies'

export class CreateReply extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.show = this.show.bind(this)
    this.state = {
      show: false,
      value: ''
    }
  }

  handleBlur () {
    if (!this.state.value) {
      this.setState({
        show: false
      })
    }
  }

  handleChange (event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.createComment({
      text: this.state.value
    })
    this.setState({
      show: false,
      value: ''
    })
  }

  render () {
    if (!this.state.show) {
      return <button onClick={this.show}>Reply</button>
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          autoFocus
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          placeholder='Post a reply'
          value={this.state.value}
        />
        <button type='submit'>Submit</button>
      </form>
    )
  }

  show () {
    this.setState({
      show: true
    })
  }
}

export const QUERY = gql`
  query CreateReply {
    user {
      id
    }
  }
`

export const CREATE_REPLY_MUTATION = gql`
  mutation CreateReply($replyToId: ID!, $text: String!, $userId: ID!) {
    createComment(createdById: $userId, replyToId: $replyToId, text: $text) {
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

export const withData = compose(
  graphql(QUERY),
  graphql(
    CREATE_REPLY_MUTATION,
    {
      options: props => ({
        update: (proxy, { data: { createComment } }) => {
          const data = proxy.readQuery({
            query: REPLIES_QUERY,
            variables: {
              id: props.to
            }
          })
          data.Comment.replies.push(createComment)
          proxy.writeQuery({ data, query: REPLIES_QUERY })
        }
      }),
      props: ({ mutate, ownProps }) => ({
        createComment: ({ text }) => {
          mutate({
            variables: {
              replyToId: ownProps.to,
              text,
              userId: ownProps.data.user.id
            }
          })
        }
      })
    }
  )
)

export default withData(CreateReply)
