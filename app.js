const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
const http = require("http");
const { json } = require("express/lib/response");

var UserIP;

const IPURL = "https://api.myip.com";

app.use(express.static("public"));
app.set("view engine", "pug");
https.get(IPURL, function (resp) {
  resp.on("data", function (data) {
    const info = JSON.parse(data);
    UserIP = info.ip;
  });
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  const APIKEY = "f7e3cae938178f7110c6ba666d5037a3";
  const INFOIPURL =
    "http://api.ipapi.com/api/" + UserIP + "?access_key=" + APIKEY;

  http.get(INFOIPURL, function (resp) {
    resp.on("data", function (data) {
      const info = JSON.parse(data);
      resp.render(__dirname + "/index.html", { ip: info.ip });
      console.log(info);
    });
  });
});

app.listen(3000, function () {
  console.log("serveris running on port 3000");
});
