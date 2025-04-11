package errors

import (
	"errors"

	"gorm.io/gorm"
)

var (
	ErrInternalServerError = errors.New("internal server error")

	ErrNotFound = gorm.ErrRecordNotFound

	ErrBadRequest = errors.New("bad request")

	ErrConflict = gorm.ErrDuplicatedKey

	ErrUnauthorized = errors.New("unauthorized")

	ErrForbidden = errors.New("forbidden")
)

type ErrorResponse struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func NewErrorResponse(code int, message string) *ErrorResponse {
	return &ErrorResponse{
		Code:    code,
		Message: message,
	}
}
