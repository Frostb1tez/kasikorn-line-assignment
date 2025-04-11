package usecase

import (
	"context"
	"kasikorn-line/internal/domain"
	"kasikorn-line/pkg/jwt"
)

type authUsecase struct {
	userRepo   domain.UserRepository
	jwtManager *jwt.JWTManager
}

func NewAuthUsecase(userRepo domain.UserRepository, jwtManager *jwt.JWTManager) domain.AuthUsecase {
	return &authUsecase{
		userRepo:   userRepo,
		jwtManager: jwtManager,
	}
}

func (u *authUsecase) Login(ctx context.Context, userID string) (*domain.LoginResponse, error) {
	_, err := u.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}

	token, err := u.jwtManager.GenerateToken(userID)
	if err != nil {
		return nil, err
	}

	return &domain.LoginResponse{
		Token: token,
	}, nil
}
