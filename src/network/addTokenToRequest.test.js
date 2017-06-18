import setToken from '../authentication/setToken'
import addTokenToRequest from './addTokenToRequest'

it('does nothing', () => {
  const request = {
    options: {}
  }
  addTokenToRequest(request)
  expect(request).toMatchSnapshot()
})

it('adds token to request headers', () => {
  setToken('token')
  const request = {
    options: {
      headers: {}
    }
  }
  addTokenToRequest(request)
  expect(request).toMatchSnapshot()
})

it('adds headers and token to request', () => {
  setToken('token')
  const request = {
    options: {}
  }
  addTokenToRequest(request)
  expect(request).toMatchSnapshot()
})
