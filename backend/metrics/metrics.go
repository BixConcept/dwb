package metrics

import (
	"time"
	"fmt"
	"net/http"
)

func MetricsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%s %d\n%s %d", "lol", time.Now().UnixNano(), "lol2", time.Now().UnixNano() >> 1)
} 