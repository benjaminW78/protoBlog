'use strict';
var data = [ '$scope',
    '$injector',
    function ( $scope, $injector ) {
        var blogPostOverViews = $injector.get( 'blogPostOverViews' );

        $scope.loginForm;
        $scope.blogPosts;

        $scope.deleteBlogPost = deleteBlogPostById;

        $scope.whatClassIsIt = function ( someValue ) {
            if ( someValue == "published" )
                return "list-group-item list-group-item-success";
            else if ( someValue == "draft" )
                return "list-group-item list-group-item-warning";
            else
                return "list-group-item list-group-item-danger";
        };

        function deleteBlogPostById ( id ) {
            blogPostOverViews.deleteBlogPost( id ).then( getBlogPostsInfo );
        }

        function getBlogPostsInfo () {
            blogPostOverViews.getBlogPostList().then( function ( data ) {
                $scope.blogPosts = data
            } );
        }

        getBlogPostsInfo();
    } ];

module.exports = data;
