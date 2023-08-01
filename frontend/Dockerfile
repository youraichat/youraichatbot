FROM node:18

# Create web directory
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
CMD ["npm", "start"]