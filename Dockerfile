FROM node:12.16.2-alpine

WORKDIR /app

RUN apk update && \
    apk add tzdata && \
    npm i -g npm @vue/cli @vue/cli-init && \
    yarn install