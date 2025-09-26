import os
from pathlib import Path

from app.core.config import settings


async def get_storage_path() -> Path:
    """Dependency to get and ensure storage path exists."""
    storage_path = settings.storage_path
    if not storage_path.exists():
        storage_path.mkdir(parents=True, exist_ok=True)
    return storage_path
