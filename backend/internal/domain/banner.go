package domain

import (
	"context"
)

type Banner struct {
	ID          string `json:"banner_id" gorm:"column:banner_id;primary_key"`
	UserID      string `json:"user_id" gorm:"column:user_id;uniqueIndex"`
	Title       string `json:"title" gorm:"column:title"`
	Description string `json:"description" gorm:"column:description"`
	Image       string `json:"image" gorm:"column:image"`
}

type BannerRepository interface {
	GetByUserID(ctx context.Context, userID string) (*Banner, error)
}

type BannerUsecase interface {
	GetUserBanner(ctx context.Context, userID string) (*Banner, error)
}
