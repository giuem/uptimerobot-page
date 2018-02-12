FROM node:8.9-alpine@sha256:b1e1f024dccf7058d2f55b21d6bf65c9cb932ba7bee2a24eca08ddb7c654312b

ENV NODE_ENV=production

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

CMD ["node", "build/bootstrap/app"]
