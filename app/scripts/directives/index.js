'use strict';

var app = angular.module('app');

app.directive('activeLink', function ($location) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(
                function () {
                    return $location.path();
                },
                function (newPath) {
                    console.log(newPath);
                    element.find('li').removeClass('active');
                    angular.forEach(element.find('a'), function (value) {
                        var a = angular.element(value);
                        if (a.attr('href').substr(1) == $location.path().substr(1)) {
                            a.parents('li').addClass('active');
                        }
                    });
                }
            );
        }
    }
});