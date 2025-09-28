import { Paper, Typography, Box } from '@mui/material';
import { CvForm } from '../components/CvForm';

export const CvAdapterPage = () => (
  <Paper sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>
      CV Adapter
    </Typography>
    <Typography variant="body1" color="text.secondary" gutterBottom>
      Адаптуйте своє резюме під будь-яку вакансію за допомогою AI
    </Typography>
    <Box sx={{ mt: 2 }}>
      <CvForm />
    </Box>
  </Paper>
);