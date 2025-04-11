package http

import (
	"strconv"

	"kasikorn-line/internal/domain"
	"kasikorn-line/pkg/middleware"

	"github.com/gofiber/fiber/v2"
)

type DebitCardHandler struct {
	debitCardUsecase domain.DebitCardUsecase
}

// @Summary Get user's debit cards
// @Description Get all debit cards for a specific user with pagination
// @Tags debit-cards
// @Produce json
// @Param page query int false "Page number (default: 1)"
// @Param page_size query int false "Number of items per page (default: 10)"
// @Success 200 {object} domain.PaginatedDebitCards
// @Security ApiKeyAuth
// @Router /debit-cards/me [get]
func (h *DebitCardHandler) GetUserDebitCards(c *fiber.Ctx) error {
	userID, err := middleware.GetCurrentUserID(c)
	if err != nil {
		return err
	}

	page, _ := strconv.Atoi(c.Query("page", "1"))
	pageSize, _ := strconv.Atoi(c.Query("page_size", "10"))

	params := domain.PaginationParams{
		Page:     page,
		PageSize: pageSize,
	}

	cards, err := h.debitCardUsecase.GetUserDebitCards(c.Context(), userID, params)
	if err != nil {
		return err
	}

	return c.JSON(cards)
}

func NewDebitCardHandler(app *fiber.App, debitCardUsecase domain.DebitCardUsecase) {
	handler := &DebitCardHandler{
		debitCardUsecase: debitCardUsecase,
	}

	api := app.Group("/api/v1")
	debitCards := api.Group("/debit-cards")
	debitCards.Get("/me", handler.GetUserDebitCards)
}
