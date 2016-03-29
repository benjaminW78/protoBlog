'use strict';
var data = ['$injector', function($injector) {
    var proxyServ = $injector.get('proxy');
    this.getBlogPostList = function getBlogPostList() {

           var opts = {
                method: 'get',
                url:'/api/blogPosts?filter=*&orderBy=id' ,
            },
            successCb = function(resData) {
                console.log(resData);
                if (resData.status === 200) {
                   resData.data.kapsule.map(function(element,index,array){
                        for (var x in element){
                            element[x] = decodeURI(element[x]);
                        }
                        array[index] = element;
                   });
                    return resData.data.kapsule;
                }
            },
            errorCb = function(resData) {
                console.log(resData, 'ERROR');
            };
        return proxyServ.send(opts).then(successCb, errorCb);
    };

}];

module.exports = data;
