var express = require("express");
var path = require("path");
var fs = require("fs");

var PORT = 3000;
var app = express();

app.use(function(req, res, next) {
    console.log("Request IP: " + req.url);
    console.log("Request Date: " + new Date());
    next();
});

app.use(function(req, res, next) {
    var filePath = path.join(__dirname, "static", req.url);
    console.log(filePath);
    fs.stat(filePath, function(err, fileInfo) {
        if (err) {
            next();
            return;
        }

        if (fileInfo.isFile()) {
            res.sendFile(filePath);
        } else {
            next();
        }
    });
});

app.use(function(req, res) {
    res.status(404);
    res.send("File not found!");
});

app.listen(PORT, function() {
    console.log("App started on port " + PORT);
});
