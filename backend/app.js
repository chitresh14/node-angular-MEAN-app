const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();
mongoose.connect("mongodb+srv://chitresh_1:mongopassword@cluster0-fuoqz.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to Mongodb');
  })
  .catch(() => {
    console.log('Connection Failed!..')
  });
//mongopassword
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE , OPTIONS");
  next();
});

app.use("/api/posts",postsRoutes);

module.exports = app;
