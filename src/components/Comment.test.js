import { addTypenameToDocument } from 'apollo-client'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { print } from 'graphql/language/printer'
import React, { Component } from 'react'
import { MockedProvider } from 'react-apollo/lib/test-utils'

import { Comment, QUERY, withData } from './Comment'

const data = {
  Comment: {
    __typename: 'Comment',
    createdAt: 'createdAt',
    createdBy: {
      __typename: 'User',
      id: 'userId',
      name: 'userName',
      picture: 'userPicture'
    },
    id: 'commentId',
    text: 'Comment text.'
  }
}
const query = addTypenameToDocument(QUERY)
const variables = { id: 'commentId' }
const mocks = [
  {
    request: {
      query,
      variables
    },
    result: {
      data
    }
  }
]
const error = new Error('message')

describe('Comment component', () => {
  it('should render a loading state', () => {
    const output = shallow(
      <Comment data={{loading: true}} id='commentId' />
    )
    expect(toJson(output)).toMatchSnapshot()
  })

  it('should render an error', () => {
    const output = shallow(
      <Comment data={{error}} id='commentId' />
    )
    expect(toJson(output)).toMatchSnapshot()
  })

  it('should render the data', () => {
    const output = shallow(
      <Comment data={{...data, loading: false}} id='commentId' />
    )
    expect(toJson(output)).toMatchSnapshot()
  })
})

describe('Comment enhancer', () => {
  it('renders with loading first', done => {
    class Container extends Component {
      componentWillMount () {
        expect(this.props.data.loading).toBe(true)
        done()
      }

      render () {
        return null
      }
    }
    const ContainerWithData = withData(Container)
    mount(
      <MockedProvider mocks={mocks}>
        <ContainerWithData id='commentId' />
      </MockedProvider>
    )
  })

  it('renders with an error', done => {
    class Container extends Component {
      componentWillReceiveProps (props) {
        expect(props.data.error).toBeDefined()
        done()
      }

      render () {
        return null
      }
    }
    const ContainerWithData = withData(Container)
    mount(
      <MockedProvider mocks={[{error, request: {query, variables}}]}>
        <ContainerWithData id='commentId' />
      </MockedProvider>
    )
  })

  it('renders with data', done => {
    class Container extends Component {
      componentWillReceiveProps (props) {
        expect(props.data.loading).toBe(false)
        expect(props.data).toMatchObject(data)
        done()
      }

      render () {
        return null
      }
    }
    const ContainerWithData = withData(Container)
    mount(
      <MockedProvider mocks={mocks}>
        <ContainerWithData id='commentId' />
      </MockedProvider>
    )
  })
})

describe('Comment query', () => {
  it('should match expected shape', () => {
    expect(print(QUERY)).toMatchSnapshot()
  })
})
