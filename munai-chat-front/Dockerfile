# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /front
COPY . .
RUN yarn install
RUN yarn build
CMD ["yarn", "serve", "-s", "build", "-p", "80"]
EXPOSE 80
