package repository

import (
	"context"
	"kasikorn-line/internal/domain"

	"gorm.io/gorm"
)

type transactionRepository struct {
	db *gorm.DB
}

func NewTransactionRepository(db *gorm.DB) domain.TransactionRepository {
	return &transactionRepository{
		db: db,
	}
}

func (r *transactionRepository) GetByUserID(ctx context.Context, userID string, limit int) ([]*domain.Transaction, error) {
	var transactions []*domain.Transaction
	query := r.db.WithContext(ctx).
		Table("transactions").
		Where("user_id = ?", userID)

	if limit > 0 {
		query = query.Limit(limit)
	}

	if err := query.Find(&transactions).Error; err != nil {
		return nil, err
	}
	return transactions, nil
}
