#!/usr/bin/env node

/**
 * @description 5. 坐标处理
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const exec = require('child_process').exec;

// ///////////////////////////////////////

const { rename, checkout } = require('../util');
const separator = require('../assets/separator');
const ProgressBar = require('../util/progress-bar');

// ///////////////////////////////////////

const points = [];

// ///////////////////////////////////////

const node_processing = (input) => {
    return new Promise((resolve, reject) => {
        exec(`wc -l ${input}`, function (error, results) {
            const total = Number(results.replace(input, '').trim());
            const output = rename(input.replace(path.extname(input), '.node.json'), 'step_05');
            if (total && total > 0) {
                let index = 0;
                const _pb = new ProgressBar('🦶🦶🦶 processing node coord');
                const _fr = fs.createReadStream(input);
                const _rl = readline.createInterface({
                    input: _fr,
                    terminal: false
                });
                _rl.on('line', (line) => {
                    _pb.render({ completed: index, total });
                    if (index > 0 && index < total - 1) {
                        const arr = line.trim().replace(/\s+/g, ' ').split(/\s/);
                        if (arr && arr.length > 4) {
                            arr.splice(0, 1);
                            arr.splice(-1, 1);
                            points.push(arr.map((item) => Number(item)));
                        }
                    }
                    index++;
                });
                _fr.on('end', () => {
                    const node = { type: 'node', total, points };
                    const json = JSON.stringify(node, null, '\t');
                    fs.writeFileSync(output, json);
                    resolve(output);
                });
            }
        });
    });
};

const face_processing = (input) => {
    return new Promise((resolve, reject) => {
        exec(`wc -l ${input}`, function (error, results) {
            const total = Number(results.replace(input, '').trim());
            const output = rename(input.replace(path.extname(input), '.face.json'), 'step_05');
            if (total && total > 0) {
                let index = 0;
                const vertices = [];
                const _pb = new ProgressBar('🦶🦶🦶 processing face coord');
                const _fr = fs.createReadStream(input);
                const _rl = readline.createInterface({
                    input: _fr,
                    terminal: false
                });
                _rl.on('line', (line) => {
                    _pb.render({ completed: index, total });
                    if (index > 0 && index < total - 1) {
                        const arr = line.trim().replace(/\s+/g, ' ').split(/\s/);
                        if (arr && arr.length > 4) {
                            arr.splice(0, 1);
                            arr.splice(-1, 1);
                            vertices.push(arr.map((item) => Number(item)));
                        }
                    }
                    index++;
                });
                _fr.on('end', () => {
                    const face = { type: 'face', total, vertices, points };
                    const json = JSON.stringify(face, null, '\t');
                    fs.writeFileSync(output, json);
                    resolve(output);
                });
            }
        });
    });
};

const processing = async (dir, processing) => {
    if (processing) {
        if (dir) {
            const output = await processing(dir);
            return checkout(output);
        } else {
            separator('🐛🐛🐛 something has failed...');
            return false;
        }
    } else return false;
};

const step_05 = (input) => {
    return new Promise(async (resolve, reject) => {
        let flag = true;
        separator('🚗🚗🚗「step_05」is processing');
        const { node_dir, face_dir } = input;
        flag = flag && (await processing(node_dir, node_processing));
        flag = flag && (await processing(face_dir, face_processing));
        separator('👌👌👌「step_05」is finished');
        resolve();
    });
};

module.exports = step_05;
