FROM node:15-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8888

CMD [ "npm", "run", "dev"]