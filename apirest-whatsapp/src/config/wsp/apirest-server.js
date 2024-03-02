const {envioController} = require('../../controller/envio.controller')

const express = require('express');

const app = express();

app.use(express.json());

app.post('/envio', envioController)

module.exports = app;