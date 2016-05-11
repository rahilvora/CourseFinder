/**
 * Created by rahilvora on 02/05/16.
 */

var adminApp = angular.module("AdminApp",["ngRoute","ui.bootstrap"]);

//Controllers

adminApp.controller("UdemyController", ["$scope", "$http", "$location", function($scope, $http, $location){
    //Get Requests
    $scope.webdevelopment = [];
    $scope.mobiledevelopment = [];
    $scope.bigdata = [];
    $scope.finance = [];
    $scope.accounting = [];
        $http.get('api/getUdemyCourses').then(function(result){
            var data = result.data.docs[0].courses;
            debugger;
            for( var a in data){
                if(data[a].website === "udemy"){
                    if(data[a].subcategory === "finance"){
                        $scope.finance.push(data[a]);
                    }
                    else if(data[a].subcategory === "accounting"){
                        $scope.accounting.push(data[a]);
                    }
                    else if(data[a].subcategory === "mobile-development"){
                        $scope.mobiledevelopment.push(data[a]);
                    }
                    else if(data[a].subcategory === "web-development"){
                        $scope.webdevelopment.push(data[a]);
                    }
                    else if(data[a].subcategory === "big-data"){
                        $scope.bigdata.push(data[a]);
                    }
                }
            }
            console.log($scope.webdevelopment);
        });

    $scope.udemyAPICall = function(){
        $http.get('api/udemyAPICall').then(function(result){
            var data = result.data;
        });
    }
}]);

adminApp.controller("UdacityController",["$scope","$http","$location",function($scope,$http,$location){
    //Get Requests
    $scope.webdevelopment = [];
    $scope.mobiledevelopment = [];
    $scope.bigdata = [];
    $scope.finance = [];
    $scope.accounting = [];
    $http.get('api/getUdacityCourses').then(function (result) {
        var data = result.data.docs[0].courses;
        for(var a in data){
            if(data[a].website === "udacity"){
                if(data[a].subcategory === "finance"){
                    $scope.finance.push(data[a]);
                }
                else if(data[a].subcategory === "accounting"){
                    $scope.accounting.push(data[a]);
                }
                else if(data[a].subcategory === "mobile-development"){
                    $scope.mobiledevelopment.push(data[a]);
                }
                else if(data[a].subcategory === "web-development"){
                    $scope.webdevelopment.push(data[a]);
                }
                else if(data[a].subcategory === "big-data"){
                    $scope.bigdata.push(data[a]);
                }
            }
        }
    });

    $scope.udacityAPICall = function(){
        $http.get('api/udacityAPICall').then(function(result){
            var data = result.data;
        });
    }

}]);

adminApp.controller("CourseraController",["$scope","$http","$location",function($scope,$http,$location){
    //Get Requests
    $scope.webdevelopment = [];
    $scope.mobiledevelopment = [];
    $scope.bigdata = [];
    $scope.finance = [];
    $scope.accounting = [];
        $http.get('api/getCourseraCourses').then(function (result) {
            var data = result.data.docs[0].courses;
            for( var a in data){
                if(data[a].website === "coursera"){
                    if(data[a].subcategory === "finance"){
                        $scope.finance.push(data[a]);
                    }
                    else if(data[a].subcategory === "accounting"){
                        $scope.accounting.push(data[a]);
                    }
                    else if(data[a].subcategory === "mobile-development"){
                        $scope.mobiledevelopment.push(data[a]);
                    }
                    else if(data[a].subcategory === "web-development"){
                        $scope.webdevelopment.push(data[a]);
                    }
                    else if(data[a].subcategory === "big-data"){
                        $scope.bigdata.push(data[a]);
                    }
                }
            }
        });

    $scope.courseraAPICall = function(){
        $http.get('api/courseraAPICall').then(function(result){
            var data = result.data;
        });
    }

}]);

adminApp.controller("EdxController",["$scope","$http","$location",function($scope,$http,$location){
    //Get Requests

    $scope.refresh = function(){
        $http.get('api/getEdxCourses').then(function (result) {

        });
    };
    $scope.refresh();

    $scope.edxAPICall = function(){
        $http.get('api/edxAPICall').then(function(result){
            var data = result.data;
        });
    }

}]);
adminApp.controller("refreshController",["$scope","$http","$location",function($scope,$http,$location){
    //Get Requests

    $scope.refresh = function(){
        $http.get('api/refreshDatabase').then(function (result) {

        });
    };


}]);


//Routes

adminApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/umedy',{
            templateUrl: '../Views/AdminViews/Udemy/ListCourses.ejs',
            controller : 'UdemyController'
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
        when('/refreshDatabase',{
            templateUrl: '../Views/AdminViews/RefreshApi.ejs',
            controller: 'refreshController'
        }).
        otherwise({
            redirectTo: "/"
        })
    }]);