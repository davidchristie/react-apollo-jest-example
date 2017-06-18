import gql from 'graphql-tag'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'

export class CreateComment extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      value: ''
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
      value: ''
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          onChange={this.handleChange}
          placeholder='Post a comment'
          value={this.state.value}
        />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

export const QUERY = gql`
  query CreateComment {
    user {
      id
    }
  }
`

export const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($text: String!, $userId: ID!) {
    createComment(createdById: $userId, text: $text) {
      id
    }
  }
`

export const withData = compose(
  graphql(QUERY),
  graphql(
    CREATE_COMMENT_MUTATION,
    {
      options: props => ({
        refetchQueries: [
          'Comments'
        ]
      }),
      props: ({ mutate, ownProps }) => ({
        createComment: ({ text }) => {
          mutate({
            variables: {
              userId: ownProps.data.user.id,
              text
            }
          })
        }
      })
    }
  )
)

export default withData(CreateComment)
