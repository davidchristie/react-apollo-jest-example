import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Fade from './Fade'

describe('Fade component', () => {
  it('should render correctly', () => {
    expect(toJson(mount(<Fade />))).toMatchSnapshot()
  })
})
