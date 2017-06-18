import getToken from './getToken'
import TOKEN_KEY from './TOKEN_KEY'

it('returns null when token is not present', () => {
  expect(getToken()).toBeNull()
})

it('gets token from local storage', () => {
  const token = 'token'
  window.localStorage.setItem(TOKEN_KEY, token)
  expect(getToken()).toEqual(token)
})
