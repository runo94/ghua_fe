import axios from 'axios'

const API_URL = 'http://localhost:8080/api/ghua/auth/'

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + 'login', {
        email,
        password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken))
          localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken))
        }
        return response.data
      })
  }

  logout() {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessToken')
  }

  register(payload: any) {
    return axios
      .post(API_URL + 'signup', payload)
      .then(response => {
        if (response.data) {
          localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken))
          localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken))
        }
        return response.data
      })
  }

  getUserToken() {
    return JSON.parse(localStorage.getItem('accessToken'))
  }

  refreshJWT() {
    console.log(localStorage.getItem('refreshToken'))

    return axios
      .patch(API_URL + 'refreshtoken', {refreshToken: JSON.parse(localStorage.getItem('refreshToken'))})
      .then(response => {
        if (response.data) {
          localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken))
          // localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken))
        }
        return response.data
      })
  }
}

export default new AuthService()