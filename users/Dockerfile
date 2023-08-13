FROM node:18-alpine

WORKDIR /app
COPY package.json .
RUN yarn install --omit=dev
COPY . .

CMD ["yarn", "start"]
