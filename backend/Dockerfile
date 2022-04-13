FROM golang:1.17 as builder

# first (build) stage

WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 go build -o dwb

# final (target) stage

FROM alpine:3.10
COPY --from=builder /app/dwb /

EXPOSE 8000
CMD ["/dwb"]

