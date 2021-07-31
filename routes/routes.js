const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

// get
app.get(`/`, controller.getIndex);
app.get(`/form`, controller.getForm);

// post
app.get(`/postform`, controller.postForm);

module.exports = app;
