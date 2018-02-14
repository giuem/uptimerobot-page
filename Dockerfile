FROM node:8.9-alpine@sha256:686ed604ade463b428c05402e984ed8ee82a2d61c6019fb76e01c491f1db9080

ENV NODE_ENV=production

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .

CMD ["node", "build/bootstrap/app"]
