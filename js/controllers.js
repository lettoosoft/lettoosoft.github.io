'use strict';

/* Controllers */

angular.module('app.controllers', [])
    .controller('AppCtrl', ['$scope', 'blogService', function ($scope, blogService) {
        $scope.app = {
            title: 'Lettoo',
            sub_title: 'Thoughts, stories and ideas.',
            web_url: '//lettoosoft.github.io',
            disqus_shortname: 'lettoo',

        };

        blogService.get_category_list().then(function(category_list){
            $scope.category_list = category_list;
        });
    }])

    .controller('BlogListCtrl', ['$scope', '$routeParams', '$rootScope', 'blogService',
        function ($scope, $routeParams, $rootScope, blogService) {
            $rootScope.detail = false;
            var tag = $routeParams.tag;
            var author = $routeParams.author;
            var category = $routeParams.category;

            $scope.itemsPerPage = 5;
            $scope.currentPage = 0;

            if (tag) {
                blogService.get_tag_blog_list(tag).then(function(blog_list){
                    $scope.blog_list = blog_list;
                });
            } else if (author) {
                blogService.get_author_blog_list(author).then(function(blog_list){
                    $scope.blog_list = blog_list;
                });
            } else if (category) {
                blogService.get_category_blog_list(category).then(function(blog_list){
                    $scope.blog_list = blog_list;
                });
            } else {
                blogService.get_blog_list().then(function (blog_list) {
                    $scope.blog_list = blog_list;
                });
            }

            $scope.prevPage = function () {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.prevPageDisabled = function () {
                return $scope.currentPage === 0;
            };

            $scope.pageCount = function () {
                if ($scope.blog_list) {
                    return Math.ceil($scope.blog_list.length / $scope.itemsPerPage);
                } else {
                    return 1;
                }
            };

            $scope.nextPage = function () {
                if ($scope.currentPage < $scope.pageCount()) {
                    $scope.currentPage++;
                }
            };

            $scope.nextPageDisabled = function () {
                return $scope.currentPage + 1 === $scope.pageCount();
            };

        }])

    .controller('BlogDetailCtrl', ['$scope', '$routeParams', '$rootScope', 'blogService',
        function ($scope, $routeParams, $rootScope, blogService) {
            $rootScope.detail = true;
            var slug = $routeParams.slug;
            $scope.contentLoaded = false;

            blogService.get_blog(slug).then(function(blog){
                $scope.blog = blog;
                $scope.contentLoaded = true;
            });

            $scope.content_md_url = function (blog) {
                if (blog) {
                    return blog.content_md_url;
                } else {
                    return '';
                }
            }
        }])
;