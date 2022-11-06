FROM node:16-alpine

WORKDIR /code
COPY . /code
COPY package.json .

WORKDIR /code
RUN npm install -g nodemon
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]


