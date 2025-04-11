package http

import (
	"kasikorn-line/internal/domain"
	"strconv"

	"kasikorn-line/pkg/middleware"

	"github.com/gofiber/fiber/v2"
)

type TransactionHandler struct {
	transactionUsecase domain.TransactionUsecase
}

// @Summary Get user's transactions
// @Description Get all transactions for a specific user with optional limit
// @Tags transactions
// @Produce json
// @Param limit query int false "Limit number of transactions"
// @Success 200 {object} domain.TransactionResponse
// @Failure 400 {object} domain.ErrorResponse
// @Failure 404 {object} domain.ErrorResponse
// @Security ApiKeyAuth
// @Router /transactions/me [get]
func (h *TransactionHandler) GetUserTransactions(c *fiber.Ctx) error {
	userID, err := middleware.GetCurrentUserID(c)
	if err != nil {
		return err
	}

	limit, _ := strconv.Atoi(c.Query("limit", "10"))

	transactions, err := h.transactionUsecase.GetUserTransactions(c.Context(), userID, limit)
	if err != nil {
		return err
	}

	response := &domain.TransactionResponse{
		Transactions: transactions,
		TotalCount:   int64(len(transactions)),
	}

	return c.JSON(response)
}

func NewTransactionHandler(app *fiber.App, transactionUsecase domain.TransactionUsecase) {
	handler := &TransactionHandler{
		transactionUsecase: transactionUsecase,
	}

	api := app.Group("/api/v1")
	transactions := api.Group("/transactions")

	transactions.Get("/me", handler.GetUserTransactions)
}
