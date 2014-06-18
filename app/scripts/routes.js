'use strict';

angular.module('app').config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'IndexCtrl',
            templateUrl: 'views/index.html',
            tab: 'home'
        })
        .when('/about', {
            controller: 'AboutCtrl',
            templateUrl: 'views/about.html',
            tab: 'about'
        })
        .when('/contacts', {
            controller: 'ContactsCtrl',
            templateUrl: 'views/contacts.html',
            tab: 'contacts'
        })
        .otherwise({
            redirectTo: '/'
        })
    ;
});
