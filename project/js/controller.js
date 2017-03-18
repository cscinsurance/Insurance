var silderController = app.controller('silderController', function ( $scope) {

 	jQuery('.slider').slick({
	  dots: true,
	  speed: 500,
	  fade: true,
	  cssEase: 'linear',
	  autoplay: true,
  	  autoplaySpeed: 1000,
	});
});

var footerController = app.controller('footerController', function ($scope) {
    ;(function($, window, undefined) {
		var btnBackTop = jQuery('#btn-backtotop');
		  btnBackTop.on('click', function(event) {
		    event.preventDefault();
		    $('html,body').animate({
		        scrollTop: 0
		    }, 400);
		  });
	}(jQuery, window));
});

var travelController = app.controller('travelController', function ($scope, $http, $stateParams,$location) {

	$http.get("data/form.json")
		.then(function(response) {
		    $scope.travelList = response.data;
	});

	// $scope.searchText = '';

	// $scope.delete = function(){
	// 	var button = jQuery('.content-travel').find('button');
	// 	button.click(function(){
	// 		console.log($(this));
	// 	});
	// }
});

var travelformController = app.controller('travelformController', function ($scope, $http,$parse, $stateParams,$location) {
	$scope.categoryUrl = $location.url();
	$scope.id = $stateParams.id;

	$http.get("data/form.json")
	    .then(function(response) {

	    	for(let n of response.data){
	    		if(n.id === $scope.id){
	    			$scope.text = n;
	    		}else {
	    			console.log('404');
	    		}
	    	}
	 });

});

var homeControler = app.controller('homeController', function ($rootScope, $scope, $http) {


});

