const chalk = require('chalk');


module.exports = {
    error: function (message, obj) {
        message = [
            chalk.red(`Error: ${message}`)
        ];

        if (obj) {
            message.push(obj);
        }
        console.log(...message);
    },
    info: function (message, obj) {
        message = [
            chalk.bgBlue(`Info: ${message}`)
        ];
        if(obj) {
            message.push(obj);
        }
        console.log(...message);
    },
    warning: function (message, obj) {
        message = [
            chalk.black.bgYellow(`Warning: ${message}`)
        ];
        if (obj) {
            message.push(obj);
        }
        console.log(...message);
    },
    success: function (message, obj) {
        message = [
            chalk.black.bgGreen(`Success: ${message}`)
        ];
        if (obj) {
            message.push(obj);
        }
        console.log(...message);
    },
    props: function (obj) {
        const message = [
            chalk.bgMagenta(`Props:`)
        ];
        if (obj) {
            message.push(obj);
        }
        console.log(...message);
    },
    routes: function (obj) {
        const message = [
            chalk.bgBlue(`Props:`)
        ];
        if (obj) {
            message.push(obj);
        }
        console.log(...message);
    }
};