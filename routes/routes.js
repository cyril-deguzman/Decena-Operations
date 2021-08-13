const express = require(`express`);
const indexController = require(`../controllers/indexController.js`);
const formController = require(`../controllers/formController.js`);
const searchController = require(`../controllers/searchController.js`);

const app = express();

/* index routes */
app.get(`/favicon.ico`, indexController.getFavicon);
app.get(`/`, indexController.getIndex);

/* form routes */
app.get(`/form`, formController.getForm);
app.post(`/postform`, formController.postForm);

/* search routes */
app.get(`/search`, searchController.getSearch);
app.get(`/companysearch`, searchController.getCompanies);

module.exports = app;
