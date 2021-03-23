"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.getHtmlPath = exports.getTemplatePath = exports.config = void 0;
var path = require("path");
var ejs = require("ejs");
var fs = require("fs");
exports.config = {
    publicPath: path.resolve(__dirname, '..', '..', 'public'),
    distPath: path.resolve(__dirname, '..', '..', 'dist'),
    templatePath: path.resolve(__dirname, '..', '..', 'templates')
};
function getTemplatePath() {
    var name = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        name[_i] = arguments[_i];
    }
    return path.resolve.apply(path, __spreadArray([exports.config.templatePath], name));
}
exports.getTemplatePath = getTemplatePath;
function getHtmlPath() {
    var name = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        name[_i] = arguments[_i];
    }
    return path.resolve.apply(path, __spreadArray([exports.config.publicPath], name));
}
exports.getHtmlPath = getHtmlPath;
function getScript() {
    var name = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        name[_i] = arguments[_i];
    }
    return path.resolve.apply(path, __spreadArray(['public', 'scripts'], name));
    // return path.resolve(config.publicPath, 'scripts', ...name);
}
function getStylesheet() {
    var name = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        name[_i] = arguments[_i];
    }
    // return path.resolve('public', 'styles', ...name);
    // return path.resolve(config.publicPath, 'styles', ...name);
}
var pages_1 = require("../pages");
var Bundler = require("parcel-bundler");
var watcher = require("chokidar");
var util_1 = require("./util");
function buildPages(pages) {
    var _this = this;
    pages.forEach(function (page) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // compare hash of data and template
            if (true) {
                ejs
                    .renderFile(page.templatePath, __assign({ global: { getTemplatePath: getTemplatePath, getScript: getScript, getStylesheet: getStylesheet } }, page.getData()), { async: true })
                    .then(function (html) {
                    fs.writeFile(page.htmlPath, html, function (err) { return err && console.error(err.message); });
                    util_1.message(page.htmlPath + " built");
                })["catch"](function (err) { return console.error(err); });
            }
            return [2 /*return*/];
        });
    }); });
}
// build once
buildPages(pages_1["default"]);
watcher
    .watch(exports.config.templatePath)
    .on('add', function (path) {
    util_1.message(path + " added");
})
    .on('change', function (path) {
    util_1.message(path + " changed");
    // buildPages(pages((p) => p.templatePath === path));
    buildPages(pages_1["default"]);
});
var entryFiles = getHtmlPath('index.html');
var options = {
    outDir: exports.config.distPath,
    publicUrl: '/',
    watch: true,
    cache: true,
    cacheDir: '.cache',
    contentHash: true,
    minify: false,
    scopeHoist: false,
    target: 'browser',
    logLevel: 3,
    hmr: true,
    hmrPort: 0,
    sourceMaps: true,
    hmrHostname: '',
    detailedReport: true,
    autoInstall: true
};
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var bundler, bundle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bundler = new Bundler(entryFiles, options);
                    return [4 /*yield*/, bundler.bundle()];
                case 1:
                    bundle = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
})();
