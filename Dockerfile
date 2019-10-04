FROM node

WORKDIR /app

COPY ./server ./server
COPY ./web ./web
COPY ./app.ts ./app.ts
COPY ./package.json ./package.json
COPY ./tslint.json ./tslint.json

RUN npm install -g npm && npm install

ENTRYPOINT [ "npm","run","start" ]
