
// Ifrån jsramverk
var sqlite3 = require('sqlite3').verbose();

module.exports = (function () {
    if (process.env.NODE_ENV === 'test') {
        console.log('Returning db test');
        return new sqlite3.Database('./db/tests.sqlite');
    }

    console.log('Returning db texts');
    return new sqlite3.Database('./db/texts.sqlite');
}());
