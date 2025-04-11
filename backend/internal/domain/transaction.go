package domain

import (
	"context"
)

type Transaction struct {
	ID     string  `json:"transaction_id" gorm:"column:transaction_id;primary_key"`
	UserID string  `json:"user_id" gorm:"column:user_id"`
	Name   string  `json:"name" gorm:"column:name"`
	Image  string  `json:"image" gorm:"column:image"`
	IsBank bool    `json:"is_bank" gorm:"column:isBank"`
	Amount float64 `json:"amount" gorm:"column:amount"`
	Type   string  `json:"type" gorm:"column:type"`
}

type TransactionRepository interface {
	GetByUserID(ctx context.Context, userID string, limit int) ([]*Transaction, error)
}

type TransactionUsecase interface {
	GetUserTransactions(ctx context.Context, userID string, limit int) ([]*Transaction, error)
}

type TransactionResponse struct {
	Transactions []*Transaction `json:"transactions"`
	TotalCount   int64          `json:"total_count"`
}
