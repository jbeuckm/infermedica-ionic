angular.module('infermedica.directives', ['infermedica.services'])
    .directive('infermedicaForm', function ($rootScope, $ionicGesture, Infermedica) {

        var $scope;

        return {
            restrict: 'E',
            templateUrl: 'templates/infermedica-form.html',
            link: function (scope, element, attrs) {

                $scope = scope;

                var searchTimeout;

                function getSex() {
                    if ($scope.user == null) {
                        return null;
                    } else if ($scope.user.sex == "null") {
                        return null;
                    }
                }

                $scope.$watch('search', function (val) {

                    if ($scope.search == "") return;
                    
                    clearTimeout(searchTimeout);

                    searchTimeout = setTimeout(lookupSearch, 1000);


                }, true);

                $scope.searchResults = [];

                function lookupSearch() {
                    Infermedica.lookup($scope.search, getSex()).success(function (data, status, headers, config) {
                        console.log(data, status, headers, config);

                        $scope.searchResults = [data];
                    });
                }

                $scope.evidence = [];

                $scope.addObservation = function (id) {
                    $scope.evidence.push({
                        "id": id,
                        "choice_id": "present",
                        "observed_at": new Date()
                    });
                    
                    $scope.search = "";
                    $scope.searchResults = [];
                }

            }
        };


    });