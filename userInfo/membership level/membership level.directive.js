/**
 * Created by 94802 on 2017/4/28.
 */
angular.module('memberShipLevel', []).
directive('memberShipLevelPage', function () {
    return {
        restrict: "ACE",
        replace: true,
        templateUrl: 'userInfo/membership Level/membership Level.template.html',
        controller:['$scope','$http',function ($scope,$http){
            document.querySelector('.le-container-image-top-right').onclick=function () {
                document.querySelector('.le-container-left').style.display='block';
                document.querySelector('.le-container').style.display='none';
            };
            document.querySelector('.le-container-image-top-left1').onclick=function () {
                document.querySelector('.le-container ').style.display='block';
                document.querySelector('.le-container-left').style.display='none';
            };

        }]
    }
});