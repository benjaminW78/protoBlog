var data = [ function() {
    this.do = function reroute(myData) {
        if (typeof typeof myData !== 'object' && !myData) {
            throw new Error('error myData = ' + typeof myData + ' reRoutage');
        }
        if ( myData.message === 'redirection') {
            document.location = myData.kapsule.path;
        } else {
            throw new Error('error opts message not defined proxy.send');
        }
    };
}];

module.exports = data;
