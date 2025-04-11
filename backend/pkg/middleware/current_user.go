package middleware

import (
	"kasikorn-line/internal/domain/errors"

	"github.com/gofiber/fiber/v2"
)

const UserIDKey = "user_id"

func GetCurrentUserID(c *fiber.Ctx) (string, error) {
	userID := c.Locals(UserIDKey)
	if userID == nil {
		return "", errors.ErrUnauthorized
	}

	userIDStr, ok := userID.(string)
	if !ok {
		return "", errors.ErrUnauthorized
	}

	return userIDStr, nil
}
