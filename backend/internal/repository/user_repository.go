package repository

import (
	"context"

	"kasikorn-line/internal/domain"

	"gorm.io/gorm"
)

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) domain.UserRepository {
	return &userRepository{
		db: db,
	}
}

func (r *userRepository) GetByID(ctx context.Context, id string) (*domain.User, error) {
	var user domain.User
	if err := r.db.WithContext(ctx).
		Table("users").
		Select("users.*, user_greetings.greeting").
		Joins("LEFT JOIN user_greetings ON users.user_id = user_greetings.user_id").
		Where("users.user_id = ?", id).
		First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
