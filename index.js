const express = require('express');
const http = require('http');
const sessionMiddleware = require('./sessionMiddleware.js');
const mysqlConnection = require('./mySQL.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();

const corsOptions = {
  origin: ["http://localhost:3000", "https://math-thai.dam.inspedralbes.cat"],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'],
  exposedHeaders: ['set-cookie', 'ajax-redirect'],
  preflightContinue: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(sessionMiddleware);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors(corsOptions));

const port = process.env.PORT || 3666;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  var response = {};
  response.msg = 'Hello World!';
  res.json(response);
});



//
//
//USER ENDPOINTS
//
//
app.post('/login', (req, res) => {
  var response = {};
  if (req.body.username === 'Juan' && req.body.password === '1234') {
    req.session.user = req.body.username;
    response.msg = 'Login Success';
    res.json(response);
  } else {
    response.msg = 'Login Failed';
    res.json(response);
  }
});
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
