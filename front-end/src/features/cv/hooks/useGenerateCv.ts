import { useMutation } from '@tanstack/react-query';
import { generateCv } from '../api/cv.api';

export const useGenerateCv = () => {
  return useMutation({
    mutationFn: (input: { file: File; jobDescription: string }) => {
      const form = new FormData();
      form.append('cv_file', input.file);
      form.append('job_description', input.jobDescription);
      return generateCv(form);
    },
  });
};