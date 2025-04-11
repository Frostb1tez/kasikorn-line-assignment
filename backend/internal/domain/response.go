package domain

// @Description Error response from the API
type ErrorResponse struct {
	Status  int    `json:"status" example:"404"`
	Message string `json:"message" example:"User not found"`
}

// @Description Success response from the API
type SuccessResponse struct {
	Status int         `json:"status" example:"200"`
	Data   interface{} `json:"data"`
}
