const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { isEmptyArray } = require('../utils/what-type')
const { returnPath, fsExistSync } = require('../utils/fs-operation')

const URL = process.env.URL || 'localhost';
const DB_NAME = 'cvtsp_webuser_doc';
const MODEL_PATH = path.resolve(process.cwd(), './router');
const db = mongoose.createConnection(`mongodb://${URL}/${DB_NAME}`);

var model = {};
const schemas = fs.readdirSync(MODEL_PATH);
schemas.forEach(s => {
    try {
        const schema_path = path.join(MODEL_PATH, s);
        const model_path = path.resolve(schema_path, './model')
        const schemaList = fs.readdirSync(model_path);
        
        !isEmptyArray(schemaList) && schemaList.forEach(list => {
            const name = path.basename(list, '.js');
            const item = require(path.join(model_path, list));
            const Schema = new mongoose.Schema(item);

            model[name] = db.model(name, Schema);
        })
    }catch(e) {
       
    } 
})

db.on('open', function() {
    console.log('mongodb started success!!!');
});

module.exports = model;