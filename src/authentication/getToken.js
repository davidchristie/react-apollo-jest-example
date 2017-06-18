import TOKEN_KEY from './TOKEN_KEY'

export default function getToken () {
  return window.localStorage.getItem(TOKEN_KEY)
}
