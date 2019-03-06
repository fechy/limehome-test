FROM node:10.11-alpine
ENV PATH ./node_modules/.bin:$PATH

WORKDIR /app
COPY . /app
COPY .env.docker .env

RUN npm install &&\
    npm run build &&\
    npm prune --production

ENV MONGO_DB_CONNECTION=mongodb://host.docker.internal:27017/local

EXPOSE 3000
CMD ["npm", "run", "api"]