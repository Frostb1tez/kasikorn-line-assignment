package http

import (
	"kasikorn-line/internal/domain"
	"kasikorn-line/pkg/middleware"

	"github.com/gofiber/fiber/v2"
)

type UserHandler struct {
	userUsecase domain.UserUsecase
}

// @Summary Get current user
// @Description Get current user's details
// @Tags users
// @Accept json
// @Produce json
// @Success 200 {object} domain.SuccessResponse
// @Failure 404 {object} domain.ErrorResponse
// @Security ApiKeyAuth
// @Router /users/me [get]
func (h *UserHandler) GetUser(c *fiber.Ctx) error {
	userID, err := middleware.GetCurrentUserID(c)
	if err != nil {
		return err
	}

	user, err := h.userUsecase.GetUser(c.Context(), userID)
	if err != nil {
		return err
	}

	return c.JSON(user)
}

func NewUserHandler(app *fiber.App, userUsecase domain.UserUsecase) {
	handler := &UserHandler{
		userUsecase: userUsecase,
	}

	api := app.Group("/api/v1")
	users := api.Group("/users")

	users.Get("/me", handler.GetUser)
}
