package repository

import (
	"context"

	"gorm.io/gorm"

	"kasikorn-line/internal/domain"
)

type debitCardRepository struct {
	db *gorm.DB
}

func NewDebitCardRepository(db *gorm.DB) domain.DebitCardRepository {
	return &debitCardRepository{db: db}
}

func (r *debitCardRepository) GetUserDebitCards(ctx context.Context, userID string, params domain.PaginationParams) (*domain.PaginatedDebitCards, error) {
	var cards []*domain.DebitCard
	var totalCount int64

	if err := r.db.WithContext(ctx).
		Table("debit_cards").
		Where("user_id = ?", userID).
		Count(&totalCount).Error; err != nil {
		return nil, err
	}

	offset := (params.Page - 1) * params.PageSize

	query := r.db.WithContext(ctx).
		Table("debit_cards dc").
		Select(`
			dc.card_id as id,
			dc.user_id,
			dc.name,
			dcs.status,
			dcd.issuer,
			dcd.number as card_number,
			dcde.color,
			dcde.border_color
		`).
		Joins("LEFT JOIN debit_card_status dcs ON dc.card_id = dcs.card_id").
		Joins("LEFT JOIN debit_card_details dcd ON dc.card_id = dcd.card_id").
		Joins("LEFT JOIN debit_card_design dcde ON dc.card_id = dcde.card_id").
		Where("dc.user_id = ?", userID).
		Offset(offset).
		Limit(params.PageSize)

	if err := query.Find(&cards).Error; err != nil {
		return nil, err
	}

	hasMore := offset+len(cards) < int(totalCount)

	return &domain.PaginatedDebitCards{
		Cards:      cards,
		TotalCount: totalCount,
		Page:       params.Page,
		PageSize:   params.PageSize,
		HasMore:    hasMore,
	}, nil
}
