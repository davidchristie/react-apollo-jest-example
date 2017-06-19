import React, { Component } from 'react'
import { Container } from 'reactstrap'

import Header from './Header'

export default class Layout extends Component {
  render () {
    return (
      <div>
        <Header />
        <Container>
          {this.props.children}
        </Container>
      </div>
    )
  }
}
