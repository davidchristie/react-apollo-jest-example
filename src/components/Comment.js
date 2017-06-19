import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Media } from 'reactstrap'

import CreateReply from './CreateReply'
import Fade from './Fade'
import RelativeDate from './RelativeDate'
import Replies from './Replies'

export class Comment extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  render () {
    if (this.props.data.loading) {
      return null
    }
    if (this.props.data.error) {
      return (
        <Media>
          {this.props.data.error.name}: {this.props.data.error.message}
        </Media>
      )
    }
    const {
      data: {
        Comment: {
          createdAt,
          createdBy: {
            name,
            picture
          },
          text
        }
      }
    } = this.props
    return (
      <Fade>
        <Media>
          <Media left>
            <Media alt={`${name} profile`} className='rounded-circle' object src={picture} width={50} />
          </Media>
          <Media body>
            <Media heading>
              {name}
            </Media>
            <Media>
              {text}
            </Media>
            <Media bottom>
              <RelativeDate value={createdAt} />
            </Media>
            <CreateReply to={this.props.id} />
            <Replies to={this.props.id} />
          </Media>
        </Media>
      </Fade>
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
        picture
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
