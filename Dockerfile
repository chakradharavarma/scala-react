FROM node:8 as scala-frontend-builder
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . ./
RUN yarn build

FROM nginx:1.15-alpine
COPY --from=scala-frontend-builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]