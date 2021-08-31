const express = require(`express`);
const indexController = require(`../controllers/indexController.js`);
const formController = require(`../controllers/formController.js`);
const searchController = require(`../controllers/searchController.js`);
const editController = require(`../controllers/editController.js`);

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
app.get(`/viewreceipts/:id`, searchController.getViewDRs);
app.get(`/viewreceipts/:id/:year`, searchController.getViewDRs);
app.post(`/paginatecompany`, searchController.postPaginateCompanies);

/* edit routes*/
app.get(`/editreceipt/:id`, editController.getEdit);
app.post(`/posteditform`, editController.postEditForm);
module.exports = app;
