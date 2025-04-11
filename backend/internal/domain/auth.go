package domain

import "context"

type LoginResponse struct {
	Token string `json:"token"`
}

type AuthUsecase interface {
	Login(ctx context.Context, userID string) (*LoginResponse, error)
}
