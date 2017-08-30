const express = require('express');
const formService = require('../services/formService');

function addForm(req, res) {
  const data = req.body;
  formService.sendForm(data, res);
}

function getList(req, res) {
  formService.getList(res);
}

function getFormData(req, res) {
  const data = req.query.id;
  formService.getFormData(data, res);
}

exports.addForm = addForm;
exports.getList = getList;
exports.getFormData = getFormData;
