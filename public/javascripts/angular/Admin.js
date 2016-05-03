/**
 * Created by rahilvora on 02/05/16.
 */

var adminApp = angular.module("AdminApp",["ngRoute","ui.bootstrap"]);

//Controllers

adminApp.controller("UmedyController", ["$scope", "$http", "$location", function($scope, $http, $location){
    //Get Requests
    $scope.refresh = function(){
        $http.get('api/getUmedyCourses').then(function(result){
            var data = result.data;
        });
    };
}]);

adminApp.controller("UdacityController",["$scope","$http","$location",function($scope,$http,$location){
    //Get Requests
    $scope.refresh = function(){
        s$http.get('api/getUdacityCourses').then(function(result){

        });
    };

}]);

adminApp.controller("CourseraController",["$scope","$http","$location",function($scope,$http,$location){
    $scope.drivers = [];

    //Get Requests
    $scope.refresh = function() {
        $http.get('api/getCourseraCourses').then(function (result) {

        });
    };
    $scope.refresh();
    //Post Request


}]);

adminApp.controller("EdxController",["$scope","$http","$location",function($scope,$http,$location){
    //Get Requests

    $scope.refresh = function(){
        $http.get('api/getEdxCourses').then(function (result) {

        });
    };
    $scope.refresh();

    //Post Request

}]);


//Routes

adminApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/umedy',{
            templateUrl: '../Views/AdminViews/Umedy/ListCourses.ejs',
            controller : 'UmedyController'
        }).
        when('/umedy/api',{
            templateUrl: '../Views/AdminViews/Umedy/RefreshApi.ejs',
            controller: 'UmedyController'
        }).
        when('/udacity',{
            templateUrl: '../Views/AdminViews/Udacity/ListCourses.ejs',
            controller: 'UdacityController'
        }).
        when('/udacity/api',{
            templateUrl: '../Views/AdminViews/Udacity/RefreshApi.ejs',
            controller: 'UdacityController'
        }).
        when('/coursera',{
            templateUrl: '../Views/AdminViews/Coursera/ListCourses.ejs',
            controller: 'CourseraController'
        }).
        when('/coursera/api',{
            templateUrl: '../Views/AdminViews/Coursera/RefreshApi.ejs',
            controller: 'CourseraController'
        }).
        when('/edx',{
            templateUrl: '../Views/AdminViews/Edx/ListCourses.ejs',
            controller: 'EdxController'
        }).
        when('/edx/api',{
            templateUrl: '../Views/AdminViews/Edx/RefreshApi.ejs',
            controller: 'EdxController'
        }).
        otherwise({
            redirectTo: "/"
        })
    }]);