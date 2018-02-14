FROM node:8.9-alpine@sha256:b0f4ff99dbfbbe6076289f762dfae8e8cdd7cad2eee24500c81957300ee6e360

ENV NODE_ENV=production

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .

CMD ["node", "build/bootstrap/app"]
