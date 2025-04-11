package usecase

import (
	"context"
	"kasikorn-line/internal/domain"
)

type aggregationUsecase struct {
	userUsecase        domain.UserUsecase
	accountUsecase     domain.AccountUsecase
	debitCardUsecase   domain.DebitCardUsecase
	bannerUsecase      domain.BannerUsecase
	transactionUsecase domain.TransactionUsecase
}

func NewAggregationUsecase(
	userUsecase domain.UserUsecase,
	accountUsecase domain.AccountUsecase,
	debitCardUsecase domain.DebitCardUsecase,
	bannerUsecase domain.BannerUsecase,
	transactionUsecase domain.TransactionUsecase,
) domain.AggregationUsecase {
	return &aggregationUsecase{
		userUsecase:        userUsecase,
		accountUsecase:     accountUsecase,
		debitCardUsecase:   debitCardUsecase,
		bannerUsecase:      bannerUsecase,
		transactionUsecase: transactionUsecase,
	}
}

func (u *aggregationUsecase) GetUserAggregation(
	ctx context.Context,
	userID string,
	debitCardParams domain.PaginationParams,
	transactionLimit int,
) (*domain.UserAggregation, error) {
	type result struct {
		user         *domain.User
		accounts     []*domain.Account
		debitCards   *domain.PaginatedDebitCards
		banner       *domain.Banner
		transactions []*domain.Transaction
		err          error
	}

	ch := make(chan result)

	go func() {
		user, err := u.userUsecase.GetUser(ctx, userID)
		ch <- result{user: user, err: err}
	}()

	go func() {
		accounts, err := u.accountUsecase.GetUserAccounts(ctx, userID)
		ch <- result{accounts: accounts, err: err}
	}()

	go func() {
		debitCards, err := u.debitCardUsecase.GetUserDebitCards(ctx, userID, debitCardParams)
		ch <- result{debitCards: debitCards, err: err}
	}()

	go func() {
		banner, err := u.bannerUsecase.GetUserBanner(ctx, userID)
		ch <- result{banner: banner, err: err}
	}()

	go func() {
		transactions, err := u.transactionUsecase.GetUserTransactions(ctx, userID, transactionLimit)
		ch <- result{transactions: transactions, err: err}
	}()

	var aggregation domain.UserAggregation
	var firstError error

	for i := 0; i < 5; i++ {
		r := <-ch
		if r.err != nil {
			if firstError == nil {
				firstError = r.err
			}
			continue
		}

		if r.user != nil {
			aggregation.User = r.user
		}
		if r.accounts != nil {
			aggregation.Account = r.accounts
		}
		if r.debitCards != nil {
			aggregation.DebitCard = r.debitCards
		}
		if r.banner != nil {
			aggregation.Banner = r.banner
		}
		if r.transactions != nil {
			aggregation.Transaction = &domain.TransactionResponse{
				Transactions: r.transactions,
				TotalCount:   int64(len(r.transactions)),
			}
		}
	}

	if firstError != nil {
		return nil, firstError
	}

	return &aggregation, nil
}
