import { useState } from 'react';
import { Box, Alert } from '@mui/material';
import { UploadField } from './UploadField';
import { JobDescriptionInput } from './JobDescriptionInput';
import { GenerateButton } from './GenerateButton';
import { MarkdownPreview } from './MarkdownPreview';
import { useGenerateCv } from '../hooks/useGenerateCv';

export const CvForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<string>('');
  const mutation = useGenerateCv();

  const handleGenerate = async () => {
    if (!file || !jobDescription) return;
    const res = await mutation.mutateAsync({ file, jobDescription });
    setResult(res.adapted_cv_markdown);
  };

  return (
    <Box>
      <UploadField onSelect={setFile} />
      <Box sx={{ mt: 2 }}>
        <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />
      </Box>
      {mutation.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {(mutation.error as Error).message}
        </Alert>
      )}
      <GenerateButton loading={mutation.isPending} onClick={handleGenerate} />
      {result && (
        <MarkdownPreview
          markdown={result}
          onCopy={() => navigator.clipboard.writeText(result)}
        />
      )}
    </Box>
  );
};