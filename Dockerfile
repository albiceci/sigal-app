FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 3000

# Start React dev server
CMD ["npm", "start"]