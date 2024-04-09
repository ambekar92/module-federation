import { ListItemIcon, Switch } from '@mui/material'
import { useTheme as useAppTheme } from '@/context/ThemeContext'
import { useTheme } from '@mui/material'

const ThemeToggleButton = () => {
  const { toggleTheme } = useAppTheme()
  const theme = useTheme()
  const isDarkmode = theme.palette.mode === 'dark'

  return (
    <ListItemIcon>
      <Switch defaultChecked={isDarkmode} onChange={toggleTheme} />
    </ListItemIcon>
  )
}

export default ThemeToggleButton
