import { Typography, Box } from '@mui/material';

export const NotFoundPage = () => (
  <Box textAlign="center" py={4}>
    <Typography variant="h4" gutterBottom>
      404 - Page Not Found
    </Typography>
    <Typography variant="body1" color="text.secondary">
      The page you're looking for doesn't exist.
    </Typography>
  </Box>
);