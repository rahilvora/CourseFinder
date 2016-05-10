/**
 * Created by rahilvora on 08/05/16.
 */

var UserApp = angular.module("UserApp",["ngRoute","ui.bootstrap"]);

UserApp.controller("GetRecommendationController",["$scope","$http", "$location",function($scope,$http,$location){
    $scope.typeformAPICall = function(){
        console.log("Here");
        $http.get('api/getTypeFormData').then(function(result){

        });
    }
    $scope.submitForm = function(){
        debugger;
        console.log($scope.form);
        $http.get("api/getData").then(function(result){

        });
    }
}]);

UserApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/getrecommendation',{
            templateUrl: '../Views/Users/GetRecommendation.ejs',
            controller : 'GetRecommendationController'
        }).
        when('/umedy/api',{
            templateUrl: '../Views/AdminViews/Udemy/RefreshApi.ejs',
            controller: 'UdemyController'
        }).
        when('/udacity',{
            templateUrl: '../Views/AdminViews/Udacity/ListCourses.ejs',
            controller: 'UdacityController'
        }).
        when('/udacity/api',{
            templateUrl: '../Views/AdminViews/Udacity/RefreshApi.ejs',
            controller: 'UdacityController'
        }).
        otherwise({
            redirectTo: "/"
        })
    }]);