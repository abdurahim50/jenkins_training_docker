const http = require('http');
// const chalk = require('chalk'); // Import the chalk package
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
    </head>
    <body style="background-color: lightblue; color: darkblue; font-family: Arial, sans-serif;">
      <h1>Hello from Node.js!</h1>
      <p>This is a colored response body with inline CSS.</p>
    </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(chalk.bold(`Server running at http://${hostname}:${port}/`));
});

