FROM golang:alpine as builder

# Allows you to add additional packages via build-arg
ARG ADDITIONAL_PACKAGE
ARG CGO_ENABLED=0

WORKDIR /go/src/handler

COPY . .

# Run a gofmt and exclude all vendored code.
RUN test -z "$(gofmt -l $(find . -type f -name '*.go' -not -path "./vendor/*" -not -path "./function/vendor/*"))" || { echo "Run \"gofmt -s -w\" on your Golang code"; exit 1; }

RUN CGO_ENABLED=${CGO_ENABLED} GOOS=linux \
    go build --ldflags "-s -w" -a -installsuffix cgo -o main . && \
    go test $(go list ./... | grep -v /vendor/) -cover


FROM scratch

WORKDIR /home/app/

COPY --from=builder /go/src/handler/main .

USER 1000:1000
