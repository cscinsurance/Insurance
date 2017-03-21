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
	

		$scope.remove = function(i) {
		    $scope.travelList.splice(i,1);
		}

	$http.get("data/form.json")
		.then(function(response) {
	 	var ojNull = $filter('filter')(response.data, {id:''})[0];
	 	$scope.travelList = jQuery.grep(response.data, function(value) {
		  return value != ojNull;
		});
	});
	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
		jQuery('.block-travel').find("button[ng-disabled='true']").css({'background':'black','box-shadow':'3px 3px 5px #888888'});
		 
	});

	// 	$http.get(cloudbUrl"fe25d50914fb9b3b30ac9bb66c001fa6")
	// 	.then(function(response) {
	// 		console.log(JSON.stringify(response.data));

	 	
	// });



});

var travelformController = app.controller('travelformController', function ($scope, $http,$stateParams,$filter) {
	$scope.id = $stateParams.id;
	$http.get("data/form.json")
	    .then(function(response) {
	 		$scope.form = $filter('filter')(response.data, {id:$scope.id})[0];

	 		var form =$scope.form;
	  		var confirm = jQuery('.confirm'),
	  			inputAre = (form.asean)+(form.asia)+(form.global),
	  			inputTypeCare = (form.individual)+(form.group)+(form.family),
	  			inputPackage = (form.classic)+(form.premier),
	  			inputAreaTravel = (form.stability)+(form.instability),
	  			inputTourism = (form.relax)+(form.discover)+(form.conquest),
	  			inputVehicle = (form.road)+(form.warterway)+(form.airline);


	 	if($scope.form.state){

	  		jQuery('.info-customer').find('input[type="text"]').attr('disabled', true);
	  		confirm.prop('checked', true);
	  		confirm.attr('disabled', true);

	  		if( inputAre >0){
	  			jQuery('.area').find('input[name="area"]').attr('disabled', true);
	  		}
	  		if( inputTypeCare >0){
	  			jQuery('.type-care').find('input[name="type-care"]').attr('disabled', true);
	  		}
	  		if( inputPackage >0){
	  			jQuery('.package').find('input[name="package"]').attr('disabled', true);
	  		}
	  		if( inputAreaTravel >0){
	  			jQuery('.area-travel').find('input[name="area-travel"]').attr('disabled', true);
	  		}
	  		if( inputTourism >0){
	  			jQuery('.tourism').find('input[name="tourism"]').attr('disabled', true);
	  		}
	  		if( inputVehicle >0){
	  			jQuery('.vehicle').find('input[name="vehicle"]').attr('disabled', true);
	  		}
	 	}

	 	 $scope.computedTotal = function () {
	 	 	var total = 100;
		      total += (form.asean ? 100 : 0) + (form.asia ? 200 : 0) + (form.global ? 300 : 0);
		      total += (form.individual ? 100 : 0) + (form.group ? 300 : 0) + (form.family ? 200 : 0);
		      total += (form.classic ? 100 : 0) + (form.premier ? 200 : 0);
		      total += (form.stability ? 100 : 0) + (form.instability ? 200 : 0) ;
		      total += (form.relax ? 100 : 0) + (form.discover ? 200 : 0) + (form.conquest ? 300 : 0);
		      total += (form.road ? 100 : 0) + (form.warterway ? 200 : 0) + (form.airline ? 300 : 0);
		     return total;
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

var healthctrl = app.controller('healthctrl', function($scope){
	this.list = lists;

	var lists = [
            {
						name: "ABC",
						cmnd: "1111111111",
						status: "",
        },
            {
						name: "B",
						cmnd: "22222222",
						status: "",
        },
				            {
						name: "C",
						cmnd: "33333333333",
						status: "",
        },
				            {
						name: "D",
						cmnd: "4444444444444",
						status: "",
        },
				            {
						name: "E",
						cmnd: "555555555555",
						status: "",
        },
    ];
	//  $scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
  //           if( col.filters[0].term ){
  //           return 'header-filtered';
  //           } else {
  //           return '';
  //           }
  //       };

	// 	$scope.gripOptions = {
	// 		enableFiltering: true,
	// 		onRegisterApi: function(gridApi){
	// 			$scope.gridApi = gridApi;
	// 		},

	// 	paginationPageSizes: [1, 5, 10, 15, 20],
	// 	paginationPageSizes: 5,
	// 	columnDefs: [
	// 		{field: 'name', displayName: 'Ten', headerCellClass: $scope.highlightFilteredHeader},
	// 		{field: 'cmnd', displayName: 'So CMND',headerCellClass: $scope.highlightFilteredHeader},
  //     {field: 'status', displayName: 'Tinh Trang',headerCellClass: $scope.highlightFilteredHeader},
	// 	]

	// };


	


});