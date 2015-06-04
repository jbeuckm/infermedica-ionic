// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('infermedica', ['ionic', 'infermedica.services', 'infermedica.controllers', 'infermedica.directives'])

.config(function ($sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.infermedica.com/**'
    ]);
    
})


.run(function ($ionicPlatform, $http, Infermedica) {
    $ionicPlatform.ready(function () {


        var credentials;

        $http({
            method: 'GET',
            url: './js/credentials.json'
        }).success(function (data, status, headers, config) {
            credentials = data;
            Infermedica.init(credentials.infermedica.app_id, credentials.infermedica.app_key);
        }).error(function(err){
            console.error("eror loading creds file");
            console.error(err);
            
        });


        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.filter('percentage', ['$filter', function($filter) {
    return function(input, decimals) {
        return $filter('number')(input*100, decimals)+'%';
    };
}]);