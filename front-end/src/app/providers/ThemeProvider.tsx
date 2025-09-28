import { PropsWithChildren } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '@app/theme';

export const AppThemeProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);