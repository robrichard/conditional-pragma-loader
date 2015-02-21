var fs = require('fs');
var loaderUtils = require('loader-utils');

var escapeRegExp = function(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

module.exports = function(content) {
    this.cacheable();
    return content;
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    var query = loaderUtils.parseQuery(this.query);
    var filename = remainingRequest.split('!').pop();
    var content = fs.readFileSync(filename, {encoding: 'utf8'});
    var regexString = escapeRegExp('/** @' + query.pragma + ' */');

    if (!query.pragma) {
        throw new Error('conditional-pragma-loader requires a `pragma` option');
    }

    if (!content.match(new RegExp(regexString))) {
        return content;
    }
};
