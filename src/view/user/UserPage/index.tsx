import { Container, Divider, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { IUser } from '../IUser'
import userService from '../../../services/user/user.service'

const UserPage = () => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const [user, setUser] = useState<IUser>()

  const getProfile = async (token: string) => {
    return await userService.getProfile(token).then((res) => {
      console.log(res)
      setUser(res)
    })
  }

  useEffect(() => {
    getProfile(accessToken)
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <h1>{!!user && user.username}</h1>
      </Grid>
      <Grid item xs={4}>
      </Grid>
      <Grid item xs={4}>
      </Grid>
      <Grid item xs={8}>
      </Grid>
    </Grid>
  )
}

export default UserPage