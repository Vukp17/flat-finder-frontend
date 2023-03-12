# base image
FROM node:14.17.6-alpine

# set working directory
WORKDIR /app

# copy package.json and package-lock.json to container
COPY package*.json ./

# install dependencies
RUN npm install

# copy project files to container
COPY . .

# build the project
RUN npm run build

# expose port
EXPOSE 8080 

# start the application
CMD ["npm", "start"]
