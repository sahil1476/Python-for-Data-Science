package handlers

import (
	"fmt"
	"main/models"
	"main/storage.go"
	"time"

	"github.com/gin-gonic/gin"
)

type Query struct {
	Queryt string `json:"queryt"`
}

func Read_BooksBY(c *gin.Context) {

	str := c.Param("str")

	// var query Query

	// err2 := c.BindJSON(&query)
	// if err2 != nil {

	// 	c.JSON(400, "error")
	// 	return
	// }

	var books []models.Bookinventry
	// str := query.Queryt

	err := storage.DB.Where("title like ? or authors like ?  or publisher like ?", "%"+str+"%", "%"+str+"%", "%"+str+"%").Find(&books).Error

	// err := storage.DB.Where("title LIKE?", "%"+str+"%").Find(&books).Error

	if err != nil {
		c.JSON(400, "error")
		return
	}

	fmt.Println(str)
	// if len(books)

	c.JSON(200, books)

}

func Issue_Request(c *gin.Context) {

	var request models.Requestevents
	var book models.Bookinventry
	var issue models.Issueregistery
	// var user models.Users

	// request.=time.Now()

	err := c.BindJSON(&request)

	if err != nil {

		c.JSON(400, "book not found")
		return
	}
	isbn := request.BookId

	err3 := storage.DB.First(&book, isbn).Error

	fmt.Println(isbn)
	if err3 != nil {

		c.JSON(404, "wrong isbn entered")
		return
	}

	if book.AvailableCopies < 1 {

		// err4 := storage.DB.First(&issue, isbn).Error

		err4 := storage.DB.Raw("SELECT * FROM issueregisteries WHERE isbn = ? order by  expected_return_date LIMIT 1", isbn).Scan(&issue).Error
		expected := issue.ExpectedReturnDate

		fmt.Println(expected)

		// err4 := storage.DB.Where("isbn =?", isbn).Find(&expected).Error
		if err4 != nil {

			c.JSON(400, "doest know whe it will be available")
			return
		}

		c.JSON(400, gin.H{
			"MESSAGE":      "book is not available it will be available on",
			"available on": expected,
			// "body":    books,
		})
		return
	}

	// request.ReaderID =user.ID

	request.RequestDate = time.Now()
	request.RequestType = "pending"
	// request.ApprovalDate = NULL

	err2 := storage.DB.Create(&request).Error

	if err2 != nil {
		c.JSON(400, "cannot add request")
		return
	}

	c.JSON(200, "REQUEST ADDEDS")
}
func Sign_Up_User (c *gin.Context){

	var user models.Users

	err := c.BindJSON(&user)

	if err != nil {
		c.JSON(400, "cannont create user")
		return
	}
	user.Role="reader"
	err2 := storage.DB.Create(&user).Error

	if err2 != nil {
		c.JSON(400, "cannont create user")
		return
	}
	c.JSON(200, gin.H{

		"message": "new user created",
	})


}