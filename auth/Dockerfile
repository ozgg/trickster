FROM node:20-alpine

WORKDIR /app
COPY package.json .
RUN yarn install --omit=dev
COPY . .

CMD ["yarn", "start"]
