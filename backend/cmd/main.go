package main

import (
	"fmt"
	"log"
	"time"

	"kasikorn-line/config"
	_ "kasikorn-line/docs" // Import swagger docs
	"kasikorn-line/internal/delivery/http"
	"kasikorn-line/internal/repository"
	"kasikorn-line/internal/usecase"
	"kasikorn-line/pkg/jwt"
	"kasikorn-line/pkg/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/swagger"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// @title           Kasikorn Line API
// @version         1.0
// @description     API Server for Kasikorn Line Application
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.email  support@kasikornline.com

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8080
// @BasePath  /api/v1

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization

func main() {
	cfg := config.LoadConfig()

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		cfg.DBUser,
		cfg.DBPassword,
		cfg.DBHost,
		cfg.DBPort,
		cfg.DBName,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	jwtManager := jwt.NewJWTManager(cfg.JWTSecret, 24*time.Hour)

	userRepo := repository.NewUserRepository(db)
	accountRepo := repository.NewAccountRepository(db)
	debitCardRepo := repository.NewDebitCardRepository(db)
	bannerRepo := repository.NewBannerRepository(db)
	transactionRepo := repository.NewTransactionRepository(db)

	userUsecase := usecase.NewUserUsecase(userRepo)
	accountUsecase := usecase.NewAccountUsecase(accountRepo, userRepo)
	debitCardUsecase := usecase.NewDebitCardUsecase(debitCardRepo)
	bannerUsecase := usecase.NewBannerUsecase(bannerRepo)
	transactionUsecase := usecase.NewTransactionUsecase(transactionRepo)
	authUsecase := usecase.NewAuthUsecase(userRepo, jwtManager)
	aggregationUsecase := usecase.NewAggregationUsecase(
		userUsecase,
		accountUsecase,
		debitCardUsecase,
		bannerUsecase,
		transactionUsecase,
	)

	app := fiber.New()

	app.Use(cors.New())
	app.Use(logger.New())
	app.Use(recover.New())
	app.Use(middleware.Logger)
	app.Use(middleware.ErrorHandler)

	authMiddleware := middleware.NewAuthMiddleware(middleware.AuthConfig{
		JWTManager: jwtManager,
		SkipPaths: []string{
			"/api/v1/auth",
			"/swagger",
		},
	})

	app.Use(authMiddleware)

	app.Get("/swagger/*", swagger.HandlerDefault)

	http.NewUserHandler(app, userUsecase)
	http.NewAccountHandler(app, accountUsecase)
	http.NewDebitCardHandler(app, debitCardUsecase)
	http.NewBannerHandler(app, bannerUsecase)
	http.NewTransactionHandler(app, transactionUsecase)
	http.NewAuthHandler(app, authUsecase)
	http.NewAggregationHandler(app, aggregationUsecase)

	log.Printf("Server is running on port %s", cfg.ServerPort)
	log.Fatal(app.Listen(":" + cfg.ServerPort))
}
