package models

type Library struct {
	ID   int    `gorm:"primary key" json:"id"`
	Name string `json:"name"`
}
