const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get(`/`, controller.getIndex);
app.get(`/form`, controller.getForm);

// Test Function
app.get(`/test`, controller.getTest);

module.exports = app;
