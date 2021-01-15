FROM node:14
WORKDIR /usr/src/app
ADD . .
COPY package*.json ./
RUN npm ci
EXPOSE 8080
CMD [ "npm", "start" ]