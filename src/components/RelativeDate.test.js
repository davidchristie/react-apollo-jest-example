import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import RelativeDate from './RelativeDate'

describe('RelativeDate component', () => {
  it('should render correctly', () => {
    expect(toJson(mount(
      <RelativeDate value={new Date().toString()} />
    ))).toMatchSnapshot()
  })
})
