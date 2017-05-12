/**
 * Created by wang on 2017/4/23.
 */
angular.module('userInfo').
directive('userInfoPage', function () {
    return {
        restrict: "ACE",
        replace: true,
        templateUrl: 'userInfo/userInfo.html',
        controller: ['$scope', '$http', '$parse','$rootScope','serverURL','Upload', function ($scope, $http, $parse,$rootScope,serverURL,Upload) {
           /* var asideNavOff = $('#asideNav').offset().top;
                  console.log(asideNavOff);
                   $(window).scroll(function () {
                       if($(window).scrollTop()>178){
                           $('#asideNav').css("position",'fixed');
                           $('#asideNav').css("top",'0px');
                           $('#asideNav').css({"background-color":"white",'width':"290px"});

                       }else{
                           $('#asideNav').css("position",'static');
                       }
                  });*/
            var session =  window.sessionStorage ;
            var loStorage = window.localStorage;
            if(session.getItem('infoSe')!=null){
                var userPhone =session.getItem('infoSe').split('&')[0];
                $scope.uId =session.getItem('infoSe').split('&')[2];
                $scope.nickName001 = session.getItem('infoSe').split('&')[1];
                $scope.phoneNum=userPhone;
            }else if(loStorage!=null){
                var userPhone = loStorage.getItem('info').split('&')[0];
                $scope.uId =loStorage.getItem('info').split('&')[4];
                $scope.phoneNum=userPhone;
                $scope.nickName001 =loStorage.getItem('info').split('&')[2];
            }



            //请求头像
             $http({
             method: 'GET',
             url: serverURL + 'users/getUserIcon/?uId='+$scope.uId,
             }).then(function (response) {

             $scope.user_icon=serverURL+"/images/userinfo/"+response.data.userPhoto;
                 console.log($scope.user_icon);
             }, function (data) {
             console.log(data);
             });


            $scope.myImage='';
            var handleFileSelect=function(evt) {
                var file=evt.currentTarget.files[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function($scope){
                        $scope.myImage=evt.target.result;
                    });
                };
                reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

            $scope.upload = function () {

                if (!$scope.data.file) {
                    return;
                }
                var url = serverURL+'users/upload';  //params是model传的参数，图片上传接口的url
                var data = angular.copy({phoneNum:$scope.phoneNum} || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
                // var data = angular.copy({phoneNum:$rootScope.userId} || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
                data.file = $scope.data.file;
                // console.log(data);
                // console.log(data.file);
                Upload.upload({
                    url: url,
                    data: data
                }).progress(function (evt) {
                    //进度条
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progess:' + progressPercentage + '%' + evt.config.file.name);
                }).success(function (data) {
                    $http({
                        method: 'GET',
                        url: serverURL + 'users/getUserIcon/?uId='+$scope.uId,
                    }).then(function (response) {
                        $rootScope.userPhoto001=response.data.userPhoto;
                        $scope.user_icon=serverURL+"/images/userinfo/"+response.data.userPhoto;
                        console.log($scope.user_icon);
                    }, function (data) {
                        console.log(data);
                    });
                }).error(function () {

                    logger.log('error');
                });

            };

            $(document).ready(function(){

                $('.urt-title').click (function() {
                    $(this).addClass("utr-add-color");
                    $(this).prevAll().removeClass("utr-add-color");
                    $(this).nextAll().removeClass("utr-add-color");

                })

            });

        }]
    }
});