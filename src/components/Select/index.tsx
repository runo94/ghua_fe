import { FC, useState } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material'

interface IProps {
  defaultValue: String
  disabled?: boolean
  label: string
  options: any
  name: string
}

const MySelect: FC<IProps> = ({ options, defaultValue, label, name }) => {
  const [value, setValue] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value)
  }
  return (
    <FormControl fullWidth>
      <InputLabel id={`select-${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`select-${name}-label`}
        id={`select-${name}`}
        value={value || defaultValue }
        label={label}
        onChange={handleChange}
        name={name}
      >
        {
          !!options && options.map((option:any) => <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem> )
        }
      </Select>
    </FormControl>
  )
}

export default MySelect