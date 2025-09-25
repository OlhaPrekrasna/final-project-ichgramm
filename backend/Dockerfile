FROM node:20

EXPOSE 80

RUN npm install -g nodemon

COPY ./app /
WORKDIR /app

RUN npm install

CMD [ "npm", "run", "dev" ]
