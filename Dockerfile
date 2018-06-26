FROM node:8.11-alpine@sha256:c9f2470464363addb0be6a61678f44854e73eee974bbc792a71d4d2b7ffd5edd

ENV NODE_ENV=production

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .

CMD ["node", "build/bootstrap/app"]
