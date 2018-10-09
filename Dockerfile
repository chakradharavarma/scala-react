FROM node:8 as scala-frontend-builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . ./
RUN yarn build


FROM alpine:3.8

COPY --from=scala-frontend-builder /usr/src/app/build /usr/share/nginx/html

RUN mkdir /app
WORKDIR /app

COPY api ./

COPY meta ./meta

EXPOSE 8080
CMD ["/app/api"]
