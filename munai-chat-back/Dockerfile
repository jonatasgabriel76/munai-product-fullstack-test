# syntax=docker/dockerfile:1

FROM node:18
WORKDIR /back
COPY . .
RUN yarn install
CMD yarn dev
EXPOSE 5000
