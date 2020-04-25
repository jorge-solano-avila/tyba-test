FROM node:10-alpine AS base

WORKDIR /tyba-test
COPY . .

RUN npm install --production

EXPOSE $API_PORT

ENTRYPOINT npm start
