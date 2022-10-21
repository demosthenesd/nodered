FROM node:17-alpine

# Set the default directory where CMD will execute
WORKDIR /server/app

# Install app dependencies
COPY package.json /server/app
RUN npm install

# Bundle app source
COPY . /server/app

# Expose ports (80 = HTTP)
EXPOSE 80

# Default command to execute when creating a new container
CMD ["npm", "start"]