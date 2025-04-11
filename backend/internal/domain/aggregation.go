package domain

import "context"

type UserAggregation struct {
	User        *User                `json:"user"`
	Account     []*Account           `json:"account"`
	DebitCard   *PaginatedDebitCards `json:"debit_card"`
	Banner      *Banner              `json:"banner"`
	Transaction *TransactionResponse `json:"transaction"`
}

type AggregationUsecase interface {
	GetUserAggregation(ctx context.Context, userID string, debitCardParams PaginationParams, transactionLimit int) (*UserAggregation, error)
}
