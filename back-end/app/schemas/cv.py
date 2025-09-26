from pydantic import BaseModel, Field
from typing import Optional


class CVGenerateRequest(BaseModel):
    """Schema for CV generation request."""
    job_description: str = Field(..., min_length=1, max_length=5000)


class CVGenerateResponse(BaseModel):
    """Schema for CV generation response."""
    message: str
    cv_file_name: Optional[str] = None
    cv_file_content_type: Optional[str] = None
    job_description_preview: str
    file_size: Optional[int] = None
    saved_file_path: Optional[str] = Field(
        None,
        description="Path where the uploaded file was saved"
    )
