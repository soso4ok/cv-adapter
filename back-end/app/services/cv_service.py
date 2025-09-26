import shutil
from pathlib import Path
from fastapi import HTTPException, UploadFile

from app.schemas.cv import CVGenerateResponse


class CVService:
    """Service class for CV generation business logic."""

    def __init__(self, storage_path: Path):
        self.storage_path = storage_path

    async def save_uploaded_file(self, cv_file: UploadFile) -> Path:

        file_path = self.storage_path / cv_file.filename

        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(cv_file.file, buffer)

            print(f"File '{cv_file.filename}' saved to '{file_path}'")
            return file_path

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Could not save file: {str(e)}"
            )

    async def process_cv_generation(
            self,
            cv_file: UploadFile,
            job_description: str
    ) -> CVGenerateResponse:
        # Save the uploaded file to permanent storage
        saved_file_path = await self.save_uploaded_file(cv_file)

        await cv_file.seek(0)
        content = await cv_file.read()


        return CVGenerateResponse(
            message="CV processing completed successfully",
            cv_file_name=cv_file.filename,
            cv_file_content_type=cv_file.content_type,
            job_description_preview=job_description[:100] + "..." if len(job_description) > 100 else job_description,
            file_size=len(content),
            saved_file_path=str(saved_file_path)
        )
        # Close the uploaded file after processing
        await cv_file.close()
