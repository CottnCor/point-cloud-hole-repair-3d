const shell = require('shelljs');
const chalk = require('chalk');

const echo = shell.echo;

module.exports = (tips, icon = '') => {
    echo();
    echo();
    echo(chalk.yellow(`${icon}${icon}${icon}${icon}${icon}${icon}········································`));
    echo(chalk.green(tips));
    echo(chalk.yellow(`${icon}${icon}${icon}${icon}${icon}${icon}········································`));
    echo();
};
