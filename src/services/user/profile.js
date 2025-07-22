import { server, headers, headersImage } from '/src/boot/api'

export const profile = async () => {
  return await server.get('api/profile', { headers })
}

export const editprofile = async (data) => {
  return await server.post('api/profile', data, { headers: headersImage })
}

export const changepassword = async (data) => {
  return await server.post('api/profile/change-password', data, { headers })
}
