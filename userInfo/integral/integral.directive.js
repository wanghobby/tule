/**
 * Created by 94802 on 2017/4/27.
 */
angular.module('integral').
directive('integralPage', function () {
    return {
        restrict: "ACE",
        replace: true,
        templateUrl: 'userInfo/integral/integral.template.html',
        controller:['$scope','$http',function ($scope,$http){
            console.log("here.....");
        }]
    }
});