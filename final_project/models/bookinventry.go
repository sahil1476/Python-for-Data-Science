package models

type Bookinventry struct {
	ISBN            int    `gorm:"primarykey" json:"isbn"`
	Libid           int    `json:"lib_id"`
	Title           string `json:"title"`
	Authors         string `json:"authors"`
	Publisher       string `json:"publisher"`
	Version         string `json:"version"`
	TotalCopies     uint   `json:"total_copies"`
	AvailableCopies uint   `json:"available_copies"`
}

// {
//     "isbn":1,
//     "libid":"001",
//     "title":"abcf",
//     "author":"sahil",
//     "publisher":"rat",
//     "version":"008",
//     "totalcopies":2,
//     "availablecopies":2
// }





// {
//     "isbn":888900,
//     "lib_id":100,
//     "title":"mybokk",
//     "authors":"mybooks,abcd",
//     "publisher":"my book publishers",
//     "version":"1",
//     "total_copies":2,
//     "available_copies":2
// }