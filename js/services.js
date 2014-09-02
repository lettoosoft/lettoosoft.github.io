'use strict';

/* Services */

angular.module('app.services', [])
    .factory('blogService', function ($http) {
        var service = {};

        service.get_blog_list = function () {
            var resp = $http.get('/content/blog.json');
            return resp;
        };

        service.get_blog = function (slug) {
            for (var i in service.blog_list) {
                if (service.blog_list[i].slug == slug) {
                    return service.blog_list[i];
                }
            }
        };

        service.get_tag_blog_list = function(tag) {
            var result = [];
            for (var i in service.blog_list) {
                if (service.blog_list[i].tags.indexOf(tag) >= 0) {
                    result.push(service.blog_list[i]);
                }
            }
            return result;
        };

        service.get_author_blog_list = function(author) {
            var result = [];
            for (var i in service.blog_list) {
                if (service.blog_list[i].author.slug == author) {
                    result.push(service.blog_list[i]);
                }
            }
            return result;
        };

        return service;
    })
;
