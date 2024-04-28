package handlers

import (
	"fmt"
	"log"
	"main/models"
	"main/storage.go"
	"time"

	"github.com/gin-gonic/gin"
)

func Admin() {
	fmt.Println("hey")
}

func Library(c *gin.Context) {

	var library models.Library

	err := c.BindJSON(&library)

	if err != nil {

		c.JSON(400, gin.H{

			"meesage": "DATA IS EMPTY",
		})

		return
	}

	er2r := storage.DB.Create(&library).Error
	if er2r != nil {

		c.JSON(400, "error")
		return
	}

	c.JSON(200, gin.H{

		"meesage": "library has been created",
	})

}

func Create_Users(c *gin.Context) {

	var user models.Users

	err := c.BindJSON(&user)

	if err != nil {
		c.JSON(400, "cannont create user")
		return
	}
	err2 := storage.DB.Create(&user).Error

	if err2 != nil {
		c.JSON(400, "cannont create user")
		return
	}
	c.JSON(200, gin.H{

		"message": "new user created",
	})

}
func Add_Book(c *gin.Context) {

	var book models.Bookinventry

	err := c.BindJSON(&book)

	if err != nil {
		log.Println("err", err)
		c.JSON(400, "cannot add book")
		return
	}
	err2 := storage.DB.Create(&book).Error

	if err2 != nil {
		c.JSON(400, "cannot add book")
		return
	}
	c.JSON(200, gin.H{

		"MESSAGE": "BOOK ADDED SUCCESFULLY",
	})

}

func Read_Books(c *gin.Context) {

	var books []models.Bookinventry

	err := storage.DB.Find(&books).Error

	if err != nil {

		c.JSON(404, gin.H{
			"MESSAGE": "no books",
			// "body":    books,
		})

		return
	}

	if len(books) == 0 {

		c.JSON(404, gin.H{
			"MESSAGE": "no books available to read",
			// "body":    books,
		})
		return
	}

	c.JSON(200, books)

}

func Getbookbyid(c *gin.Context) {

	// id := c.Params("id")
	// isbn:=c.Params("isbn")
	isbn := c.Param("isbn")
	var book models.Bookinventry

	err := storage.DB.First(&book, isbn).Error

	if err != nil {
		c.JSON(404, "book not avilable")
		return
	}

	c.JSON(200, book)

}

func Update_Book(c *gin.Context) {

	// isbn := c.Param("isbn")
	// var book models.Bookinventry

	var updatebook models.Bookinventry
	var book models.Bookinventry
	err2 := c.BindJSON(&updatebook)
	if err2 != nil {
		c.JSON(400, "cannot update")
		return
	}
	// fmt.Println(isbn)
	isbn := updatebook.ISBN

	err := storage.DB.First(&book, isbn).Error
	storage.DB.Save(&book)
	if err != nil {
		c.JSON(400, "cannot update")
		return
	}

	fmt.Println(book.ISBN)

	storage.DB.Model(&book).Where("isbn = ?", isbn).Updates(&updatebook)

	c.JSON(200, book)

}
func Delete_Book(c *gin.Context) {

	// isbn := c.Param("isbn")
	// var book models.Bookinventry

	var book models.Bookinventry

	err := c.BindJSON(&book)

	isbn := book.ISBN

	if err != nil {

		c.JSON(400, "error")
		return
	}
	er4 := storage.DB.First(&book, isbn).Error

	if er4 != nil {

		c.JSON(404, "book not found")
		return

	}

	// err := storage.DB.Delete(&book, isbn).Error
	err2 := storage.DB.Delete(&book, isbn).Error

	if err2 != nil {
		c.JSON(404, "book not found")
		return
	}

	c.JSON(200, gin.H{
		"MESSAGE": "BOOK delete SUCCESFULLY",
	})

}

func All_Requests(c *gin.Context) {

	var requests []models.Requestevents
	err := storage.DB.Find(&requests).Error

	if err != nil {
		c.JSON(400, "bad request")
		return
	}

	if len(requests) == 0 {
		c.JSON(404, "book inventry is empty")
		return

	}

	c.JSON(200, requests)

}

func Aprrove_Request(c *gin.Context) {

	var reqevent models.Requestevents
	var issuerequest models.Issueregistery
	var book models.Bookinventry

	err5 := c.BindJSON(&reqevent)
	if err5 != nil {
		c.JSON(400, "error")
	}

	// reqid := c.Param("reqid")
	reqid := reqevent.ReqId

	err := storage.DB.First(&reqevent, reqid).Error

	if err != nil {

		c.JSON(400, "wrong id enetered")
		return
	}

	str := reqevent.RequestType
	if str == "accepted" {

		c.JSON(400, "alread issued")
		return

	}

	temp := time.Now()

	reqevent.ApprovalDate = &temp

	reqevent.RequestType = "accepted"

	isbn := reqevent.BookId

	err3 := storage.DB.First(&book, isbn).Error

	if err3 != nil {

		c.JSON(404, "book not available")
		return
	}

	book.AvailableCopies = book.AvailableCopies - 1
	storage.DB.Model(&book).Where("isbn = ?", isbn).Save(&book)

	issuerequest.ExpectedReturnDate = time.Now()
	issuerequest.ISBN = reqevent.BookId
	issuerequest.IssuesStatus = "issued"
	issuerequest.IssueDate = time.Now()

	storage.DB.Model(&reqevent).Where("req_id = ?", reqid).Save(&reqevent)

	temp2 := temp.AddDate(0, 0, 15)
	issuerequest.ExpectedReturnDate = temp2
	err2 := storage.DB.Create(&issuerequest).Error

	if err2 != nil {
		c.JSON(400, "error")
		return
	}

	c.JSON(200, "approved")

}

func Disapprove(c *gin.Context) {

	var reqevent models.Requestevents

	// var tmp int
	er := c.BindJSON(&reqevent)

	tmp := reqevent.ReqId

	if er != nil {

		c.JSON(404, "EOORRRR")
		return

	}
	err := storage.DB.First(&reqevent, tmp).Error

	if err != nil {

		c.JSON(400, "wrong id enetered")
		return
	}

	str := reqevent.RequestType
	if str == "reject" {

		c.JSON(400, "alread rejected")
		return

	}
	reqevent.RequestType = "reject"
	storage.DB.Model(&reqevent).Where("req_id = ?", tmp).Save(&reqevent)

	c.JSON(200, "rejeced")

}
