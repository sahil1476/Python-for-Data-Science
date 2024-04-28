package models

type Users struct {
	ID            uint   `gorm:"primarykey" json:"id"`
	Name          string `         json:"name"`
	Email         string `gorm:"unique" json:"email"`
	ContactNumber int    `json:"contactnumber"`
	Role          string `json:"role"`
	Libid         int    `json:"libid"`
	Password      string `json:"password"`
}

// type Requestevents struct {
// 	// ReqID, BookID, ReaderID, RequestDate, ApprovalDate, ApproverID, RequestType)

// 	ReqId        uint       `gorm:"primary key;autoIncrement" json:"reqid"`
// 	BookId       uint       `json:"bookid"`
// 	ReaderID     uint       `json:"readerid"`
// 	RequestDate  time.Time  `json:"requestdate"`
// 	ApprovalDate *time.Time `json:"approvaldate"`
// 	ApproverID   uint       `json:"approverid"`
// 	RequestType  string     `json:"requesttype"`
// }
