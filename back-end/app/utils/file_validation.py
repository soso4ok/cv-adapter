from typing import List
from fastapi import UploadFile

from app.core.config import settings
from app.exceptions import InvalidFileTypeError, FileSizeError


async def validate_cv_file(file: UploadFile) -> None:
    """
    Validate uploaded CV file according to FastAPI best practices.

    Args:
        file: The uploaded file to validate

    Raises:
        InvalidFileTypeError: If file type is not allowed
        FileSizeError: If file exceeds size limit
    """
    # Check file type
    if file.content_type not in settings.allowed_file_types:
        raise InvalidFileTypeError(file.content_type, settings.allowed_file_types)

    # Check file size by reading content
    content = await file.read()
    await file.seek(0)  # Reset file pointer for later use

    if len(content) > settings.max_file_size:
        raise FileSizeError(len(content), settings.max_file_size)
