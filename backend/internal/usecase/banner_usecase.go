package usecase

import (
	"context"
	"kasikorn-line/internal/domain"
)

type bannerUsecase struct {
	bannerRepo domain.BannerRepository
}

func NewBannerUsecase(bannerRepo domain.BannerRepository) domain.BannerUsecase {
	return &bannerUsecase{
		bannerRepo: bannerRepo,
	}
}

func (u *bannerUsecase) GetUserBanner(ctx context.Context, userID string) (*domain.Banner, error) {
	return u.bannerRepo.GetByUserID(ctx, userID)
}
