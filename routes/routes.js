const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

/* get routes */
app.get(`/favicon.ico`, controller.getFavicon);
app.get(`/`, controller.getIndex);
app.get(`/form`, controller.getForm);
app.get(`/search`, controller.getSearch);

/* post routes */
app.post(`/postform`, controller.postForm);

module.exports = app;
