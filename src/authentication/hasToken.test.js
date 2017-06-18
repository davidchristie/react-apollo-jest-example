import hasToken from './hasToken'
import TOKEN_KEY from './TOKEN_KEY'

it('returns false when token is not present', () => {
  expect(hasToken()).toEqual(false)
})

it('returns true when token is present', () => {
  const token = 'token'
  window.localStorage.setItem(TOKEN_KEY, token)
  expect(hasToken()).toEqual(true)
})
