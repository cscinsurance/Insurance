var silderController = app.controller('silderController', function ( $scope) {

 	jQuery('.slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 500,
	  fade: true,
	  cssEase: 'linear'
	});
});

var footerController = app.controller('footerController', function ($scope) {
    ;(function($, window, undefined) {
		var btnBackTop = jQuery('#btn-backtotop');
		  console.log(btnBackTop);
		  btnBackTop.on('click', function(event) {
		    event.preventDefault();
		    $('html,body').animate({
		        scrollTop: 0
		    }, 400);
		  });
		}(jQuery, window));
});

var homeControler = app.controller('homeController', function ($rootScope, $scope, $http) {
});

