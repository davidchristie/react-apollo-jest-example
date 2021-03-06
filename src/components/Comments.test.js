import { addTypenameToDocument } from 'apollo-client'
import { mount, shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { print } from 'graphql/language/printer'
import React, { Component } from 'react'
import { MockedProvider } from 'react-apollo/lib/test-utils'

import { Comments, QUERY, withData } from './Comments'

const data = {
  _allCommentsMeta: {
    __typename: '_QueryMeta',
    count: 1
  },
  allComments: [
    {
      __typename: 'Comment',
      id: 'commentId'
    }
  ],
  user: {
    __typename: 'User',
    id: 'userId'
  }
}
const query = addTypenameToDocument(QUERY)
const variables = {
  filter: {
    replyTo: null
  },
  first: 8,
  orderBy: 'createdAt_DESC'
}
const mocks = [
  {
    request: {
      query,
      variables
    },
    result: {
      data
    }
  },
  {
    request: {
      query,
      variables: {
        ...variables,
        skip: 1
      }
    },
    result: {
      _allCommentsMeta: {
        __typename: '_QueryMeta',
        count: 1
      },
      allComments: [],
      user: {
        __typename: 'User',
        id: 'userId'
      }
    }
  }
]
const error = new Error('message')

describe('Comments component', () => {
  it('should render a loading state', () => {
    const output = shallow(
      <Comments data={{loading: true}} id='commentId' />
    )
    expect(toJson(output)).toMatchSnapshot()
  })

  it('should render an error', () => {
    const output = shallow(
      <Comments data={{error}} id='commentId' />
    )
    expect(toJson(output)).toMatchSnapshot()
  })

  it('should render the data', () => {
    const output = shallow(
      <Comments data={{...data, loading: false}} id='commentId' />
    )
    expect(toJson(output)).toMatchSnapshot()
  })
})

describe('Comments enhancer', () => {
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
        expect(props.data.error).toBeTruthy()
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

  it('fetches more comments without crashing', done => {
    class Container extends Component {
      componentWillReceiveProps (props) {
        // props.loadMore()
        //   .then(() => {
        //     console.log('success')
        //     done()
        //   })
        //   .catch(error => {
        //     console.log(error)
        //     done()
        //   })
        props.loadMore()
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

describe('Comments query', () => {
  it('should match expected shape', () => {
    expect(print(QUERY)).toMatchSnapshot()
  })
})
