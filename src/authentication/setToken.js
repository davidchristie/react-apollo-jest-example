import TOKEN_KEY from './TOKEN_KEY'

export default function setToken (token) {
  window.localStorage.setItem(TOKEN_KEY, token)
}
