import axios from 'axios'

// URL Server
// const url = 'http://localhost:8000'
const url = 'https://backend-absen.streamlit.app:8000'
const server = axios.create({ baseURL: url })

// Get Token
const token = localStorage.getItem('token')

// Get Role
const role = localStorage.getItem('role')

// Headers
const headers = {
  Authorization: `Bearer ${token}`
}
const headersImage = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'multipart/form-data'
}

export { axios, server, url, token, role, headers, headersImage }
