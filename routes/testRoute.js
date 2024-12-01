const express = require("express");
const testController = require("../controllers/testController");

const route = express.Router();

route.get('/',testController);

module.exports = route;