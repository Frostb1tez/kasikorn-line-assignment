package http

import (
	"kasikorn-line/internal/domain"

	"github.com/gofiber/fiber/v2"
)

type AuthHandler struct {
	authUsecase domain.AuthUsecase
}

type loginRequest struct {
	UserID string `json:"user_id" validate:"required"`
}

// @Summary Login user
// @Description Login with user ID and get JWT token
// @Tags auth
// @Accept json
// @Produce json
// @Param request body loginRequest true "Login Request"
// @Success 200 {object} domain.LoginResponse
// @Failure 400 {object} domain.ErrorResponse
// @Failure 404 {object} domain.ErrorResponse
// @Router /auth/login [post]
func (h *AuthHandler) Login(c *fiber.Ctx) error {
	var req loginRequest
	if err := c.BodyParser(&req); err != nil {
		return err
	}

	response, err := h.authUsecase.Login(c.Context(), req.UserID)
	if err != nil {
		return err
	}

	return c.JSON(response)
}

func NewAuthHandler(app *fiber.App, authUsecase domain.AuthUsecase) {
	handler := &AuthHandler{
		authUsecase: authUsecase,
	}

	api := app.Group("/api/v1")
	auth := api.Group("/auth")

	auth.Post("/login", handler.Login)
}
