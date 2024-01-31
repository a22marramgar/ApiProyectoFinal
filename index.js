const express = require('express');
const http = require('http');
const sessionMiddleware = require('./sessionMiddleware.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(sessionMiddleware);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const port = process.env.PORT || 3666;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});