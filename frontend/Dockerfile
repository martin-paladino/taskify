FROM node:18-alpine

RUN npm install -g create-react-app

WORKDIR /app/frontend

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 3000