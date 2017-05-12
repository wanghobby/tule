/**
 * Created by 94802 on 2017/5/6.
 */
angular.module('writeUserInfo')
    .directive('writeUserInfoPage',function () {
        return{
            restrict: "ACE",
            replace: true,
            templateUrl: 'userInfo/writeUserInfo/writeUserInfo.template.html',
            controller:['$scope', '$http',function ($scope,$http) {

            }]
        }
})