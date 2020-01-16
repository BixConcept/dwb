package handlers

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
)

// Handler to be called in order to access some file
func GetFile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("access-control-allow-origin", r.Header.Get("origin"))
	w.Header().Set("access-control-allow-credentials", "true")

	fmt.Printf("\n-*- %s file %s -*-\n", r.Method, r.URL.Path)

	vars := mux.Vars(r)

	if len(vars) < 1 {
		fmt.Fprintf(w, "<h1> /files </h1>")
		return
	}

	fileBytes, err := ioutil.ReadFile(fmt.Sprintf("/files/%s", vars["path"]))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("[ getFile ] [ - ] error reading file: %s\n", err.Error())
		return
	}

	_, err = w.Write(fileBytes)
	if err != nil {
		fmt.Printf("[ getFile ] [ - ] error writing to responsewriter: %s\n", err.Error())
	}
}
