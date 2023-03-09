FROM node:16-alpine

RUN apk add --no-cache git

WORKDIR /usr/src/app

COPY . .

EXPOSE 7070

CMD [ "npm", "run", "start" ]