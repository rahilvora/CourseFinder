/**
 * Created by rahilvora on 08/05/16.
 */

var UserApp = angular.module("UserApp",["ngRoute","ui.bootstrap"]);

UserApp.controller("GetRecommendationController",["$scope","$http", "$location","myService", function($scope,$http,$location, myService){
    $scope.typeformAPICall = function(){
        console.log("Here");
        $http.get('api/getTypeFormData').then(function(result){

        });
    };
    $scope.subcategories = {
        webDevelopment:[],
        mobileDevelopment:[],
        bigData:[],
        finance:[],
        accounting:[]
    };
    $scope.subcategories  = myService.getData();




    $scope.submitForm = function(){
        $http.get("api/getData").then(function(result){
            var data = result.data.docs[0].courses;
            for(var a in data){
                if(data[a].category.toLowerCase() == $scope.form.category.toLowerCase()){
                    if($scope.form.webdevelopment == true && data[a].subcategory=="web-development"){
                        $scope.subcategories.webDevelopment.push(data[a]);
                    }
                    if($scope.form.mobiledevelopment == true && data[a].subcategory=="mobile-development"){
                        $scope.subcategories.mobileDevelopment.push(data[a]);
                    }
                    if($scope.form.bigdata == true && data[a].subcategory == "big-data"){
                        $scope.subcategories.bigData.push(data[a]);
                    }
                    if($scope.form.finance == true && data[a].subcategory == "finance"){
                        $scope.subcategories.finance.push(data[a]);
                    }
                    if($scope.form.accounting == true && data[a].subcategory == "accounting"){
                        $scope.subcategories.accounting.push(data[a]);
                    }
                }
            }
          //  console.log($scope.webdevelopment);
            myService.store($scope.subcategories);
            $location.path('/result');
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
        when('/result',{
            templateUrl: '../Views/Users/result.ejs',
            controller: 'GetRecommendationController'
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