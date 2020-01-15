FROM golang:latest

COPY . /
CMD "go get ."
CMD "go build -o /dwb"

EXPOSE 8000
ENTRYPOINT [ "/dwb" ]
