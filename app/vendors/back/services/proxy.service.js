'use strict';

var data = ['$http', function($http) {
    this.send = function send(opts, successCb, errorCb) {
        if (typeof successCb !== 'function' && !successCb && typeof errorCb !== 'function' && !errorCb) {
            throw new Error('error successcb = ' + typeof successCb + ' & errorCb = ' + typeof errorCb + ' function proxy.send');
        }
        if ( typeof opts !== 'object' ) {
            throw new Error('error opts not a object proxy.send');
        }
        if (Object.keys(opts).indexOf('url') === -1 || !opts.url ) {
            throw new Error('error opts url not defined proxy.send');
        }
        if (Object.keys(opts).indexOf('method') === -1 || !opts.method ) {
            throw new Error('error opts method not defined proxy.send');
        }
        if (Object.keys(opts).indexOf('getParams') !== -1 || opts.getParams ) {
            opts.params = opts.getParams;
        }

        if (Object.keys(opts).indexOf('dataType') === -1 || !opts.dataType ) {
            opts.dataType = 'json';
        }
        $http(opts).then(successCb, errorCb);
    };
}];

module.exports = data;
