import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField
} from '@mui/material'
import { useEffect, useState, FormEvent, SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IUser } from '../IUser'

import SendIcon from '@mui/icons-material/Send'
import { AppDispatch, RootState } from '../../../store'
import { asyncEditUser } from '../../../store/userSlice'
import { asyncAuth } from '../../../store/authSlice'
import MySelect from '../../../components/Select'
import locationService from '../../../services/location/location.service'

const UserSetting = () => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken'))
  const [districts, setDistricts] = useState([])
  const [cities, setCities] = useState([])
  const [changes, setChanges] = useState()
  const currUser = useSelector((state: RootState) => state.isAuth.currUser)
  const dispatch: AppDispatch = useDispatch()
  const updatedUser = useSelector((state: RootState) => state.user.updated)

  useEffect(() => {
    dispatch(asyncAuth(accessToken))
  }, [dispatch, updatedUser])

  useEffect(() => {
    console.log(currUser)
    locationService.getAllDistricts().then((res) => {
      setDistricts(res.data)
    })
    locationService.getAllCitiesOfDistrict(currUser.district_id || 351).then((res) => {
      setCities(res)
    })
  }, [currUser])

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    let target = e.currentTarget as HTMLFormElement
    const data = new FormData(target)

    dispatch(asyncEditUser({ data: Object.fromEntries(data), accessToken }))
  }

  return (
    <Container>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item container xs={4}
                justifyContent="center"
                alignItems="center">
            <Avatar
              alt={currUser ? currUser.username : ''}
              src=""
              sx={{ width: 200, height: 200 }}
            />
          </Grid>
          <Grid container item spacing={2} xs={8}>
            <Grid item xs={4}>
              <TextField
                autoComplete={currUser ? currUser.username : ''}
                required
                name="username"
                fullWidth
                id="username"
                label="User Name"
                placeholder={currUser ? currUser.username : ''}
                multiline
              />
            </Grid>
            <Grid item xs={4}>
              <MySelect options={districts}
                        defaultValue={currUser ? currUser.district_id : ''}
                        label={'District'}
                        name={'district_id'}
              />
            </Grid>
            <Grid item xs={4}>
              <MySelect options={cities}
                        defaultValue={currUser ? currUser.city_id : ''}
                        label={'City'}
                        name={'city_id'}
              />
            </Grid>
            <Grid item xs={8}>
              <Button type="submit" variant="contained" endIcon={<SendIcon/>}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default UserSetting