"""Domain error types + FastAPI handlers."""
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import ORJSONResponse


class DomainError(Exception):
    code: str = "internal_error"
    http_status: int = 500

    def __init__(self, message: str, *, code: str | None = None, http_status: int | None = None):
        super().__init__(message)
        self.message = message
        if code:
            self.code = code
        if http_status:
            self.http_status = http_status


class NotFoundError(DomainError):
    code = "not_found"
    http_status = 404


class ValidationError(DomainError):
    code = "validation_error"
    http_status = 422


class AuthError(DomainError):
    code = "unauthorized"
    http_status = 401


def _error(code: str, message: str, http_status: int) -> ORJSONResponse:
    return ORJSONResponse(
        status_code=http_status,
        content={"error": {"code": code, "message": message}},
    )


def install_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(DomainError)
    async def _domain_handler(_: Request, exc: DomainError):
        return _error(exc.code, exc.message, exc.http_status)

    @app.exception_handler(HTTPException)
    async def _http_handler(_: Request, exc: HTTPException):
        code_map = {
            status.HTTP_401_UNAUTHORIZED: "unauthorized",
            status.HTTP_403_FORBIDDEN:    "forbidden",
            status.HTTP_404_NOT_FOUND:    "not_found",
            status.HTTP_422_UNPROCESSABLE_ENTITY: "validation_error",
        }
        return _error(code_map.get(exc.status_code, "error"), exc.detail or "Request failed.", exc.status_code)
