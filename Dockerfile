FROM node:18.16.1-alpine

EXPOSE 5173

WORKDIR /app

COPY . .

RUN npm i

ENTRYPOINT ["npm", "run", "dev"]
