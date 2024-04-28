package auth

import (
	"main/models"
	"main/storage.go"
	"github.com/gin-gonic/gin"
)

func Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		Email := c.Param("email")
		var user models.Users
		if err := storage.DB.Where("email = ?", Email).First(&user).Error; err != nil {
			c.AbortWithStatusJSON(401, gin.H{"message": "unauthorized"})
			return
		}
		c.Set("email", user.Email)
		c.Next()
	}
}

func ReaderAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		Email := c.Param("email")
		var user models.Users
		if err := storage.DB.Where("email = ?", Email).First(&user).Error; err != nil {
			c.JSON(401, gin.H{"err": "unauthorized"})
			return
		}

		if user.Role != "reader" {
			c.AbortWithStatusJSON(403, gin.H{"err": "Forbidden"})
			return
		}
		c.Next()
	}
}

func AdminAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		Email := c.Param("email")
		var user models.Users
		if err := storage.DB.Where("email = ?", Email).First(&user).Error; err != nil {
			c.AbortWithStatusJSON(401, gin.H{"err": "unauthorized"})
			return
		}

		if user.Role != "admin" {
			c.AbortWithStatusJSON(403, gin.H{"err": "Forbidden"})
			return
		}
		c.Next()
	}
}
