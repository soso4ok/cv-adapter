from __future__ import annotations

import asyncio
import shutil
from pathlib import Path

from fastapi import HTTPException, UploadFile
from google import genai
import pypdf

from app.schemas.cv import CVGenerateResponse
from app.core.config import settings


class CVService:
    """Service class for CV generation business logic."""

    def __init__(self, storage_path: Path):
        self.storage_path = storage_path
        self.client = genai.Client(api_key=settings.gemini_ai_api_key)
        self.model_name = "gemini-2.0-flash"

    @staticmethod
    def _extract_text_from_pdf(file_path: Path) -> str:
        """Extract text content from PDF file."""
        try:
            with open(file_path, "rb") as f:
                reader = pypdf.PdfReader(f)
                text = "".join(page.extract_text() or "" for page in reader.pages)
            return text
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to read PDF: {e}")

    async def _generate_with_gemini(self, cv_text: str, job_description: str) -> str:
        prompt = f"""
You are an expert HR specialisdt and career consultant with extensive recruiting experience and deep knowledge of ATS-friendly resume writing.

Inputs (replace placeholders):
{cv_text}            — the candidate's complete original CV (do NOT add or remove facts).
{job_description}    — the full job description to target.


Task — follow these steps exactly:
1. Read the job_description and extract up to 10 prioritized job requirements / keywords. Present them as a short "Job Keywords" list at the top.
2. Carefully review {cv_text}. Do NOT invent or infer any job titles, dates, employers, degrees, certifications, or accomplishments that are not present in the CV.
3. Produce a rewritten CV in **Markdown** targeted to the job:
   - Start with a tailored **Summary / Profile** (2–3 sentences) synthesized only from facts in the CV and phrased to mirror the Job Keywords. If a useful metric or fact is missing, insert a clearly flagged placeholder like `[METRIC NEEDED]` or `[DETAIL NEEDED]` (do not fabricate values).
   - Rewrite role entries (keep original job title, employer, location, and dates exactly). Reorder and prioritize bullets so the most relevant responsibilities/achievements appear first for each role. Use concise, achievement-oriented bullets starting with strong action verbs. Convert duties into outcomes only when the CV contains evidence; quantify only when the original CV includes numbers — otherwise leave a `[METRIC NEEDED]` hint.
   - Create / refine **Key Skills** and **Technical Skills** sections using only skills named in the CV; visually highlight (bold or `**tag**`) skills that match Job Keywords.
   - Keep Education and Certifications as written, but move directly relevant items higher if they strongly match the JD.
   - Make the document ATS-friendly: reverse-chronological order, consistent date format, no pronouns, 6–8 bullets max per role, clear section headers.
4. After the rewritten CV, add a short **Editor’s Notes** section (3–6 bullets) that:
   - Lists which Job Keywords were used and where (one-line pointers).
   - Identifies up to 3 factual, specific suggestions the candidate can supply to strengthen the CV (e.g., add a metric, name a tool/version, clarify team size). Mark these as suggestions only — do not change the CV content to include them.
5. Strict constraints:  invent any experience, dates, credentials or metrics.
6. Output: Return **only** Markdown containing:
   - "Job Keywords" list
   - Rewritten CV (Profile, Experience, Skills, Education/Certifications, Optional sections)
   - "Editor’s Notes"

Tone & formatting: professional, concise, result-focused, and ready for copy/paste into a document or ATS.

        """.strip()

        try:
            response = await asyncio.to_thread(
                self.client.models.generate_content,
                model=self.model_name,
                contents=[prompt],
            )
            return response.text or ""
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Gemini API error: {e}")

    async def process_cv_generation(
            self,
            cv_file: UploadFile,
            job_description: str,
    ) -> CVGenerateResponse:
        file_path = self.storage_path / cv_file.filename

        # Save file to disk
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(cv_file.file, buffer)
        finally:
            await cv_file.close()

        # Extract text from PDF only
        if cv_file.content_type == "application/pdf":
            cv_text = self._extract_text_from_pdf(file_path)
        else:
            raise HTTPException(status_code=400, detail="Currently only PDF files are supported.")

        # Generate adapted CV markdown
        adapted_cv_markdown = await self._generate_with_gemini(cv_text, job_description)

        return CVGenerateResponse(
            message="CV successfully adapted",
            cv_file_name=cv_file.filename,
            adapted_cv_markdown=adapted_cv_markdown,
            job_description_preview=(job_description[:100] + "...") if len(job_description) > 100 else job_description,
            saved_file_path=str(file_path),
        )
