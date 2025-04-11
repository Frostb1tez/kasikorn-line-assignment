package repository

import (
	"context"
	"kasikorn-line/internal/domain"

	"gorm.io/gorm"
)

type bannerRepository struct {
	db *gorm.DB
}

func NewBannerRepository(db *gorm.DB) domain.BannerRepository {
	return &bannerRepository{
		db: db,
	}
}

func (r *bannerRepository) GetByUserID(ctx context.Context, userID string) (*domain.Banner, error) {
	var banner domain.Banner
	if err := r.db.WithContext(ctx).
		Table("banners").
		Where("user_id = ?", userID).
		First(&banner).Error; err != nil {
		return nil, err
	}
	return &banner, nil
}
