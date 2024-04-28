package main

import (
	"fmt"
	"main/auth"
	"main/handlers"
	"main/routes"
	"main/storage.go"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	fmt.Println("hello")

	storage.Connect()

	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	r.Use(cors.New(config))
	r.Use(cors.Default())

	// corsConfig.AllowOrigins = []string{"http://localhost:3000/"}
	// To be able to send tokens to the server.
	// corsConfig.AllowCredentials = true

	// OPTIONS method for ReactJS
	// corsConfig.AddAllowMethods("OPTIONS")

	// Register the middleware
	// r.Use(cors.New(corsConfig))

	r.POST("/library/create_user", handlers.Create_Users)
	r.DELETE("/library/delete", handlers.Delete_Book)
	r.GET("/library/viewrequests", handlers.All_Requests)
	r.GET("/library/getbooks/:str", handlers.Read_BooksBY)
	r.PATCH("/library/update", handlers.Update_Book)

	r.POST("/library/addrequest/", handlers.Issue_Request)
	r.POST("/library/create_library", handlers.Library)
	r.POST("/library/add_book", handlers.Add_Book)
	r.POST("/library/approve", handlers.Aprrove_Request)

	r.POST("/library/verifyadmin", handlers.Verifyadmin)
	r.POST("/library/verifyuser", handlers.VerifyUser)
	r.POST("/library/disapprove", handlers.Disapprove)
	r.POST("/library/signup",handlers.Sign_Up_User)

	r.Use(auth.Middleware())

	routes.LoadRoutes(r)

	r.Run("localhost:8080")
}
