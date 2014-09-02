
假如一个列表的数据不是很多，且变化不是很频繁，我觉得用前端分页还是很方便。尤其是对于一个纯前端的blog来说。

  - 按一周更新2篇blog，一年才100来篇
  - 一个列表json文件才10几kb，还是在没有压缩的情况下
  - blog正文全部放在content/&lt;YYYYMMDD&gt;/&lt;slug&gt;.md文件里

Controller
--------------

```javascript
.controller('BlogListCtrl', ['$scope', 'blogService',
    function ($scope, blogService) {
        $scope.itemsPerPage = 5;
        $scope.currentPage = 0;

        blogService.get_blog_list().success(function (data) {
            blogService.blog_list = data;
            $scope.blog_list = blogService.blog_list;
        });

        $scope.prevPage = function () {
            if ($scope.currentPage &gt; 0) {
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
            if ($scope.currentPage &lt; $scope.pageCount()) {
                $scope.currentPage++;
            }
        };

        $scope.nextPageDisabled = function () {
            return $scope.currentPage + 1 === $scope.pageCount();
        };

    }])
```

Filter
------

```javascript
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
```

HTML
----

```html
&lt;article class="post" ng-repeat="blog in blog_list|
    offset: currentPage*itemsPerPage |
    limitTo: itemsPerPage |
    orderBy: 'id':true"&gt;...&lt;/article&gt;

&lt;nav class="pagination" role="navigation"&gt;
    &lt;a href class="newer-posts"
       ng-hide="prevPageDisabled()"
       ng-click="prevPage()"&gt;&larr; Newer Posts
    &lt;/a&gt;
    &lt;span class="page-number"&gt;Page {{currentPage + 1}} of {{ pageCount() }}&lt;/span&gt;
    &lt;a href class="older-posts"
       ng-hide="nextPageDisabled()"
       ng-click="nextPage()"&gt;Older Posts &rarr;
    &lt;/a&gt;
&lt;/nav&gt;
```
