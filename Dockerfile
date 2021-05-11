FROM node:14-alpine

# update packages
RUN apk update

# create root application folder
RUN ls -la

WORKDIR /app

# copy configs to /app folder
COPY . /app

WORKDIR /app/server
RUN rm -rf /app/server/node_modules

WORKDIR /app/react
RUN rm -rf /app/react/node_modules

WORKDIR /app/server
RUN npm run init
RUN npm run build


# check files list
RUN ls -a

EXPOSE 8001

CMD [ "node", "./index.js" ]