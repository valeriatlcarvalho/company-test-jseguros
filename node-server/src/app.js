const express = require('express');
const app = express();

const cnpjValid = '12345678000123';

// app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Methods', 'GET');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // res.setHeader('Access-Control-Request-Headers', 'Content-Type');
  // res.setHeader('Content-Type', 'XMLHttpRequest');
  // res.setHeader('Content-Type', 'application/json');
  // res.setHeader('ACCESS-TOKEN', 23456789);

  /* res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'ACCESS-TOKEN': 23456789
  }) */
// })

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Accept', 'application/json');
  res.append('ACCESS-TOKEN', 23456789);

  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);

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

  // res.status(200).send({
  //   message: "ok",
  //   value: cnpj,
  //   params: req.params,
  //   validValue: cnpjValid,
  //   result: (cnpj === cnpjValid)
  // })

  if ((cnpj === cnpjValid)) {
    res.status(200).send({ message: "OK" });
  }
  if ((cnpj !== cnpjValid)) {
    res.status(404).send({ message: "Not Found" });
  }
});

module.exports = app;