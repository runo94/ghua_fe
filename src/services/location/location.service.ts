import axios from 'axios'
import { ICountry } from '../../models/ICountry'

const API_URL = 'http://localhost:8080/api/ghua/'

class LocationService {

  getAllCountries (accessToken: string) {
    return axios
    .get(API_URL + 'profile', {
      headers: {
        "x-access-token": accessToken
      }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
  }

  getAllDistricts () {
    return axios
    .get(API_URL + 'districts', )
    .then(response => {
      return response.data
    })
  }

  getAllCitiesOfDistrict (id: string) {
    return axios
    .get(API_URL + `cities/district/${id}/cities`, )
    .then(response => {
      return response.data.data.result
    })
  }

  getDistrict (id: string) {
    return axios
    .get(API_URL + `districts/${id}`, )
    .then(response => {
      console.log(response)
      return response.data
    })
  }

  // update (payload: IUser, accessToken: string) {
  //   console.log(accessToken)
  //   return axios
  //   .post(API_URL + 'edit', payload, {
  //     headers: {
  //       'x-access-token': accessToken
  //     }
  //   })
  //   .then(response => {
  //     // if (response.data) {
  //     //   localStorage.setItem('token', JSON.stringify(response.data.token))
  //     //   localStorage.setItem('user', JSON.stringify(response.data.user))
  //     // }
  //     return response.data
  //   })
  // }

  // getCurrentUser () {
  //   return JSON.parse(localStorage.getItem('user'))
  // }
}

export default new LocationService()