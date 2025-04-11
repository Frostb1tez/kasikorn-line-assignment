package domain

import (
	"context"
	"time"
)

type Account struct {
	AccountID     string        `json:"account_id" gorm:"column:account_id;primary_key"`
	UserID        string        `json:"user_id" gorm:"column:user_id"`
	Type          string        `json:"type" gorm:"column:type"`
	Currency      string        `json:"currency" gorm:"column:currency"`
	AccountNumber string        `json:"account_number" gorm:"column:account_number"`
	Issuer        string        `json:"issuer" gorm:"column:issuer"`
	Balance       float64       `json:"balance" gorm:"column:balance"`
	Color         string        `json:"color" gorm:"column:color"`
	IsMainAccount bool          `json:"is_main_account" gorm:"column:is_main_account"`
	Progress      int           `json:"progress" gorm:"column:progress"`
	Flags         []AccountFlag `json:"flags,omitempty" gorm:"-"`
}

type AccountFlag struct {
	FlagID    int       `json:"-" gorm:"column:flag_id;primary_key;auto_increment"`
	AccountID string    `json:"-" gorm:"column:account_id"`
	UserID    string    `json:"-" gorm:"column:user_id"`
	FlagType  string    `json:"flag_type" gorm:"column:flag_type"`
	FlagValue string    `json:"flag_value" gorm:"column:flag_value"`
	CreatedAt time.Time `json:"created_at" gorm:"column:created_at"`
	UpdatedAt time.Time `json:"updated_at" gorm:"column:updated_at"`
}

type AccountWithFlags struct {
	Account
	FlagID        *int       `gorm:"column:flag_id"`
	FlagType      *string    `gorm:"column:flag_type"`
	FlagValue     *string    `gorm:"column:flag_value"`
	FlagCreatedAt *time.Time `gorm:"column:flag_created_at"`
	FlagUpdatedAt *time.Time `gorm:"column:flag_updated_at"`
}

type AccountRepository interface {
	GetUserAccounts(ctx context.Context, userID string) ([]*Account, error)
}

type AccountUsecase interface {
	GetUserAccounts(ctx context.Context, userID string) ([]*Account, error)
}
