package middleware

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

type LogEntry struct {
	RequestID    string      `json:"request_id"`
	Timestamp    time.Time   `json:"timestamp"`
	Method       string      `json:"method"`
	Path         string      `json:"path"`
	Status       int         `json:"status"`
	Latency      string      `json:"latency"`
	IP           string      `json:"ip"`
	UserAgent    string      `json:"user_agent"`
	ErrorMessage string      `json:"error,omitempty"`
	QueryParams  string      `json:"query_params,omitempty"`
	Body         interface{} `json:"body,omitempty"`
}

func Logger(c *fiber.Ctx) error {
	start := time.Now()

	requestID := c.Get("X-Request-ID")
	if requestID == "" {
		requestID = fmt.Sprintf("%d", time.Now().UnixNano())
	}
	c.Locals("requestID", requestID)

	var body interface{}
	if len(c.Body()) > 0 {
		if err := json.Unmarshal(c.Body(), &body); err != nil {
			body = string(c.Body())
		}
	}

	err := c.Next()

	latency := time.Since(start)

	logEntry := LogEntry{
		RequestID:   requestID,
		Timestamp:   time.Now(),
		Method:      c.Method(),
		Path:        c.Path(),
		Status:      c.Response().StatusCode(),
		Latency:     fmt.Sprintf("%v", latency),
		IP:          c.IP(),
		UserAgent:   c.Get("User-Agent"),
		QueryParams: string(c.Request().URI().QueryString()),
		Body:        body,
	}

	if err != nil {
		logEntry.ErrorMessage = err.Error()
	}

	logJSON, _ := json.MarshalIndent(logEntry, "", "  ")

	fmt.Printf("%s\n", string(logJSON))

	return err
}
