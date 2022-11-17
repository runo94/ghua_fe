import axios from 'axios'

const API_URL = 'http://localhost:8080/api/ghua/auth/'

class AuthService {

  login (email, password) {
    return axios
    .post(API_URL + 'login', {
      email,
      password
    })
    .then(response => {
      if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }
      return response.data
    })
  }

  logout () {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  register (payload) {
    return axios
    .post(API_URL + 'signup', payload)
    .then(response => {
      if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
        localStorage.setItem('user', JSON.stringify(response.data.user))
      }
      return response.data
    })
  }

  getCurrentUser () {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()