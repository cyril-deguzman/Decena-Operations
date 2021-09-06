const express = require(`express`);
const indexController = require(`../controllers/indexController.js`);
const formController = require(`../controllers/formController.js`);
const searchController = require(`../controllers/searchController.js`);
const editController = require(`../controllers/editController.js`);
const accountingController = require(`../controllers/accountingController.js`);
const authMiddleware = require('../middleware/authentication.js');

const app = express();

/* index routes */
app.get(`/favicon.ico`, indexController.getFavicon);
app.get(`/`, indexController.getIndex);
app.get(`/logout`, indexController.getLogOut);
app.post(`/login`, indexController.postLogin);

/* form routes */
app.get(`/form`, authMiddleware.isEncoder, formController.getForm);
app.post(`/postform`, formController.postForm);

/* search routes */
app.get(`/search`, authMiddleware.isEncoder, searchController.getSearch);
app.get(`/companysearch`, authMiddleware.isEncoder, searchController.getCompanies);
app.get(`/viewreceipts/:id`, authMiddleware.isEncoder, searchController.getViewDRs);
app.get(`/viewreceipts/:id/:year`, authMiddleware.isEncoder, searchController.getViewDRs);
app.post(`/paginatecompany`, searchController.postPaginateCompanies);

/* edit routes */
app.get(`/editreceipt/:id`, authMiddleware.isEncoder, editController.getEdit);
app.post(`/posteditform`, editController.postEditForm);

/* accounting routes */
app.get(`/accounting`, authMiddleware.isAccountant, accountingController.getViewAllDRs);
app.get(`/accounting/:year`, authMiddleware.isAccountant, accountingController.getViewAllDRs);

module.exports = app;
