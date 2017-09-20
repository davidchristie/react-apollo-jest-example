import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import React from 'react'
import { NavbarToggler } from 'reactstrap'

import Header from './Header'

describe('Header', () => {
  it('renders closed state correctly', () => {
    const output = shallow(<Header />)
    expect(toJson(output)).toMatchSnapshot()
  })

  it('renders open state correctly', () => {
    const output = shallow(<Header />)
    output.find(NavbarToggler).simulate('click')
    expect(toJson(output)).toMatchSnapshot()
  })
})
