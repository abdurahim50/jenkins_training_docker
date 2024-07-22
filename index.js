//const http = require('http');
// const chalk = require('chalk'); // Import the chalk package
import http from 'http';
import chalk from 'chalk';

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html'); // Change to 'text/html'
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Hello Node.js</title>
      <meta charset="UTF-8"> <!-- Specify UTF-8 encoding -->
      <style>
        body {
          background-color: lightblue;
          color: darkblue;
          font-family: Arial, sans-serif;
        }
        .info {
          margin-top: 20px;
          padding: 10px;
          border: 1px solid darkblue;
          border-radius: 5px;
          background-color: white;
        }
      </style>
    </head>
    <body>
      <h1>Hello from Abdurahim!</h1>
      <p>This is a test Page!</p>
      <div class="info">
        <h2>About Me</h2>
        <ul>
          <li>🔭 I’m currently working on setting up Kubernetes clusters and automating CI/CD pipelines.</li>
          <li>🌱 I’m currently learning advanced Docker orchestration and Kubernetes best practices.</li>
          <li>👯 I’m looking to collaborate on projects related to DevOps tooling and automation.</li>
          <li>🤔 I’m looking for help with optimizing Docker containers for production environments.</li>
          <li>💬 Ask me about Docker, Kubernetes, CI/CD pipelines, or anything related to DevOps practices.</li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(chalk.bold(`Server running at http://${hostname}:${port}/`));
});

