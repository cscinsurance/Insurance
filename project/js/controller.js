var silderController = app.controller('silderController', function ( $scope,$http) {

	$http.get("data/insurance.json")
		.then(function(response) {
			$scope.slider = response.data.slider;

	});

	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
		 	jQuery('.slider').slick({
			  dots: true,
			  speed: 500,
			  fade: true,
			  cssEase: 'linear',
			  autoplay: true,
		  	  autoplaySpeed: 1000,
			});
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

var travelController = app.controller('travelController', function ($scope, $http,$location,$filter) {
	$scope.url = $location.url();
	$http.get("data/form.json")
		.then(function(response) {
	 	var ojNull = $filter('filter')(response.data, {id:''})[0];
	 	$scope.travelList = jQuery.grep(response.data, function(value) {
		  return value != ojNull;
		});

	 	$scope.remove = function(i) {
	        $scope.travelList.splice(i,1);
	    }
	});



	// $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
	// 	jQuery('.block-travel').find("button[ng-disabled='true']").attr('disabled', true);
		 
	// });
});

var travelformController = app.controller('travelformController', function ($scope, $http,$stateParams,$filter) {
	$scope.id = $stateParams.id;
	$http.get("data/form.json")
	    .then(function(response) {
	 	$scope.form = $filter('filter')(response.data, {id:$scope.id})[0];

	 	if($scope.form.state){

	  		jQuery('.info-customer').find('input[type="text"]').attr('disabled', true);
	  		var confirm = jQuery('.confirm');
	  		confirm.prop('checked', true);
	  		confirm.attr('disabled', true);
	 	}

	});

});

var homeControler = app.controller('homeController', function ( $scope, $http) {

	$http.get("data/insurance.json")
		.then(function(response) {
			$scope.insurance = response.data.cardInsurance;
			$scope.infor = response.data.carInforInsurance;
	});

});

