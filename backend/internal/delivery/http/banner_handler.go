package http

import (
	"kasikorn-line/internal/domain"
	"kasikorn-line/pkg/middleware"

	"github.com/gofiber/fiber/v2"
)

type BannerHandler struct {
	bannerUsecase domain.BannerUsecase
}

// @Summary Get current user's banner
// @Description Get the banner for the current user
// @Tags banners
// @Produce json
// @Success 200 {object} domain.Banner
// @Failure 400 {object} domain.ErrorResponse
// @Failure 404 {object} domain.ErrorResponse
// @Security ApiKeyAuth
// @Router /banners/me [get]
func (h *BannerHandler) GetUserBanner(c *fiber.Ctx) error {
	userID, err := middleware.GetCurrentUserID(c)
	if err != nil {
		return err
	}

	banner, err := h.bannerUsecase.GetUserBanner(c.Context(), userID)
	if err != nil {
		return err
	}

	return c.JSON(banner)
}

func NewBannerHandler(app *fiber.App, bannerUsecase domain.BannerUsecase) {
	handler := &BannerHandler{
		bannerUsecase: bannerUsecase,
	}

	api := app.Group("/api/v1")
	banners := api.Group("/banners")

	banners.Get("/me", handler.GetUserBanner)
}
