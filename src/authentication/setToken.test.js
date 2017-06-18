import setToken from './setToken'
import TOKEN_KEY from './TOKEN_KEY'

it('adds token to local storage', () => {
  const token = 'token'
  setToken(token)
  expect(window.localStorage.getItem(TOKEN_KEY)).toEqual(token)
})
