var fs = require('fs')
var path = require('path')

/**
 * 判断当前的路径是否有文件存在
 * @param {String} url 
 * @return {Boolean} true: 存在文件 false: 不存在
 */
exports.fsExistSync = function(url) {
    try {
        fs.accessSync(url, fs.F_OK);
    }catch(e) {
        return false;
    }
    return true;
}

/**
 * 返回当前的报警
 * @param {*} url 
 */
exports.returnPath = function(url) {
    path.resolve(__dirname, url);
}