# jenkins_training_docker
--------------------------------------------------------------------------
# Deploying a simple Nodejs app using Jenkins Master-slave Architecture CI/CD.
# Table of Contents

- [Prerequisites](#prerequisites)
- [Creating the Node.js Application](#creating-the-nodejs-application)
  - [package.json](#packagejson)
  - [index.js](#indexjs)
- [Dockerize the Node.js Application](##Dockerize-the-Nodejs-Application)
- [Configuring Jenkins](#configuring-jenkins)
  - [Jenkins Job Shell Script](#jenkins-job-shell-script)
  - [Configuring the Jenkins Job](#configuring-the-jenkins-job)
- [Running the Jenkins Job](#running-the-jenkins-job)
- [Accessing the Application](#accessing-the-application)
- [License](#license)

  ### Prerequisites
  


This project is divided into two parts.
## Part One : Create a Node.js Web Application and push to github
## Part two: Configure Jenkins Master with Slave Nodes To 
# PART ONE
## Creating the Node.js Application
Let's create a basic Node.js web application.
```
mkdir nodejs-app
cd nodejs-app
touch index.js
touch package.json
```
### index.js:
```index.js
const http = require('http');
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from Node.js!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```
### package.json:
```package.json
{
  "name": "nodejs-app",
  "version": "1.0.0",
  "description": "A simple Node.js web server",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Your Name",
  "license": "MIT"
}
```
## Dockerize the Node.js Application.
Create a Dockerfile to containerize the Node.js application.

Dockerfile:
```
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
```
## GitHub Repository Setup
Push the Node.js application code and Dockerfile to a GitHub repository. Let's assume your GitHub repository URL is https://github.com/yourusername/nodejs-docker-example.

# Part two: Configure Jenkins Master with Slave Nodes.

To achieve this setup, you'll need to configure your Jenkins master to manage two slave nodes (Agent-node-1 and Agent-node-2) and create two Jenkins jobs (docker-build and docker-deploy). Below are the step-by-step instructions:

## Step 1: Configure Jenkins Master with Slave Nodes
Add Slave Nodes

- Go to your Jenkins dashboard.
- Click on "Manage Jenkins" > "Manage Nodes and Clouds" > "New Node".
- Create Agent-node-1 with the label build.
- Create Agent-node-2 with the label deploy.
- Configure Slave Nodes

Ensure each node has Docker installed.
Connect each node to the master.
## Step 2: Create docker-build Job on Node-1
1. ### Create New Job

- Go to your Jenkins dashboard.
- Click on "New Item".
- Enter the name docker-build.
- Choose "Freestyle project".
- Click "OK".
2. ### Configure Job

- Under "General", restrict where this project can be run by specifying the label build.
- Under "Source Code Management", choose "Git" and provide the repository URL.
- Set the branch to build, usually */main or */master.
3 ### Build Triggers

- Check "Poll SCM".
- Set the schedule to * * * * * to poll every minute.
