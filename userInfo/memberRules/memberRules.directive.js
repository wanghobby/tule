/**
 * Created by 94802 on 2017/4/27.
 */
angular.module('memberRules')
    .directive('memberRulesPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'userInfo/memberRules/memberRules.template.html',
            controller:['$scope','$http',function () {

            }]
        }
    });

/*
angular.module('memberRules')
    .directive('myInfoPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'userInfo/myInfo/myInfo.template.html',
            controller:['$scope','$http',function () {

            }]
        }
    })*/
