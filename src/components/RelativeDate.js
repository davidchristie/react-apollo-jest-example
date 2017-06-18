import PropTypes from 'prop-types'
import React, { Component } from 'react'
import relativeDate from 'relative-date'

export default class RelativeDate extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired
  }

  render () {
    return (
      <span>
        {relativeDate(new Date(this.props.value))}
      </span>
    )
  }
}
