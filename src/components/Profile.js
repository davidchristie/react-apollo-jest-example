import gql from 'graphql-tag'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap'

import Fade from './Fade'
import Login from './Login'
import Logout from './Logout'

export class Profile extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      open: false
    }
  }

  render () {
    if (this.props.data.loading) {
      return null
    }
    if (this.props.data.error) {
      return (
        <span>this.props.data.error.name: this.props.data.error.message</span>
      )
    }
    if (this.props.data.user) {
      return (
        <Fade>
          <Dropdown isOpen={this.state.open} toggle={this.toggle}>
            <DropdownToggle caret nav>
              <img
                alt='profile'
                className='rounded-circle'
                src={this.props.data.user.picture}
                width={30}
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header>{this.props.data.user.name}</DropdownItem>
              <DropdownItem divider />
              <Logout />
            </DropdownMenu>
          </Dropdown>
        </Fade>
      )
    } else {
      return <Login />
    }
  }

  toggle () {
    this.setState({
      open: !this.state.open
    })
  }
}

export const QUERY = gql`
  query Profile {
    user {
      id
      name
      picture
    }
  }
`

export const withData = graphql(QUERY)

export default withData(Profile)
