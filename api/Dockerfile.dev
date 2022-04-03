FROM node:14.14.0-alpine

WORKDIR "/app"

COPY ./package.json ./
RUN npm install
RUN npm install -g typescript ts-node
COPY . .

CMD ["npm", "run", "dev"]