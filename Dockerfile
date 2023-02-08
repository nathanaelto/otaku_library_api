FROM node:16-alpine
RUN npm install -g npm@9.4.2

WORKDIR /app

COPY package*.json ./

RUN apk add python3 && npm install

COPY . .

CMD npm run start:dev