package storage

import (
	"fmt"
	"main/models"

	// "main/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	var err error

	dsn := "Yash:password@tcp(127.0.0.1:3306)/MYDB?parseTime=true"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println("not connected")
	} else {
		fmt.Println("connect")
	}

	DB.AutoMigrate(&models.Library{})
	DB.AutoMigrate(&models.Users{})
	DB.AutoMigrate(&models.Bookinventry{})
	DB.AutoMigrate(&models.Requestevents{})
	DB.AutoMigrate(&models.Issueregistery{})

}
