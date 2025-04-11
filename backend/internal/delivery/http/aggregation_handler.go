package http

import (
	"kasikorn-line/internal/domain"
	"kasikorn-line/pkg/middleware"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type AggregationHandler struct {
	aggregationUsecase domain.AggregationUsecase
}

// @Summary Get all user data
// @Description Get user profile, accounts, debit cards, banner, and transactions in a single call
// @Tags aggregation
// @Produce json
// @Param page query int false "Page number for debit cards (default: 1)"
// @Param page_size query int false "Number of debit cards per page (default: 10)"
// @Param transaction_limit query int false "Limit number of transactions (default: 10)"
// @Success 200 {object} domain.UserAggregation
// @Failure 401 {object} domain.ErrorResponse
// @Failure 404 {object} domain.ErrorResponse
// @Security ApiKeyAuth
// @Router /aggregate/me [get]
func (h *AggregationHandler) GetUserData(c *fiber.Ctx) error {
	userID, err := middleware.GetCurrentUserID(c)
	if err != nil {
		return err
	}

	// Get pagination parameters for debit cards
	page, _ := strconv.Atoi(c.Query("page", "1"))
	pageSize, _ := strconv.Atoi(c.Query("page_size", "10"))
	transactionLimit, _ := strconv.Atoi(c.Query("transaction_limit", "10"))

	debitCardParams := domain.PaginationParams{
		Page:     page,
		PageSize: pageSize,
	}

	data, err := h.aggregationUsecase.GetUserAggregation(c.Context(), userID, debitCardParams, transactionLimit)
	if err != nil {
		return err
	}

	return c.JSON(data)
}

func NewAggregationHandler(app *fiber.App, aggregationUsecase domain.AggregationUsecase) {
	handler := &AggregationHandler{
		aggregationUsecase: aggregationUsecase,
	}

	api := app.Group("/api/v1")
	api.Get("/aggregate/me", handler.GetUserData)
}
