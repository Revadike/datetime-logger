const fs = require("fs");
const path = require("path");
const util = require("util");

function Logger(options) {
    if (!options.hasOwnProperty("filename")) options.filename = "log.txt";
    if (!options.hasOwnProperty("regex")) options.regex = /.*/g;

    var logStream = fs.createWriteStream(options.filename, { "flags": "a" });
    var log = console.log;
    return function() {
        var first_parameter = arguments[0];
        var other_parameters = Array.prototype.slice.call(arguments, 1);
    
        function formatConsoleDate(date) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var milliseconds = date.getMilliseconds();
            return "[" + ((year < 10) ? "0" + year : year) +
                "-" + ((month < 10) ? "0" + month : month) +
                "-" + ((day < 10) ? "0" + day : day) +
                " " + ((hour < 10) ? "0" + hour : hour) +
                ":" + ((minutes < 10) ? "0" + minutes : minutes) +
                ":" + ((seconds < 10) ? "0" + seconds : seconds) +
                "." + ("00" + milliseconds).slice(-3) + "]";
        }
        var tolog = [formatConsoleDate(new Date()), first_parameter].concat(other_parameters);
        var str = "";
        tolog.forEach(function(arg) {
            str += (typeof arg === "string" ? arg : util.inspect(arg, false, null)) + " ";
        });
        str.slice(0, -1);
        if (options.regex.test(str)) logStream.write(str + "\r\n");
        log.apply(console, [str]);
    };
}

module.exports = Logger;