import getToken from '../authentication/getToken'

export default function addTokenToRequest (request) {
  const token = getToken()
  if (token) {
    if (!request.options.headers) {
      request.options.headers = {}
    }
    request.options.headers.Authorization = `Bearer ${token}`
  }
}
