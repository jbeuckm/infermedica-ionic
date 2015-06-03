angular.module('infermedica.directives', ['infermedica.services'])
    .directive('infermedicaForm', function ($rootScope, $ionicGesture, Infermedica, $ionicModal) {

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

                $scope.$watch('user', getDiagnosis, true);

                $scope.$watch('search', function (val) {

                    if ($scope.search == "") return;

                    clearTimeout(searchTimeout);

                    searchTimeout = setTimeout(lookupSearch, 1000);


                }, true);

                $scope.searchResults = [];

                function lookupSearch() {
                    Infermedica.lookup($scope.search, getSex()).success(function (data, status) {
                        $scope.searchResults = [data];
                    });
                }

                $scope.evidence = [];

                $scope.addObservation = function (observation) {

                    $scope.evidence.push({
                        "id": observation.id,
                        "name": observation.name,
                        "choice_id": "present",
                        //                        "observed_at": new Date()
                    });

                    $scope.search = "";
                    $scope.searchResults = [];

                    getDiagnosis();
                }

                function getDiagnosis() {
                    if (!$scope.user) return;
                    if ($scope.evidence.length == 0) return;
                    Infermedica.diagnosis($scope.user.age, $scope.user.sex, $scope.evidence).success(function (data, status) {
                        console.log(data);

                        handleQuestion(data.question);
                    });
                }

                function handleQuestion(question) {

                    $ionicModal.fromTemplateUrl('templates/infermedica-question-modal.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function (modal) {
                        $scope.modal = modal;
                        $scope.modal.show();
                    });


                    $scope.closeModal = function () {
                        $scope.modal.hide();
                    };
                    //Cleanup the modal when we're done with it!
                    $scope.$on('$destroy', function () {
                        $scope.modal.remove();
                    });
                    // Execute action on hide modal
                    $scope.$on('modal.hidden', function () {
                        // Execute action
                    });
                    // Execute action on remove modal
                    $scope.$on('modal.removed', function () {
                        // Execute action
                    });
                }

            }
        };


    });