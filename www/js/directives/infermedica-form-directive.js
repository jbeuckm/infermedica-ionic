angular.module('infermedica.directives', ['infermedica.services'])
    .directive('infermedicaForm', function ($rootScope, $ionicGesture) {

        var $scope;

        return {
            restrict: 'E',
            templateUrl: 'templates/infermedica-form.html',
            link: function (scope, element, attrs) {

                $scope = scope;
                /*                
                $scope.user = {
                    sex: 0
                };
*/


                $scope.$watch('user', function (val) {
                    console.log($scope.user);
                }, true);

            }
        };


    });