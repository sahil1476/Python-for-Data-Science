package routes

import (
	"main/auth"
	"main/handlers"

	"github.com/gin-gonic/gin"
)

func LoadRoutes(r *gin.Engine) {

	admin := r.Group("/admin")
	admin.Use(auth.AdminAuthMiddleware())
	{

		// admin.POST("/library/create_library/:email", handlers.Library)
		// admin.POST("/library/create_user/:email", handlers.Create_Users)
		// admin.POST("/library/add_book/:email", handlers.Add_Book)
		admin.GET("/library/read_books/:email", handlers.Read_Books)
		admin.GET("/library/get_by_id/:email/:isbn", handlers.Getbookbyid)
		// admin.PATCH("/library/update/:email/", handlers.Update_Book)
		// admin.GET("/library/viewrequests/:email", handlers.All_Requests)
		// admin.POST("/library/approve/:email", handlers.Aprrove_Request)
		// admin.POST("/library/disapprove/:email", handlers.Disapprove)
		// admin.DELETE("/library/delete/:email/", handlers.Delete_Book)

		// admin.GET("/search-book/:email/:isbn", controllers.UpdateISBN)
		// admin.POST("/add-user/:email", controllers.UserCreate)
		// admin.POST("/add-library/:email", controllers.RegLibrary)
		// admin.POST("/add-book/:email", controllers.AddBook)
		// admin.DELETE("/remove-book/:email", controllers.RemoveBook)
		// admin.PUT("/update-book/:email", controllers.UpdateBook)
		// admin.GET("/list-issue-request/:email", controllers.ListIssueRequest)
		// admin.POST("/approve-reject-issue-request/:email", controllers.ApproveRejectIssueRequest)
	}

	// reader := r.Group("/reader")
	admin.Use(auth.ReaderAuthMiddleware())
	{
		// reader.GET("/search-book/:email/:query", handlers.Read_BooksBY)
		// reader.POST("/raise-issue-request/:email", handlers.Issue_Request)
		// reader.GET("/library/user/getbooks/:email", handlers.Read_BooksBY)
		// reader.POST("/library/user/addrequest/:email", handlers.Issue_Request)

	}

}
