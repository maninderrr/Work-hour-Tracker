FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

EXPOSE 8089

CMD [ "sh", "-c", "chmod +x ./wait_for_mysql.sh && ./wait_for_mysql.sh && npm run watch" ]