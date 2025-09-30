FROM node:24

EXPOSE 80

COPY ./app /app
WORKDIR /app

RUN npm install

# CMD [ "npm", "run", "start" ]
# CMD [ "sleep", "3600" ]
CMD [ "npm", "run", "dev" ]
