import getToken from './getToken'

export default function hasToken () {
  return typeof getToken() === 'string'
}
