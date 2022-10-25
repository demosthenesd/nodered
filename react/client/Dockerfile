FROM node:17-alpine

# Set the default directory where CMD will execute
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache


# Bundle app source
COPY . .


# Expose ports 
EXPOSE 3000





# Default command to execute when creating a new container
CMD ["npm", "start"]