from typing import Annotated
from pathlib import Path

from fastapi import APIRouter, Depends, File, Form, UploadFile

from app.dependencies import get_storage_path
from app.schemas.cv import CVGenerateResponse
from app.services.cv_service import CVService
from app.utils.file_validation import validate_cv_file


router = APIRouter(
    prefix="/api/cv",
    tags=["cv"],
    responses={404: {"description": "Not found"}},
)


@router.post("/generate", response_model=CVGenerateResponse)
async def generate_cv(
        cv_file: Annotated[UploadFile, File(description="CV file to process")],
        job_description: Annotated[str, Form(description="Job description text")],
        storage_path: Path = Depends(get_storage_path)
) -> CVGenerateResponse:

    # Validate uploaded file
    await validate_cv_file(cv_file)

    # Initialize service
    cv_service = CVService(storage_path)

    # Process CV generation
    return await cv_service.process_cv_generation(cv_file, job_description)
