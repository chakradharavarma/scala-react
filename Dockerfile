FROM node:8 as scala-frontend-builder

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
COPY . ./
RUN yarn build


FROM nginx:1.15.5-alpine

COPY --from=scala-frontend-builder /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Accessed on /config route
COPY config.json /usr/share/nginx/html/config.json

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
