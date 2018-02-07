FROM node:8.9-alpine

ENV NODE_ENV=production
WORKDIR /app
COPY . /app
RUN yarn
CMD [ "node",  "build/bootstrap/app"]
