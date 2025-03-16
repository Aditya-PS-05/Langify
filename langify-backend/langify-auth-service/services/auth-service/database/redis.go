package database

import (
	"context"
	"fmt"

	"github.com/go-redis/redis/v8"
)

var rdb *redis.Client
var ctx = context.Background()

func InitRedis() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	fmt.Println("✅ Redis initialized")
}

func StoreSession(email, token string) error {
	return rdb.Set(ctx, email, token, 0).Err()
}
