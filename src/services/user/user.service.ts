import axios from 'axios'
import { IUser } from '../../view/user/IUser'

const API_URL = 'http://localhost:8080/api/ghua/user/'

class UserService {

  getProfile (accessToken: string) {
    return axios
    .get(API_URL + 'profile', {
      headers: {
        "x-access-token": accessToken
      }
    })
    .then(response => {
      return response.data
    })
  }

  update (payload: IUser, accessToken: string) {
    return axios
    .post(API_URL + 'edit', payload, {
      headers: {
        'x-access-token': accessToken
      }
    })
    .then(response => {
      // if (response.data) {
      //   localStorage.setItem('token', JSON.stringify(response.data.token))
      //   localStorage.setItem('user', JSON.stringify(response.data.user))
      // }
      return response.data
    })
  }

  // getCurrentUser () {
  //   return JSON.parse(localStorage.getItem('user'))
  // }
}

export default new UserService()