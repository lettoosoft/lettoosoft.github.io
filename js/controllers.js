'use strict';

/* Controllers */

angular.module('app.controllers', [])
    .controller('AppCtrl', ['$scope', function ($scope) {
        $scope.app = {
            title: 'Lettoo',
            sub_title: 'Thoughts, stories and ideas.',
            web_url: '//lettoosoft.github.io'
        };
    }])

    .controller('BlogListCtrl', ['$scope', '$routeParams', '$rootScope', 'blogService',
        function ($scope, $routeParams, $rootScope, blogService) {
            $rootScope.detail = false;
            var tag = $routeParams.tag;
            var author = $routeParams.author;

            $scope.itemsPerPage = 5;
            $scope.currentPage = 0;

            if (tag) {
                blogService.get_blog_list().success(function (data, status, headers, config) {
                    blogService.blog_list = data;
                    $scope.blog_list = blogService.get_tag_blog_list(tag);
                });
            } else if (author) {
                blogService.get_blog_list().success(function (data, status, headers, config) {
                    blogService.blog_list = data;
                    $scope.blog_list = blogService.get_author_blog_list(author);
                });
            } else {
                blogService.get_blog_list().success(function (data, status, headers, config) {
                    blogService.blog_list = data;
                    $scope.blog_list = blogService.blog_list;
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

            if (blogService.blog_list == undefined) {
                blogService.get_blog_list().success(function (data, status, headers, config) {
                    blogService.blog_list = data;
                    $scope.blog = blogService.get_blog(slug);
                });
            } else {
                $scope.blog = blogService.get_blog(slug);
            }

            $scope.content_md_url = function (blog) {
                if (blog) {
                    return blog.content_md_url;
                } else {
                    return '';
                }
            }
        }])
;