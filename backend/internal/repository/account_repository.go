package repository

import (
	"context"
	"kasikorn-line/internal/domain"

	"gorm.io/gorm"
)

type accountRepository struct {
	db *gorm.DB
}

func NewAccountRepository(db *gorm.DB) domain.AccountRepository {
	return &accountRepository{db: db}
}

func (r *accountRepository) GetUserAccounts(ctx context.Context, userID string) ([]*domain.Account, error) {
	var results []*domain.AccountWithFlags

	err := r.db.WithContext(ctx).
		Table("accounts").
		Select(`
			accounts.*,
			account_balances.amount as balance,
			account_details.color,
			account_details.is_main_account,
			account_details.progress,
			account_flags.flag_id,
			account_flags.flag_type,
			account_flags.flag_value,
			account_flags.created_at as flag_created_at,
			account_flags.updated_at as flag_updated_at
		`).
		Joins("LEFT JOIN account_balances ON accounts.account_id = account_balances.account_id").
		Joins("LEFT JOIN account_details ON accounts.account_id = account_details.account_id").
		Joins("LEFT JOIN account_flags ON accounts.account_id = account_flags.account_id").
		Where("accounts.user_id = ?", userID).
		Find(&results).Error

	if err != nil {
		return nil, err
	}

	accountMap := make(map[string]*domain.Account)

	for _, result := range results {
		account, exists := accountMap[result.AccountID]
		if !exists {
			account = &domain.Account{
				AccountID:     result.AccountID,
				UserID:        result.UserID,
				Type:          result.Type,
				Currency:      result.Currency,
				AccountNumber: result.AccountNumber,
				Issuer:        result.Issuer,
				Balance:       result.Balance,
				Color:         result.Color,
				IsMainAccount: result.IsMainAccount,
				Progress:      result.Progress,
				Flags:         make([]domain.AccountFlag, 0),
			}
			accountMap[result.AccountID] = account
		}

		if result.FlagID != nil && result.FlagType != nil && result.FlagValue != nil {
			flag := domain.AccountFlag{
				FlagID:    *result.FlagID,
				AccountID: result.AccountID,
				UserID:    result.UserID,
				FlagType:  *result.FlagType,
				FlagValue: *result.FlagValue,
			}
			if result.FlagCreatedAt != nil {
				flag.CreatedAt = *result.FlagCreatedAt
			}
			if result.FlagUpdatedAt != nil {
				flag.UpdatedAt = *result.FlagUpdatedAt
			}
			account.Flags = append(account.Flags, flag)
		}
	}

	accounts := make([]*domain.Account, 0, len(accountMap))
	for _, account := range accountMap {
		accounts = append(accounts, account)
	}

	return accounts, nil
}
