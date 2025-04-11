package middleware

import (
	"kasikorn-line/internal/domain/errors"
	"kasikorn-line/pkg/jwt"
	"strings"

	"github.com/gofiber/fiber/v2"
)

type AuthConfig struct {
	JWTManager *jwt.JWTManager
	SkipPaths  []string
}

func NewAuthMiddleware(config AuthConfig) fiber.Handler {
	return func(c *fiber.Ctx) error {
		path := c.Path()
		for _, skipPath := range config.SkipPaths {
			if strings.HasPrefix(path, skipPath) {
				return c.Next()
			}
		}

		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return errors.ErrUnauthorized
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			return errors.ErrUnauthorized
		}

		claims, err := config.JWTManager.ValidateToken(parts[1])
		if err != nil {
			return errors.ErrUnauthorized
		}

		c.Locals(UserIDKey, claims.UserID)

		return c.Next()
	}
}
