"""Application settings powered by Pydantic Settings.

All configuration is env-driven. Never hardcode secrets.
"""
from functools import lru_cache
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ---- App ----
    app_name: str = "BekasiGo API"
    app_version: str = "0.1.0"
    api_prefix: str = "/api"
    log_level: str = "info"

    # ---- Supabase ----
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_key: str = ""

    # ---- LLM (Trip Planner) ----
    gemini_api_key: str = ""

    # ---- CORS ----
    cors_allowed_origins: str = "http://localhost:3000"

    @property
    def cors_origins(self) -> List[str]:
        return [o.strip() for o in self.cors_allowed_origins.split(",") if o.strip()]

    @property
    def supabase_configured(self) -> bool:
        return bool(self.supabase_url and self.supabase_anon_key)


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
