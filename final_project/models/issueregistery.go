package models

import "time"

type Issueregistery struct {

	// (IssueID, ISBN, ReaderID, IssueApproverID, IssueStatus, IssueDate,
	// 	ExpectedReturnDate, ReturnDate, ReturnApproverID)

	ISBN               int       `json:"reqid"`
	IssueID            int       `gorm:"primaryKey" json:"issueid"`
	ReaderID           int       `json:"readerid"`
	IssueApproverID    int       `json:"issueapproverid"`
	IssuesStatus       string     `json:"issuesstatus"`
	IssueDate          time.Time  `json:"issuedate"`
	ExpectedReturnDate time.Time  `json:"exectedreturndate"`
	ReturnDate         *time.Time `json:"returndate"`
	ReturnApproverID   int       `json:"returnapproverid"`
}
