FROM node:22-alpine3.19

WORKDIR /app
COPY . .
RUN npm install

RUN npm run tsc

CMD ["node", "build/index.js"]