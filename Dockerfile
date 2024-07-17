# Use official Node.js image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY index.js ./

# Expose port
EXPOSE 3000

# Command to run the app
CMD [ "npm", "start" ]

