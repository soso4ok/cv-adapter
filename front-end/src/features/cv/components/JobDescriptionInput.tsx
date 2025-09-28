import { TextField } from '@mui/material';

export const JobDescriptionInput = ({
  value,
  onChange,
}: { value: string; onChange: (v: string) => void }) => {
  return (
    <TextField
      label="Job description"
      multiline
      minRows={6}
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};