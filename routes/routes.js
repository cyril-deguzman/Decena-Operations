const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get(`/`, controller.getIndex);

// Test File
app.get(`/test`, controller.getTest);

module.exports = app;
