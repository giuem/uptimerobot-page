FROM node:8.9-alpine@sha256:14b627a91c92566d489d9d9073e465563be0e0c598c9537aa32e871a812018f5

ENV NODE_ENV=production

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .

CMD ["node", "build/bootstrap/app"]
