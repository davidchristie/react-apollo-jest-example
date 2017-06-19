import React, { Component } from 'react'
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavbarBrand
} from 'reactstrap'

import NavItems from './NavItems'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      open: false
    }
  }

  render () {
    return (
      <Navbar color='faded' light toggleable>
        <NavbarToggler onClick={this.toggle} right />
        <NavbarBrand>React Apollo Jest Example</NavbarBrand>
        <Collapse isOpen={this.state.open} navbar>
          <Nav className='ml-auto' navbar>
            <NavItems />
          </Nav>
        </Collapse>
      </Navbar>
    )
  }

  toggle () {
    this.setState({
      open: !this.state.open
    })
  }
}
