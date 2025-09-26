from fastapi import HTTPException, status


class InvalidFileTypeError(HTTPException):
    """Exception for invalid file types."""

    def __init__(self, file_type: str, allowed_types: list[str]):
        detail = f"File type '{file_type}' not supported. Allowed types: {', '.join(allowed_types)}"
        super().__init__(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)


class FileSizeError(HTTPException):
    """Exception for oversized files."""

    def __init__(self, file_size: int, max_size: int):
        detail = f"File size {file_size} bytes exceeds maximum {max_size} bytes"
        super().__init__(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail=detail)
