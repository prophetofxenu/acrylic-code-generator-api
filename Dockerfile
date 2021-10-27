FROM node:lts-alpine3.14

RUN apk update
RUN apk upgrade

RUN addgroup -S acg-api
RUN adduser -S acg-api -G acg-api
USER acg-api

RUN mkdir /home/acg-api/project
WORKDIR /home/acg-api/project

RUN mkdir ./src
COPY --chown=acg-api:acg-api src/ ./src
COPY --chown=acg-api:acg-api package.json ./
COPY --chown=acg-api:acg-api package-lock.json ./
COPY --chown=acg-api:acg-api tsconfig.json ./

RUN npm install
RUN npm run copyino

ENTRYPOINT ["npm", "run", "start"]
