FROM node:10-alpine AS base

WORKDIR /tyba-test
COPY . .

RUN npm install --production

EXPOSE 10000

ENTRYPOINT npm start
