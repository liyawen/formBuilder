const express = require('express');
const formService = require('../services/formService')

function addForm(req, res) {
  const data = req.body;
  formService.sendForm(data, res);
}

exports.addForm = addForm;
