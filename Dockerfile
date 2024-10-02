FROM node:20.16-alpine

EXPOSE 8004

WORKDIR /app
COPY package.json /app
COPY .yarnrc.yml /app

RUN yarn install

COPY . /app

RUN yarn build

CMD ["yarn","start"]
