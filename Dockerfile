FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install

RUN npm run tsc

CMD ["node", "build/index.js"]