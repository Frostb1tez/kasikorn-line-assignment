package usecase

import (
	"context"
	"kasikorn-line/internal/domain"
)

type debitCardUsecase struct {
	debitCardRepo domain.DebitCardRepository
}

func NewDebitCardUsecase(repo domain.DebitCardRepository) domain.DebitCardUsecase {
	return &debitCardUsecase{
		debitCardRepo: repo,
	}
}

func (u *debitCardUsecase) GetUserDebitCards(ctx context.Context, userID string, params domain.PaginationParams) (*domain.PaginatedDebitCards, error) {
	if params.Page <= 0 {
		params.Page = 1
	}
	if params.PageSize <= 0 {
		params.PageSize = 10
	}

	return u.debitCardRepo.GetUserDebitCards(ctx, userID, params)
}
