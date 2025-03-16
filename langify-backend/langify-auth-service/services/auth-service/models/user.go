package models

import (
	"time"

	"gorm.io/gorm"
)

// Role definitions
type UserRole string

const (
	RoleStudent UserRole = "student"
	RoleTeacher UserRole = "teacher"
	RoleAdmin   UserRole = "admin"
)

// Credentials model for login requests
type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// User model
type User struct {
	ID            string   `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	FullName      string   `gorm:"type:varchar(255);not null" json:"full_name"`
	Email         string   `gorm:"uniqueIndex;not null" json:"email"`
	PasswordHash  string   `gorm:"not null" json:"-"`
	ProfilePicURL string   `json:"profile_pic_url,omitempty"`
	Bio           string   `gorm:"type:text" json:"bio,omitempty"`
	Role          UserRole `gorm:"type:varchar(20);not null;default:'student'" json:"role"`
	Language      string   `gorm:"type:varchar(50);not null" json:"language"` // Preferred language
	Timezone      string   `gorm:"type:varchar(50);not null;default:'UTC'" json:"timezone"`

	// Teacher-specific fields
	TeachingLanguages []UserTeachingLanguage `gorm:"foreignKey:UserID" json:"teaching_languages,omitempty"`
	PricePerHour      float64                `gorm:"default:0" json:"price_per_hour,omitempty"`
	Rating            float64                `gorm:"default:0" json:"rating,omitempty"`
	TotalReviews      int                    `gorm:"default:0" json:"total_reviews,omitempty"`

	// Subscription & Certification
	SubscriptionStatus string          `gorm:"type:varchar(20);default:'free'" json:"subscription_status"`
	Certifications     []Certification `gorm:"foreignKey:UserID" json:"certifications,omitempty"`

	// System fields
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"` // Soft delete support
}

// UserTeachingLanguage model - Many-to-Many relation between Users and Languages they teach
type UserTeachingLanguage struct {
	ID               string `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID           string `gorm:"type:uuid;not null" json:"user_id"`
	Language         string `gorm:"type:varchar(50);not null" json:"language"`
	ProficiencyLevel string `gorm:"type:varchar(20);not null"` // Beginner, Intermediate, Advanced
}

// Certification model
type Certification struct {
	ID       string    `gorm:"type:uuid;default:gen_random_uuid();primaryKey" json:"id"`
	UserID   string    `gorm:"type:uuid;not null" json:"user_id"`
	CourseID string    `gorm:"type:uuid;not null" json:"course_id"`
	IssuedAt time.Time `gorm:"autoCreateTime" json:"issued_at"`
	Status   string    `gorm:"type:varchar(20);default:'pending'" json:"status"` // pending, completed, verified
}
