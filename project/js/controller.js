///--------------SilderController
var silderController = app.controller('silderController', function ( $scope,$http) {

	$http.get("data/insurance.json")
		.then(function(response) {
			$scope.slider = response.data.slider;

	});

//--------------slider run when ng-repeat done------------------------
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

//-----------footerController to handle bacn to top event-------------
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

//--------TravelController to handle event in travel-care block-------------------  
var travelController = app.controller('travelController', function ($scope, $http,$location,$filter,couchdbService) {
	$scope.url = $location.url();

		//-------------get data from couchDB-----------
		couchdbService.getAllDocs().then(function(response){
			var data = response[0]; 
			$scope.travelList = [];
		//--------convest oject data ---> array data-------- 
			for(let prop in data) {
				if((data[prop].id) != null && (data[prop].id)!= '') {
					$scope.travelList.push(data[prop]);
				}
			}


			$scope.remove = function(oj,i) {
				var ojElemment = oj,
					 popup = angular.element('.popup__warpper');

				 $scope.nameDelete = ojElemment.name ;
				 $scope.idDelete = ojElemment.id ;
				 $scope.phoneDelete = ojElemment.phone ;

					popup.show();
					$scope.hide = function(){
						popup.hide();
					}
					$scope.deleteData = function(){
						popup.hide();
					    $scope.travelList.splice(i,1);
					    for(let key in data) {
							if(data[key] == ojElemment) {
								var prop = key;
							}
						}
						delete data[prop];
						couchdbService.save(data);
					}

			}

		});
});

//-------TravelController to handle trave-form block----------------

var travelformController = app.controller('travelformController', function ($scope, $http,$stateParams,$filter,couchdbService,$location) {
	$scope.id = $stateParams.id;
	$scope.show = false;
	$scope.hide = false;
	if($scope.id ==''){
		$scope.show = true;
	}else {
		$scope.hide = true;
		
	}

//----------------Individual value for Form
	var dataInitialize = {
					  "id": "",
					  "name": "",
					  "type": "",
					  "phone": "",
					  "days": "",
					  "state": false,
					  "asean": false,
					  "asia": false,
					  "global": false,
					  "individual": false,
					  "group": false,
					  "family": false,
					  "classic": false,
					  "premier": false,
					  "stability": false,
					  "instability": false,
					  "relax": false,
					  "discover": false,
					  "conquest": false,
					  "road": false,
					  "warterway": false,
					  "airline": false
					};
//----------------Get Doc from ClouchDB----------------
	couchdbService.getAllDocs().then(function(response){
		var data = response[0];
		var index;
		var arrayIndex = [];
//------------------Get Value Oject in data Oject-----------prop:   		
		for(var prop in data) {
			arrayIndex.push(data[prop].id); // set all Id card in array
			if((data[prop].id) == $scope.id) 
			{ 
				index = prop;
				$scope.form = data[prop];
			}
		}
			
 		var form = $scope.form;

 //---- check ID card Exits ?--------------------------
		$scope.change = function() {
			if ( (arrayIndex.indexOf( form.id ) > -1) ) {
				$scope.checkDoup = true;

				if(form.id == null){ 
					$scope.checkDoup = false;
				}
			}else {
				$scope.checkDoup = false;
			}

			
		};


//---------------------------------- Check 'Confirm' and checkBok-------------------------------
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
//------------------------------Check input checkBox for total Money
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
//--------------------Bound Only one input checked---------
		//  (Wait update code ^_^) 

//--------------------- save Data-------------------------
		 $scope.save= function() {
		 	data[index] = $scope.form;
		 	couchdbService.save(data);
		 	window.history.back();
		}

		$scope.create= function() {
			var d = new Date(),
    			n = d.getTime();
		 	data[n] = $scope.form;
		 	data[0] = dataInitialize;
		 	couchdbService.save(data);
		 	window.history.back();
		}

			
	});

});

//-----HomeControler to handle home page ----------------------------
var homeControler = app.controller('homeController', function ( $scope, $http, couchdbService) {

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