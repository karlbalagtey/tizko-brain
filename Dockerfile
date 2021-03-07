FROM node:alpine

RUN mkdir -p /usr/src/tizko-brain && chown -R node:node /usr/src/tizko-brain

WORKDIR /usr/src/tizko-brain

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
