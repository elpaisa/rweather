FROM node:14-alpine

# update packages
RUN apk update

# create root application folder
RUN ls -la

WORKDIR /app

# copy configs to /app folder
COPY . /app

WORKDIR /app/server
RUN ls -la
RUN npm i
RUN npm run build


# check files list
RUN ls -a

EXPOSE 8080

CMD [ "node", "./index.js" ]