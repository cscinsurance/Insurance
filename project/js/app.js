var app = angular.module('app', ['ui.router']);

angular.element(document).ready(function () {
    if (location.hash === '') {
        location.hash = '/';
    }
});

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'block/home.html',
        controller:'homeController'
    });
});
