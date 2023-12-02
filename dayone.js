"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var numberWordMap = new Map([['one', 1], ['two', 2], ['three', 3], ['four', 4], ['five', 5], ['six', 6], ['seven', 7], ['eight', 8], ['nine', 9]]);
var parseCalibrationValues = function (calibrationInput) {
    return calibrationInput.map(function (word) {
        var convertedWord = convertFirstLastNumberWords(word);
        var numberChars = convertedWord.split('').filter(function (char) { return !isNaN(parseInt(char)); });
        var value = parseInt(numberChars[0] + numberChars[numberChars.length - 1]);
        console.log("".concat(word, " \n--> ").concat(convertedWord, " \n--> ").concat(numberChars, " \n--> ").concat(value, "\n"));
        return value;
    });
};
var convertFirstLastNumberWords = function (word) {
    var firstWordIndex = word.length;
    var lastWordIndex = -1;
    var firstWord = "";
    var lastWord = "";
    numberWordMap.forEach(function (value, key) {
        if (word.indexOf(key) > -1 && word.indexOf(key) < firstWordIndex) {
            firstWordIndex = word.indexOf(key);
            firstWord = key;
        }
        if (word.lastIndexOf(key) > lastWordIndex) {
            lastWordIndex = word.lastIndexOf(key);
            lastWord = key;
        }
    });
    return "".concat(word.slice(0, firstWordIndex)).concat(numberWordMap.get(firstWord)).concat(word.slice(firstWordIndex + 1, lastWordIndex)).concat(numberWordMap.get(lastWord)).concat(word.slice(lastWordIndex + 1));
};
var rawInput = fs_1.default.readFileSync("./input/dayone.txt").toString().split("\n");
var calibrationValues = parseCalibrationValues(rawInput);
var calibrationSum = calibrationValues.reduce(function (total, value) { return total + value; }, 0);
console.log("Calibration values total: ".concat(calibrationSum));
