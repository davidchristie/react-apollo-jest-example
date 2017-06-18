import TOKEN_KEY from './TOKEN_KEY'

export default function clearToken () {
  window.localStorage.removeItem(TOKEN_KEY)
}
