FROM alpine:3.19

WORKDIR /app

COPY README.md /app/README.md
COPY . /app

CMD ["sh"]
