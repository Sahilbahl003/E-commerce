FROM node:22-alpine

WORKDIR /app

COPY ./server ./

RUN npm install

CMD ["node","server.js"]
