import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config: any) => {
  let token = localStorage.getItem('userData')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})
export default api
