var data = ['$location',function($location) {
    this.do = function reroute(data) {
        if (typeof typeof data !== 'object' && !data) {
            throw new Error('error data = ' + typeof data + ' reRoutage');
        }
        if ( data.message === 'redirection') {
            $location.path(data.kapsule.path);
        }
        else{
            throw new Error('error opts message not defined proxy.send');
        }

    };
}];

module.exports = data;
