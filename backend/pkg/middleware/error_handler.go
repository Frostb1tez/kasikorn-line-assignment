package middleware

import (
	"errors"
	customerrors "kasikorn-line/internal/domain/errors"

	"github.com/gofiber/fiber/v2"
)

func ErrorHandler(c *fiber.Ctx) error {

	err := c.Next()
	if err == nil {
		return nil
	}

	var code int
	var message string

	switch {
	case errors.Is(err, customerrors.ErrNotFound):
		code = fiber.StatusNotFound
		message = err.Error()
	case errors.Is(err, customerrors.ErrBadRequest):
		code = fiber.StatusBadRequest
		message = err.Error()
	case errors.Is(err, customerrors.ErrUnauthorized):
		code = fiber.StatusUnauthorized
		message = err.Error()
	case errors.Is(err, customerrors.ErrForbidden):
		code = fiber.StatusForbidden
		message = err.Error()
	case errors.Is(err, customerrors.ErrConflict):
		code = fiber.StatusConflict
		message = err.Error()
	default:
		if e, ok := err.(*fiber.Error); ok {
			code = e.Code
			message = e.Error()
		} else {
			code = fiber.StatusInternalServerError
			message = customerrors.ErrInternalServerError.Error()
		}
	}

	return c.Status(code).JSON(customerrors.NewErrorResponse(code, message))
}
