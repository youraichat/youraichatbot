FROM node:18-alpine

# Create web directory
WORKDIR /usr/src/frontend
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD ["npm", "start"]