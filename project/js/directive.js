app.directive('cardInsurance', function () {
    return {
        restrict: 'E',
        replace:true,
        scope: {
            item: '=',
        },
        templateUrl: 'block/directive/card-insurance.html'
    };
});

app.directive('cardInfor', function () {
    return {
        restrict: 'E',
        replace:true,
        scope: {
            item: '=',
        },
        templateUrl: 'block/directive/card-infor.html'
    };
});


app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attr.onFinishRender);
                });
            }
        }
    }
});

app.directive('cardSlider', function () {
    return {
        restrict: 'E',
        replace:true,
        scope: {
            item: '=',
        },
        templateUrl: 'block/directive/card-slider.html'
    };
});