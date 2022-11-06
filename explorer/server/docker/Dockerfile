FROM bitnami/node:16.17.0-debian-11-r6

WORKDIR /usr/app
COPY . /usr/app
COPY package*.json .

RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
