'use strict';

var app = angular.module('app');

app.directive('activeLink', function ($location) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            scope.$watch(
                function () {
                    return $location.path();
                },
                function (newPath) {
                    element.find('li').removeClass('active');
                    angular.forEach(element.find('a'), function (value) {
                        var a = angular.element(value);
                        if (a.attr('href').substr(1) == newPath.substr(1)) {
                            a.parents('li').addClass('active');
                        }
                    });
                }
            );
        }
    }
});