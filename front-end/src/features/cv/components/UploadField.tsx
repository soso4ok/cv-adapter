import { ChangeEvent } from 'react';
import { Button } from '@mui/material';

export const UploadField = ({
  onSelect,
}: { onSelect: (file: File | null) => void }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSelect(e.target.files?.[0] ?? null);
  };
  return (
    <Button variant="outlined" component="label">
      Select CV (PDF)
      <input hidden type="file" accept="application/pdf" onChange={handleChange} />
    </Button>
  );
};