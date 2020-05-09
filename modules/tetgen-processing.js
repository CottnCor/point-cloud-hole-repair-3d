#!/usr/bin/env node

/**
 * @description 3. 三角格网处理
 */

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const exec = shell.exec;

// ///////////////////////////////////////

const { rename, checkout } = require('../util');
const separator = require('../assets/separator');

// ///////////////////////////////////////

const gen = 'tetgen -fengkqcMY ';

// ///////////////////////////////////////

const tetGen = (dir, name) => {
    if (exec(`${gen}${dir}`).code === 0) {
        const old_node_dir = dir.replace(path.extname(name), '.1.node');
        const old_face_dir = dir.replace(path.extname(name), '.1.face');
        const old_edge_dir = dir.replace(path.extname(name), '.1.edge');
        const old_ele_dir = dir.replace(path.extname(name), '.1.ele');
        const old_mesh_dir = dir.replace(path.extname(name), '.1.mesh');
        const old_neigh_dir = dir.replace(path.extname(name), '.1.neigh');
        const old_vtk_dir = dir.replace(path.extname(name), '.1.vtk');
        const node_dir = rename(old_node_dir, 'step_03');
        const face_dir = rename(old_face_dir, 'step_03');
        const edge_dir = rename(old_edge_dir, 'step_03');
        const ele_dir = rename(old_ele_dir, 'step_03');
        const mesh_dir = rename(old_mesh_dir, 'step_03');
        const neigh_dir = rename(old_neigh_dir, 'step_03');
        const vtk_dir = rename(old_vtk_dir, 'step_03');
        fs.renameSync(old_node_dir, node_dir);
        fs.renameSync(old_face_dir, face_dir);
        fs.renameSync(old_edge_dir, edge_dir);
        fs.renameSync(old_ele_dir, ele_dir);
        fs.renameSync(old_mesh_dir, mesh_dir);
        fs.renameSync(old_neigh_dir, neigh_dir);
        fs.renameSync(old_vtk_dir, vtk_dir);
        return { node_dir, face_dir, edge_dir, ele_dir, mesh_dir, neigh_dir, vtk_dir };
    } else return {};
};

const processing = (dir, processing) => {
    if (processing) {
        if (dir) {
            return processing(dir);
        } else {
            separator('🐛🐛🐛 something has failed...');
            return false;
        }
    } else return false;
};

// ///////////////////////////////////////

const step_03 = (input) => {
    return new Promise((resolve, reject) => {
        let flag = true;
        separator('🚗🚗🚗「step_03」is processing');
        const { node_dir, face_dir } = tetGen(input, `${path.basename(input)}`);
        flag = flag && processing(node_dir, checkout);
        flag = flag && processing(face_dir, checkout);
        if (flag) {
            separator('👌👌👌「step_03」is finished');
            resolve({ node_dir, face_dir });
        } else {
            separator('🐷🐷🐷「step_03」has failed...');
            reject();
        }
    });
};

module.exports = step_03;
