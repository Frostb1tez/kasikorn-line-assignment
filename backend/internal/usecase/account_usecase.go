package usecase

import (
	"context"
	"kasikorn-line/internal/domain"
)

type accountUsecase struct {
	accountRepo domain.AccountRepository
	userRepo    domain.UserRepository
}

func NewAccountUsecase(accountRepo domain.AccountRepository, userRepo domain.UserRepository) domain.AccountUsecase {
	return &accountUsecase{
		accountRepo: accountRepo,
		userRepo:    userRepo,
	}
}

func (u *accountUsecase) GetUserAccounts(ctx context.Context, userID string) ([]*domain.Account, error) {
	return u.accountRepo.GetUserAccounts(ctx, userID)
}
