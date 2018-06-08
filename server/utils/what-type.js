
var toString = Object.prototype.toString;
var isArray = Array.isArray || function(obj) {
	return toString.call(obj) === '[object Array]';
}

/**
 * 判断是否为对象
 * @param {*} obj 
 */
exports.isObject = function (obj) {
	let type = typeof obj;
	return type === 'function' || type === 'object' && !!obj;
};

/**
 * 判断是否为数组
 */
exports.isArray = isArray;

/**
 * 判断是否为空数组
 * @param {Array} obj
 * @return {Boolean} 
 */
exports.isEmptyArray = function(obj) {
	if(isArray(obj) && obj.length > 0) {
		return false;
	}
	return true;
}

