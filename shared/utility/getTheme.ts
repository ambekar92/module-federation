import { createTheme, ThemeOptions } from '@mui/material/styles'

const customColors = {
  gray: [
    '#f4f5f5',
    '#ebebeb',
    '#d6d6d6',
    '#bfbfbf',
    '#ababab',
    '#969696',
    '#787878',
    '#595959',
    '#3d3d3d',
    '#1f1f1f',
    '#0f0f0f',
  ],
  blue: [
    '#d6e7ff',
    '#adcfff',
    '#61a3ff',
    '#0f73ff',
    '#004fbd',
    '#002e6d',
    '#002457',
    '#001c42',
    '#00132e',
    '#000814',
    '#00040a',
  ],
  green: [
    '#e1f9ee',
    '#c3f3dc',
    '#88e7b9',
    '#4cdc96',
    '#25bb73',
    '#197e4e',
    '#14663f',
    '#0f4d2f',
    '#0a331f',
    '#051a10',
    '#030d08',
  ],
  red: [
    '#ffe0e0',
    '#ffc2c2',
    '#ff8585',
    '#ff4747',
    '#ff0a0a',
    '#cc0000',
    '#a30000',
    '#7a0000',
    '#520000',
    '#290000',
    '#140000',
  ],
  yellow: [
    '#fffae5',
    '#fff5c7',
    '#ffeb94',
    '#ffe15c',
    '#ffd829',
    '#f1c400',
    '#c29e00',
    '#8f7500',
    '#614f00',
    '#2e2500',
    '#191500',
  ],
}

const createMyTheme = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: customColors.blue[3],
    },
    secondary: {
      main: customColors.green[3],
    },
    error: {
      main: customColors.red[3],
    },
    warning: {
      main: customColors.yellow[3],
    },
    background: {
      default: mode === 'light' ? customColors.gray[0] : customColors.gray[9],
      paper: mode === 'light' ? customColors.gray[1] : customColors.gray[8],
    },
    text: {
      primary: mode === 'light' ? customColors.gray[10] : customColors.gray[0],
      secondary: mode === 'light' ? customColors.gray[8] : customColors.gray[2],
    },
    // Additional custom colors can be defined below
  },
})

export const lightTheme = createTheme(createMyTheme('light'))
export const darkTheme = createTheme(createMyTheme('dark'))
