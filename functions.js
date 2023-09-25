"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z_score = exports.std = exports.mean = exports.sum = exports.read = void 0;
var fs = require('fs');
var read = function (o, f) {
    var json = JSON.stringify(o, null, 2);
    fs.writeFile(f, json, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("".concat(f, " created!"));
    });
};
exports.read = read;
var sum = function (a) {
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return sum;
};
exports.sum = sum;
var mean = function (a) {
    return (0, exports.sum)(a) / a.length;
};
exports.mean = mean;
var std = function (a, mean_a) {
    var x = 0;
    a.forEach(function (n) {
        x += ((n - mean_a) * (n - mean_a));
    });
    return Math.sqrt(x / a.length);
};
exports.std = std;
var z_score = function (n, mean, std) {
    return (n - mean) / std;
};
exports.z_score = z_score;
