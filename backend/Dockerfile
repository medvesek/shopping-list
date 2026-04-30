FROM golang:1.26
WORKDIR /usr/src/app

COPY . .
RUN go build -v -o /usr/local/bin/app main.go

CMD ["app"]