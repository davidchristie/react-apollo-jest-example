import clearToken from './clearToken'
import TOKEN_KEY from './TOKEN_KEY'

it('removes token from local storage', () => {
  window.localStorage.setItem(TOKEN_KEY, 'token')
  clearToken()
  expect(window.localStorage.getItem(TOKEN_KEY)).toBeNull()
})
