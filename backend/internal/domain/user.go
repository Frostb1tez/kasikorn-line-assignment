package domain

import (
	"context"
)

// @Description User information
type User struct {
	ID       string `json:"user_id" gorm:"column:user_id;primary_key" example:"123e4567-e89b-12d3-a456-426614174000"`
	Name     string `json:"name" gorm:"column:name" example:"John Doe"`
	Greeting string `json:"greeting" gorm:"column:greeting" example:"Hello, how are you?"`
}

type UserRepository interface {
	GetByID(ctx context.Context, id string) (*User, error)
}

type UserUsecase interface {
	GetUser(ctx context.Context, id string) (*User, error)
}
