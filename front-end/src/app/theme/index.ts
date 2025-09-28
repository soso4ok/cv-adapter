import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#61dafb' },
    background: { default: '#282c34', paper: '#3a3f4a' },
  },
  typography: {
    fontFamily: [
      '-apple-system','BlinkMacSystemFont','Segoe UI','Roboto','Oxygen',
      'Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue','sans-serif',
    ].join(','),
  },
});