'use strict';

var data = ['$injector', function($injector) {
    var $window = $injector.get('$window');
    return $window.notify;
}];

module.exports = data;
