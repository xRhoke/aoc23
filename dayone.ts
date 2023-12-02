const fs = require('fs')

const numberWordMap: Map<string, number> = new Map([['one', 1], ['two', 2], ['three', 3], ['four', 4], ['five', 5], ['six', 6], ['seven', 7], ['eight', 8], ['nine', 9]])

const parseCalibrationValues = (calibrationInput: string[]): number[] => {
    return calibrationInput.map(word => {
        const convertedWord = convertFirstLastNumberWords(word)
        const numberChars = convertedWord.split('').filter(char => !isNaN(parseInt(char)))
        const value = parseInt(numberChars[0] + numberChars[numberChars.length - 1])

        console.log(`${word} \n--> ${convertedWord} \n--> ${numberChars} \n--> ${value}\n`)
        return value
    })
}

const convertFirstLastNumberWords = (word: string): string => {
    let firstWordIndex = word.length
    let lastWordIndex = -1
    let firstWord = ""
    let lastWord = ""

    numberWordMap.forEach((value, key) => {
        if (word.indexOf(key) > -1 && word.indexOf(key) < firstWordIndex) {
            firstWordIndex = word.indexOf(key)
            firstWord = key
        }
        if (word.lastIndexOf(key) > lastWordIndex) {
            lastWordIndex = word.lastIndexOf(key)
            lastWord = key
        }
    })

    return `${word.slice(0, firstWordIndex)}${numberWordMap.get(firstWord)}${word.slice(firstWordIndex + 1, lastWordIndex)}${numberWordMap.get(lastWord)}${word.slice(lastWordIndex + 1)}`
}

const rawInput = fs.readFileSync("./input/dayone.txt").toString().split("\n")
const calibrationValues: number[] = parseCalibrationValues(rawInput)
const calibrationSum: number = calibrationValues.reduce((total, value) => total + value, 0)

console.log(`Calibration values total: ${calibrationSum}`);
