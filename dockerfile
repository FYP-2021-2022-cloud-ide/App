FROM node:16

# build the working directory
RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
RUN npm install

# copy all files to container
COPY . /app

# Build and start the server
RUN npm run build
CMD npm run start
