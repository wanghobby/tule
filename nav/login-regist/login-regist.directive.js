/**
 * Created by dell on 2017/4/22.
 */
angular.module('loginRegist').
directive('loginRegistPage',function () {
    return {
        restrict : "ACE",
        replace:true,
        templateUrl : 'nav/login-regist/login-regist.template.html',
            controller:['$scope','$http','$rootScope','$location','$state',function ($scope,$http,$rootScope,$location,$state) {
            //记住现在的登录路径

                $scope.abc=function () {
                    var nowPath = $location.path();
                    seStorage.setItem("fromPath",nowPath);
                    console.log(nowPath);
                    $state.go("login", {}, { reload: true});
                };

                var seStorage = window.sessionStorage;
                var storage = window.localStorage;
             //判断时间登录，在一定的时间内能自动登录
                var dOfMs = (24 * 60 * 60 * 1000);
                var mydate = new Date();
                var headway = (mydate.getTime() / (24 * 60 * 60 * 1000)).toFixed(2);

            if (storage.getItem("info")!=null) {
                var info = storage.getItem("info");
                var arrInfo = info.split("&");
                var deposit = arrInfo[3];
                var nickName = arrInfo[2];
                if ((headway - deposit) < 7) {
                    $scope.phone_num = arrInfo[0];
                    $scope.pass_word = arrInfo[1];
                    $rootScope.userId = arrInfo[2];
                    $rootScope.userPhoto = arrInfo[5];
                    //console.log($rootScope.userPhoto);
                    $rootScope.isLogin = true;
                    console.log($rootScope.userId);}
                }//end of storage
                else{
                 var infoSe = seStorage.getItem("infoSe");
                 if(infoSe!=null){

                     $rootScope.userId = infoSe.split("&")[1];
                     $rootScope.userPhoto001 = infoSe.split("&")[3];

                     $rootScope.isLogin = true;
                 }
            }
            $scope.logOut=function () {
                seStorage.clear();
                storage.clear();
                $rootScope.userId='';
                $rootScope.isLogin=false;
                $state.go('tule');
            }

        }]
    }
});