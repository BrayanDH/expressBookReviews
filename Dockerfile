FROM node:16-alpine

ADD router /app/router
ADD index.js /app
ADD package.json /app

RUN cd /app; npm install

ENV NODE_ENV production
ENV PORT 5000
EXPOSE 5000

WORKDIR "/app"
CMD [ "npm", "start" ]