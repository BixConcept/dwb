package db

import "database/sql"

var Database *sql.DB

// map of requests. Requests[statusCode] = number of requests
var Requests map[int]int