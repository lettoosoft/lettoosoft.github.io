'use strict';

/* Filters */
// need load the moment.js to use this filter.
angular.module('app.filters', [])
    .filter('offset', function () {
        return function (input, start) {
            if (input) {
                start = parseInt(start, 10);
                return input.slice(start);
            } else {
                return [];
            }
        };
    })
;