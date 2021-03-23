"use strict";
exports.__esModule = true;
var src_1 = require("../src");
var page = {
    templatePath: src_1.getTemplatePath('home.ejs'),
    htmlPath: src_1.getHtmlPath('index.html'),
    getData: function () { return ({
        meta: {
            title: 'Home'
        },
        text: 'helo'
    }); }
};
exports["default"] = page;
