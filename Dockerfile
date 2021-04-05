FROM node:alpine

WORKDIR /usr/app

COPY package.json /usr/app
RUN npm install

# Bundle app source
COPY . /usr/app

EXPOSE 3000

CMD ["npm", "start"]
