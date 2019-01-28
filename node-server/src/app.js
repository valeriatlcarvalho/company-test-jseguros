const express = require('express');
const app = express();

const cnpjValid = '12345678000123';

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Methods', 'GET');
  res.append('Access-Control-Allow-Headers', 'ACCESS-TOKEN, Content-Type');
  res.append('Access-Control-Allow-Credentials', 'true');
  res.append('Content-Type', 'application/json');
  res.append('ACCESS-TOKEN', 23456789);

  res.append('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.append('Pragma', 'no-cache');
  res.append('Expires', 0);

  res.setHeader('Last-Modified', (new Date()).toUTCString());

  next();
})

app.get('/', (req, res) => {
  res.status(200).send({
    title: "Node Express API",
    version: "0.0.1"
  })
});

app.get('/quote/:cnpj', (req, res) => {
  let cnpj = req.params.cnpj;

  if ((cnpj === cnpjValid)) {
    res.status(200).send({ message: "Company Found" });
  }
  if ((cnpj !== cnpjValid)) {
    res.status(404).send({ message: "Company Not Found" });
  }
});

module.exports = app;