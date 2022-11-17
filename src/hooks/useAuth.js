import {createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UseLocalStorage } from './useLocalStorage';

const AuthContext = createContext();
const API_URL = "http://localhost:8080/api/ghua/auth/";

export default function useAuth() {
  const { setUser } = useContext(UseLocalStorage);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //set user
  const setUserContext = async () => {
    return await axios.get('/user').then(res => {
      setUser(res.data.currentUser);
      navigate('/');
    }).catch((err) => {
      setError(err.response.data);
    })
  }

  //register user
  const registerUser = async (data) => {
    const { username, email, password, passwordConfirm } = data;
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      passwordConfirm
    }).then(async () => {
      await setUserContext();
    })
    .catch((err) => {
      return setError(err.response.data);
    })
  };

  //login user
  const loginUser = async (data) => {
    const { username, password } = data;
    return axios.post(API_URL + "login", {
      username,
      password,
    }).then(async () => {
      await setUserContext();
    }).catch((err) => {
      setError(err.response.data);
    })
  };

  return {
    registerUser,
    loginUser,
    error
  }
}