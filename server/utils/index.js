const fs = require('fs')
const path = require('path')
const merge = require('merge')
const model = require('../database')
const request = require('request')
const config = require('../utils/config.js')

/**
 * 获取数据库（json）内容
 * @param 
 * @param {Path} dbUrl: 同个文件夹下的数据库名称，目前暂不支持不同的文件夹 
 */
function get(targetUrl, dbName) {
    var db = fs.readFileSync(path.join(targetUrl, dbName + '.json'));
    return JSON.parse(db);
}

/**
 * http请求
 * @param {Object} obj: 需要http参数
 */
function http(obj) {
    var http_default = {method: 'post', headers: {
        "content-type": "application/json",
        "token": process.env.TOKEN
    }};
    var options = merge(http_default, obj);
    options.url = process.env.REQUEST_HOST + options.url;
    return new Promise((resolve, reject) => {
        request(options, function(err, res, body) {
            resolve(body);
        });
    });
}

/**
 * 是否存在token，将token进行存储
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isPermission(req, res, next) {
    const {token} = req.headers;

    model.token.findOne({token}, (err, doc) => {
        if(!doc) {
            res.send({
                flag: false,
                code: 401
            });
        }else {
            next();
        }
    });
}

module.exports = {
    get,
    http,
    isPermission
}