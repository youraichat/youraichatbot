FROM node:18-alpine

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm uninstall bcrypt --legacy-peer-deps

RUN npm install bcrypt --legacy-peer-deps

COPY . .

RUN npm run build

RUN npm run db:create

CMD [ "node", "dist/main.js" ]

