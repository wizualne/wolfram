const express = require("express"); //inicjalizacja biblioteki express.js
const app = express();

//konfiguracja połączenia z serwerem
const config = {
  user: "sa",
  password: "12f1X4Il45xANd38zQ3",
  server: "51.68.136.244",
  database: "Wolfram",
  port: 49152,
  encrypt: false,
};

//stworzenie pierwszego zapytania pobierającego wszystkie odczyty
app.get("/rates", function (req, res) {
  const sql = require("mssql");

  sql.connect(config, function (err) {
    if (err) console.log(err);

    let sqlRequest = new sql.Request();
    let sqlQuery = `SELECT [Name], [ExchangeCompanyId], [Date], [Amount] ,[Currency] FROM StockExchangeRates ser WITH(NOLOCK) INNER JOIN ExchangeCompanies ex ON ser.ExchangeCompanyId = ex.Id ORDER BY ser.Id DESC`;
    sqlRequest.query(sqlQuery, function (err, data) {
      if (err) console.log(err);

      res.send(data.recordsets);
    });
  });
});

//stworzenie drugiego zapytania pobierającego odczyty z ostatniego tygodnia
app.get("/lastday", function (req, res) {
  const sql = require("mssql");

  sql.connect(config, function (err) {
    if (err) console.log(err);

    let sqlRequest = new sql.Request();
    let sqlQuery = `SELECT ser.[Id], [ExchangeCompanyId], [Name], [Date], [Amount], [Currency] FROM StockExchangeRates ser WITH(NOLOCK) INNER JOIN ExchangeCompanies ec WITH(NOLOCK) on ec.Id = ser.ExchangeCompanyId WHERE [Date] > DATEADD(day, -7, GETDATE())`;
    sqlRequest.query(sqlQuery, function (err, data) {
      if (err) console.log(err);

      res.send(data.recordsets);
    });
  });
});

//stworzenie zapytania pobierającego spis indeksów giełdowych
app.get("/customers", function (req, res) {
  const sql = require("mssql");

  sql.connect(config, function (err) {
    if (err) console.log(err);
    let sqlRequest = new sql.Request();
    let sqlQuery = "SELECT [Id], [Name] FROM ExchangeCompanies";
    sqlRequest.query(sqlQuery, function (err, data) {
      if (err) console.log(err);

      res.send(data.recordsets);
    });
  });
});

//stworzenie zapytania pobierającego ostatni odczyt
app.get("/last", function (req, res) {
  const sql = require("mssql");

  sql.connect(config, function (err) {
    if (err) console.log(err);

    let sqlReq = new sql.Request();
    let sqlQue = `SELECT [Name] FROM ExchangeCompanies`;
    sqlReq.query(sqlQue, function (err, data) {
      if (err) console.log(err);
      let length = data.recordset.length;

      let sqlRequest = new sql.Request();
      let sqlQuery = `SELECT TOP (${length})[Name], [ExchangeCompanyId], [Date], [Amount] ,[Currency] FROM StockExchangeRates ser WITH(NOLOCK) INNER JOIN ExchangeCompanies ex ON ser.ExchangeCompanyId = ex.Id ORDER BY ser.Id DESC`;
      sqlRequest.query(sqlQuery, function (err, data) {
        if (err) console.log(err);

        res.send(data.recordsets);
      });
    });
  });
});

//inicjalizacja serwera na porcie /5000
const webserver = app.listen(5000, function () {
  console.log("Server running");
});
