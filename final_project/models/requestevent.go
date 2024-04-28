package models

import "time"

type Requestevents struct {
	// ReqID, BookID, ReaderID, RequestDate, ApprovalDate, ApproverID, RequestType)

	ReqId        int        `gorm:"primaryKey" json:"reqid"`
	BookId       int        `json:"bookid"`
	ReaderID     int        `json:"readerid"`
	RequestDate  time.Time  `json:"requestdate"`
	ApprovalDate *time.Time `json:"approvaldate"`
	ApproverID   int       `json:"approverid"`
	RequestType  string     `json:"requesttype"`
}
