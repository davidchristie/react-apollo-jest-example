import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { Collapse } from 'reactstrap'

export default class Fade extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  componentDidMount () {
    this.setState({
      open: true
    })
  }

  render () {
    return (
      <Collapse isOpen={this.state.open}>
        <CSSTransitionGroup
          transitionAppear
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeaveTimeout={1000}
          transitionName='fade'
        >
          {this.props.children}
        </CSSTransitionGroup>
      </Collapse>
    )
  }
}
