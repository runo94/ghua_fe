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
      return response.data
    })
  }
}

export default new UserService()