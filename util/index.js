/**
 * @description utils
 */

const fs = require('fs');
const path = require('path');
const separator = require('../assets/separator');

const checkout = (dir) => {
    if (fs.existsSync(dir)) {
        separator(`🐸🐸🐸 ${path.basename(dir)}`);
        return true;
    } else return false;
};

const rename = (dir, tag) => {
    return dir
        .replace(path.basename(dir), `[${tag}]${path.basename(dir)}`)
        .replace(/\[.*?\]/g, (match) => (match === `[${tag}]` ? match : ''))
        .replace('.1', '');
};

module.exports = { checkout, rename };
