FROM node:16

# build the working directory
RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
RUN npm install

# copy all files to container
COPY . /app/

# # Build and start the server
RUN npm run build

# #copy the proto file to the generated js
COPY src/proto/dockerGet /app/out/proto/dockerGet/

CMD npm run start

# CMD npm run dev
