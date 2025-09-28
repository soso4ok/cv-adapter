from pathlib import Path
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, AliasChoices


class Settings(BaseSettings):
    """Application settings following FastAPI configuration patterns."""


    app_name: str = "CV Generator API"
    debug: bool = False

    # CORS settings
    allowed_origins: List[str] = [
        "*",
    ]

    # API keys and secrets
    gemini_ai_api_key: str = Field(
        ...,
        validation_alias=AliasChoices("GEMINI_AI_API_KEY", "GEMINI_API_KEY"),
    )

    # File upload settings (mounted PVC at /data in Kubernetes)
    storage_path: Path = Path("/data")
    max_file_size: int = 10 * 1024 * 1024  # 10MB
    allowed_file_types: List[str] = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
