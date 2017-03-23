var app = angular.module('app', ['ui.router', 'couchdb'] );

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

    $stateProvider.state('travel', {
        url: '/travel-care',
        templateUrl: 'block/travel-care.html',
        controller:'travelController'
    });

	$stateProvider.state('travelform', {
        url: '/travel-care/:id',
        templateUrl: 'block/travel-form.html',
        controller:'travelformController'
        
    });

     $stateProvider.state('product', {
        url: '/car-care',
        templateUrl: 'block/car-care.html'
    });

     $stateProvider.state('healthcare', {
        url: '/health-care',
        templateUrl: 'block/health-care.html',
        controller:'healthctrl'
    });
});
