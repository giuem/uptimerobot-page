FROM node:8.9-alpine@sha256:a596dc41b88be39ed80172915ad3425ed7f7169ff57cd0e7e48793664d4bf616

ENV NODE_ENV=production

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .

CMD ["node", "build/bootstrap/app"]
