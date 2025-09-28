import { postForm } from '@shared/lib/http';
import type { CVGenerateResponse } from '@shared/types/api';

export function generateCv(form: FormData) {
  return postForm<CVGenerateResponse>('/api/cv/generate', form);
}