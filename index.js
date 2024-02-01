const express = require('express');
const http = require('http');
const sessionMiddleware = require('./sessionMiddleware.js');
const mysqlConnection = require('./mySQL.js');
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

//
//
//USER ENDPOINTS
//
//
app.post('/registerUser', (req,res) => {
  userData = req.body;
  let check = true;

  mysqlConnection.getUsernames((usernames) => {
    usernames.forEach(username => {
      if (username.username == userData.username) {
        check = false;
      }
    })
    if (check) {
      mysqlConnection.insertUser([userData.username,userData.password],((result) => {res.send(result)}))
    }
    else {
      res.status(409).send("Mail already in use");
    }
  })
})