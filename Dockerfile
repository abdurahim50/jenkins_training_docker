# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port
EXPOSE 3000

# Command to run the app
CMD [ "npm", "start" ]

