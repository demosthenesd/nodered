FROM node as build

# Set the default directory where CMD will execute
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
# Install app dependencies
COPY package.json .
RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache





# Bundle app source
COPY . .


ARG REACT_APP_NOT_SECRET_CODE
ENV REACT_APP_NOT_SECRET_CODE=$REACT_APP_NOT_SECRET_CODE
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html


# Expose ports 
EXPOSE 3000





# Default command to execute when creating a new container
CMD ["npm", "start"]