'use strict';

var app = angular.module('app');

app.controller('IndexCtrl', function ($scope) {
  	$scope.message = 'Home';
});

app.controller('AboutCtrl', function ($scope) {
    $scope.message = 'About';
});

app.controller('ContactsCtrl', function ($scope) {
    $scope.message = 'Contacts';
});

