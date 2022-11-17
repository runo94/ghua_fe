import React from 'react'
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom'

import HomePage from '../view/homepage'
import LoginPage from '../view/auth/LoginPage'
import Signup from '../view/auth/Signup'
import Copyright from '../components/Copyright'
import Header from '../components/Header'
import UserPage from '../view/user/UserPage'
import UserSetting from '../view/user/UserSetting'

const App = () => (
  <>
    <Header/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/profile" element={<UserPage/>}/>
      <Route path="/settings" element={<UserSetting/>}/>
    </Routes>
    <Copyright sx={{ mt: 5 }}/>
  </>
)

export default App