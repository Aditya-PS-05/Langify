package database

import (
	"context"
	"fmt"
	"os"

	"github.com/go-redis/redis/v8"
)

var rdb *redis.Client
var ctx = context.Background()

func InitRedis() {
	redisHost := os.Getenv("REDIS_HOST")
	redisPort := os.Getenv("REDIS_PORT")
	redisAddr := fmt.Sprintf("%s:%s", redisHost, redisPort)

	rdb = redis.NewClient(&redis.Options{
		Addr:     redisAddr,
		Password: "",
		DB:       0,
	})
	fmt.Println("✅ Connected to AWS ElastiCache Redis at", redisAddr)
}

func StoreSession(email, accessToken, refreshToken string) error {
	sessionKey := fmt.Sprintf("session:email:%s", email)
	data := map[string]interface{}{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
	}

	return rdb.HSet(ctx, sessionKey, data).Err()
}

// Store tokens for Google authentication
func StoreGoogleSession(email, accessToken, refreshToken string) error {
	sessionKey := fmt.Sprintf("session:google:%s", email)
	data := map[string]interface{}{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
	}

	return rdb.HSet(ctx, sessionKey, data).Err()
}

// Retrieve tokens for email-password authentication
func GetSession(email string) (string, string, error) {
	sessionKey := fmt.Sprintf("session:email:%s", email)
	data, err := rdb.HGetAll(ctx, sessionKey).Result()
	if err != nil {
		return "", "", err
	}

	accessToken, ok1 := data["access_token"]
	refreshToken, ok2 := data["refresh_token"]
	if !ok1 || !ok2 {
		return "", "", fmt.Errorf("session not found for %s", email)
	}

	return accessToken, refreshToken, nil
}

// Retrieve tokens for Google authentication
func GetGoogleSession(email string) (string, string, error) {
	sessionKey := fmt.Sprintf("session:google:%s", email)
	data, err := rdb.HGetAll(ctx, sessionKey).Result()
	if err != nil {
		return "", "", err
	}

	accessToken, ok1 := data["access_token"]
	refreshToken, ok2 := data["refresh_token"]
	if !ok1 || !ok2 {
		return "", "", fmt.Errorf("google session not found for %s", email)
	}

	return accessToken, refreshToken, nil
}

// Delete session for email-password authentication
func DeleteSession(email string) error {
	sessionKey := fmt.Sprintf("session:email:%s", email)
	return rdb.Del(ctx, sessionKey).Err()
}

// Delete session for Google authentication
func DeleteGoogleSession(email string) error {
	sessionKey := fmt.Sprintf("session:google:%s", email)
	return rdb.Del(ctx, sessionKey).Err()
}
