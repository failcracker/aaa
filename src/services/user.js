import { server, headers } from '/src/boot/api'

export const allUser = async () => {
  return await server.get('api/user', { headers })
}

export const showUser = async (id) => {
  return await server.get(`api/user/${id}`, { headers })
}

export const createUser = async (data) => {
  return await server.post('api/user', data, { headers })
}

export const editUser = async (data) => {
  return await server.post(`api/user/${data.id}`, data, { headers })
}

export const deleteUser = async (data) => {
  return await server.delete(`api/user/${data}`, { headers })
}
