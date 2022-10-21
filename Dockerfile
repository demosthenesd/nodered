FROM node:17-alpine

# Set the default directory where CMD will execute
WORKDIR /NODERED/server

# Install app dependencies
COPY package.json /NODERED/server
RUN npm install

# Bundle app source
COPY . /NODERED/server/

# Expose ports (80 = HTTP)
EXPOSE 80

# Default command to execute when creating a new container
CMD ["npm", "start"]