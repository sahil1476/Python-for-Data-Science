package handlers

import (
	"main/models"
	"main/storage.go"

	"github.com/gin-gonic/gin"
)


type Verrify struct{

	Email         string `json:"email"`
	Password	  string  `json:"password"`
}

func Verifyadmin(c *gin.Context) {

	var user models.Users
	var ver Verrify

	err := c.BindJSON(&ver)

	if err != nil {
		c.JSON(400, "wrong details entered")
		return
	}

	if err := storage.DB.Where("email = ?", ver.Email).First(&user).Error; err != nil {
		c.AbortWithStatusJSON(404, gin.H{"message": "email not foundd"})
		return
	}

	if user.Password != ver.Password {
		c.AbortWithStatusJSON(401, gin.H{"message": "wrong password"})
		return

	}

	if user.Role !="admin"{
		c.AbortWithStatusJSON(401, gin.H{"message": "not permitted"})
		return
	}

	c.JSON(200, gin.H{

		"message": "admin verified",
	})

}

func VerifyUser(c *gin.Context) {

	var user models.Users
	var ver Verrify

	err := c.BindJSON(&ver)

	if err != nil {
		c.JSON(400, "wrong details entered")
		return
	}

	if err := storage.DB.Where("email = ?", ver.Email).First(&user).Error; err != nil {
		c.AbortWithStatusJSON(404, gin.H{"message": "email not foundd"})
		return
	}

	if user.Password != ver.Password {
		c.AbortWithStatusJSON(401, gin.H{"message": "wrong password"})
		return

	}

	if user.Role !="reader"{
		c.AbortWithStatusJSON(401, gin.H{"message": "not permitted"})
		return
	}

	c.JSON(200, gin.H{

		"message": "user verified",
	})



}
