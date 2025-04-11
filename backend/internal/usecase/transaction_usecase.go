package usecase

import (
	"context"
	"kasikorn-line/internal/domain"
)

type transactionUsecase struct {
	transactionRepo domain.TransactionRepository
}

func NewTransactionUsecase(transactionRepo domain.TransactionRepository) domain.TransactionUsecase {
	return &transactionUsecase{
		transactionRepo: transactionRepo,
	}
}

func (u *transactionUsecase) GetUserTransactions(ctx context.Context, userID string, limit int) ([]*domain.Transaction, error) {
	return u.transactionRepo.GetByUserID(ctx, userID, limit)
}
