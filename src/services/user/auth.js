import { server } from '/src/boot/api'

export const login = async (username, password) => {
  const res = await server.post(
    'auth/login',
    { username, password },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  localStorage.setItem('token', res.data.access_token)
  return res
}
