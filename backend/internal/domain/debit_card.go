package domain

import (
	"context"
)

type DebitCard struct {
	ID          string `json:"id" gorm:"column:id;primaryKey"`
	UserID      string `json:"user_id" gorm:"column:user_id"`
	Name        string `json:"name" gorm:"column:name"`
	Status      string `json:"status" gorm:"column:status"`
	Issuer      string `json:"issuer" gorm:"column:issuer"`
	CardNumber  string `json:"card_number" gorm:"column:card_number"`
	Color       string `json:"color" gorm:"column:color"`
	BorderColor string `json:"border_color" gorm:"column:border_color"`
}

type PaginatedDebitCards struct {
	Cards      []*DebitCard `json:"cards"`
	TotalCount int64        `json:"total_count"`
	Page       int          `json:"page"`
	PageSize   int          `json:"page_size"`
	HasMore    bool         `json:"has_more"`
}

type PaginationParams struct {
	Page     int `json:"page" form:"page"`
	PageSize int `json:"page_size" form:"page_size"`
}

type DebitCardRepository interface {
	GetUserDebitCards(ctx context.Context, userID string, params PaginationParams) (*PaginatedDebitCards, error)
}

type DebitCardUsecase interface {
	GetUserDebitCards(ctx context.Context, userID string, params PaginationParams) (*PaginatedDebitCards, error)
}
