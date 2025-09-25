FROM node:20

EXPOSE 80

COPY ./app /app
WORKDIR /app

RUN npm install

CMD [ "npm", "run", "start" ]
