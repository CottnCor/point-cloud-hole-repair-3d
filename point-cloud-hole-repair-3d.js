#!/usr/bin/env node

const path = require('path');
const shell = require('shelljs');
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

// ///////////////////////////////////////

const step_01 = require('./modules/original-data-processing');
const step_03 = require('./modules/tetgen-processing');
const step_05 = require('./modules/coord-processing');

// ///////////////////////////////////////

const logo = require('./assets/logo');
const byebye = require('./assets/byebye');
const separator = require('./assets/separator');

// ///////////////////////////////////////

const echo = shell.echo;

// ///////////////////////////////////////

echo(chalk.cyan(logo()));

program
    .version('version 1.0.0', '-v, --version')
    .option('-d, --dir [file dir]', 'point cloud file dir', String)
    .option('-n, --name [file name]', 'point cloud file name', String)
    .description('「point cloud hole repair 3d」 is a xxxxxxxxx.')
    .action((option) => {
        const config = {
            ...{
                dir: '',
                name: ''
            },
            ...option
        };

        separator('🐢🐢🐢「point cloud hole repair 3d」 version 1.0.0 designed by jack.');

        const params = [];

        if (!config.dir) {
            params.push({
                type: 'input',
                name: 'dir',
                // default: process.cwd(),
                default: '/Users/wooletor/Downloads/magneton',
                message: 'Please input the 「point cloud file dir」',
                validate: function (dir) {
                    if (!dir) {
                        return "Can't be empty!";
                    }
                    return true;
                }
            });
        }

        if (!config.name) {
            params.push({
                type: 'input',
                name: 'name',
                default: 'headHolePoint-Repaired.txt',
                message: 'Please input the 「point cloud file name」',
                validate: function (name) {
                    if (!name) {
                        return "Can't be empty!";
                    }
                    return true;
                }
            });
        }

        inquirer.prompt(params).then(async function (answers) {
            const { dir, name } = answers;
            try {
                const step_01_input = path.join(dir, name);
                const step_01_output = await step_01(step_01_input);
                const step_03_output = await step_03(step_01_output);
                const step_05_output = await step_05(step_03_output);
            } catch (error) {
                separator('😖😖😖 something has failed...');
            } finally {
                separator('😉😉😉 finish...');
                echo(chalk.cyan(byebye()));
            }
        });
    });

program.parse(process.argv);
