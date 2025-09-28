import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => (
  <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
    <AppBar position="static" color="transparent" enableColorOnDark>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ⚡ CV Adapter
        </Typography>
      </Toolbar>
    </AppBar>
    <Container sx={{ py: 4 }}>
      <Outlet />
    </Container>
  </Box>
);