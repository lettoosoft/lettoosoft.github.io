'use strict';

/* Services */

angular.module('app.services', [])
    .factory('blogService', function ($http) {
        var service = {};

        service.get_blog_list = function () {
            return $http.get('content/blog.json').then(function (resp) {
                return resp.data;
            });
        };

        service.get_blog = function (slug) {
            return $http.get('content/blog.json').then(function (resp) {
                var blog_list = resp.data;
                for (var i in blog_list) {
                    if (blog_list[i].slug == slug) {
                        return blog_list[i];
                    }
                }
            });
        };

        service.get_tag_blog_list = function (tag) {
            return $http.get('content/blog.json').then(function (resp) {
                var result = [];
                var blog_list = resp.data;
                for (var i in blog_list) {
                    if (blog_list[i].tags.indexOf(tag) >= 0) {
                        result.push(blog_list[i]);
                    }
                }
                return result;
            });
        };

        service.get_author_blog_list = function (author) {
            return $http.get('content/blog.json').then(function (resp) {
                var result = [];
                var blog_list = resp.data;
                for (var i in blog_list) {
                    if (blog_list[i].author.slug == author) {
                        result.push(blog_list[i]);
                    }
                }
                return result;
            });
        };

        service.get_category_blog_list = function (category) {
            return $http.get('content/blog.json').then(function (resp) {
                var result = [];
                var blog_list = resp.data;
                for (var i in blog_list) {
                    if (blog_list[i].category == category) {
                        result.push(blog_list[i]);
                    }
                }
                return result;
            });
        };

        service.get_category_list = function () {
            return $http.get('content/blog.json').then(function (resp) {
                var category_list = [];
                var blog_list = resp.data;
                for (var i in blog_list) {
                    var found = false;
                    for(var k in category_list) {
                        var c = category_list[k];
                        if (c.title == blog_list[i].category) {
                            c.count = c.count + 1;
                            found = true;
                            break;
                        }
                    }
                    if (found == false) {
                        category_list.push({
                            title: blog_list[i].category,
                            count: 1
                        });
                    }
                }
                console.log(category_list);
                return category_list;
            });
        };

        return service;
    })
;
