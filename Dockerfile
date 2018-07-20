FROM node:8.9-alpine@sha256:068a0746d03a072cddbe8c49082bcf80ede9d5f57839ad775df85d07228b2e6d

ENV NODE_ENV=production

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .

CMD ["node", "build/bootstrap/app"]
