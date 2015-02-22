var fs = require('fs');
var _ = require('underscore');
var loaderUtils = require('loader-utils');

var escapeRegExp = function(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

module.exports = function(content) {
    var loader = this.data.loaders[0];
    var hasPragma = false;
    var myCall = function () {
        this.callback.apply(this, arguments);
    }.bind(this);
    this.cacheable();

    var query = loaderUtils.parseQuery(this.query);
    var regexString = escapeRegExp('/** @' + query.pragma + ' */');

    if (!query.pragma) {
        this.emitError('conditional-pragma-loader requires a `pragma` option');
    }

    if (content.match(new RegExp(regexString))) {
        var context = _.extend({}, this, { query: loader.query, callback: myCall });
        content = require(loader.path).call(context, content);
    }

    if (content) {
        return content;
    }
};

module.exports.pitch = function(remainingRequest, precedingRequest, data) {
    this.cacheable();
    data.loaders = this.loaders.slice(this.loaderIndex + 1);
    this.loaders.splice(this.loaderIndex + 1, Infinity);
};