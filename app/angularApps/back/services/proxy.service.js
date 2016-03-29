'use strict';

var data = ['$injector', function($injector) {
    var $http = $injector.get('$http');
    this.send = function send(opts) {
        if ( typeof opts !== 'object' ) {
            throw new Error('error opts not a object proxy.send');
        }
        if (Object.keys(opts).indexOf('url') === -1 || !opts.url ) {
            throw new Error('error opts url not defined proxy.send');
        }
        if (Object.keys(opts).indexOf('method') === -1 || !opts.method ) {
            throw new Error('error opts method not defined proxy.send');
        }
        if(opts.method==="post" && Object.keys(opts).indexOf('getParams')!==-1){
            throw new Error('error opts for POST method  expect data key not getParams proxy.send');

        }
        if (Object.keys(opts).indexOf('getParams') !== -1 || opts.getParams ) {
            opts.params = opts.getParams;
        }

        if (Object.keys(opts).indexOf('dataType') === -1 || !opts.dataType ) {
            opts.dataType = 'json';
        }
        return $http(opts);
    };
}];

module.exports = data;
