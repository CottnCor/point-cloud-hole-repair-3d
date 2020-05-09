/**
 * @description ProgressBar
 */

const stdout = require('single-line-log').stdout;
const shell = require('shelljs');
const chalk = require('chalk');

const echo = shell.echo;

class ProgressBar {
    constructor(description, length) {
        this.description = description || 'Progress';
        this.length = length || 25;
    }
    render(params) {
        let cell = '';
        let empty = '';
        const percent = (params.completed / params.total).toFixed(4);
        const cell_num = Math.floor(percent * this.length);
        for (let i = 0; i < cell_num; i++) {
            cell += '█';
        }
        for (let i = 0; i < this.length - cell_num; i++) {
            empty += '░';
        }
        const bar = this.description + ': ' + (100 * percent).toFixed(2) + '% ' + cell + empty + ' ' + params.completed + '/' + params.total;
        stdout(bar);
    }
}

module.exports = ProgressBar;
