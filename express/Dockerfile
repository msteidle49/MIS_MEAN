FROM node

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

Expose 3000

CMD ["node","server.js"]