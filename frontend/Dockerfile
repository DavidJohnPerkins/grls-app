FROM node:22.0.0

WORKDIR /

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
