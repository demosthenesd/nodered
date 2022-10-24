FROM node

# Set the default directory where CMD will execute
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . .

# Expose ports 
EXPOSE 4000

# Default command to execute when creating a new container
CMD ["npm", "start"]