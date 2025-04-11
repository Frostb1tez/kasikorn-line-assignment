package http

import (
	"kasikorn-line/internal/domain"
	"kasikorn-line/pkg/middleware"

	"github.com/gofiber/fiber/v2"
)

type AccountHandler struct {
	accountUsecase domain.AccountUsecase
}

// @Summary Get current user's accounts and recent transactions
// @Description Get current user's accounts and recent transactions
// @Tags accounts
// @Produce json
// @Success 200 {array} domain.Account
// @Security ApiKeyAuth
// @Router /accounts/me [get]
func (h *AccountHandler) GetUserAccounts(c *fiber.Ctx) error {
	userID, err := middleware.GetCurrentUserID(c)
	if err != nil {
		return err
	}

	response, err := h.accountUsecase.GetUserAccounts(c.Context(), userID)
	if err != nil {
		return err
	}

	return c.JSON(response)
}

func NewAccountHandler(app *fiber.App, accountUsecase domain.AccountUsecase) {
	handler := &AccountHandler{
		accountUsecase: accountUsecase,
	}

	api := app.Group("/api/v1")
	accounts := api.Group("/accounts")

	accounts.Get("/me", handler.GetUserAccounts)
}
