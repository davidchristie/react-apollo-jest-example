import Auth0Lock from 'auth0-lock'
import gql from 'graphql-tag'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'

import setToken from '../authentication/setToken'

const clientId = 'QyZoVQizggUxSbQwC5lgsfd3vdVfl0ZD'
const domain = 'davidchristie.au.auth0.com'
const options = {}

class Login extends Component {
  constructor (props) {
    super(props)
    const lock = new Auth0Lock(clientId, domain, options)
    lock.on('authenticated', result => {
      lock.getUserInfo(result.accessToken, (error, profile) => {
        if (error) return console.log(error.message)
        this.setState({
          processing: true
        })
        setToken(result.idToken)
        this.props.data.refetch()
          .then(response => {
            if (response.data.user) {
              return this.props.updateUser({
                id: response.data.user.id,
                name: profile.name,
                picture: profile.picture
              })
            } else {
              return this.props.createUser({
                idToken: result.idToken,
                name: profile.name,
                picture: profile.picture
              })
                .then(() => {
                  return this.props.data.refetch()
                })
            }
          })
      })
    })
    this.lock = lock
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      processing: false
    }
  }

  handleClick () {
    this.lock.show()
  }

  render () {
    if (this.state.processing) {
      return <span>Processing...</span>
    }
    const loading = this.props.data.loading
    return (
      <button disabled={loading} onClick={this.handleClick}>Login</button>
    )
  }
}

const QUERY = gql`
  query Login {
    user {
      id
    }
  }
`

const CREATE_USER_MUTATION = gql`
  mutation ($idToken: String!, $name: String!, $picture: String!) {
    createUser(
      authProvider: {
        auth0: {
          idToken: $idToken
        }
      }
      name: $name,
      picture: $picture
    ) {
      id
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation ($id: ID!, $name: String!, $picture: String!) {
    updateUser(id: $id, name: $name, picture: $picture) {
      id
    }
  }
`

const withData = compose(
  graphql(QUERY),
  graphql(
    CREATE_USER_MUTATION,
    {
      props: ({ mutate }) => ({
        createUser: ({idToken, name, picture}) => mutate({
          variables: {
            idToken,
            name,
            picture
          }
        })
      })
    }
  ),
  graphql(
    UPDATE_USER_MUTATION,
    {
      props: ({ mutate }) => ({
        updateUser: ({id, name, picture}) => mutate({
          variables: {
            id,
            name,
            picture
          }
        })
      })
    }
  )
)

export default withData(Login)
