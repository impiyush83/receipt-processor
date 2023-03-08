FROM node:16-alpine

RUN apk add --no-cache git

WORKDIR /usr/src/app

COPY package.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 7070

CMD [ "npm", "run", "start" ]