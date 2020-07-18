FROM node:current-slim

WORKDIR /usr/src/app

COPY package.json .

COPY package-lock.json .

RUN npm i

COPY . .

RUN npm run build:ssr

EXPOSE 4000

CMD npm run serve:ssr
