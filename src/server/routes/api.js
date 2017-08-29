const express = require('express');
const path = require("path")
const formController = require('../controller/formController')

const api = express()

// 是这样写吗
api.post('/addForm', formController.addForm)

module.exports = api;