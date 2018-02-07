FROM node:8.9-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

CMD ["node", "build/bootstrap/app"]
