FROM node:16-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
