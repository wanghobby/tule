/**
 * Created by 94802 on 2017/4/27.
 */
angular.module('changePassword').
directive('changePasswordPage', function () {
    return {
        restrict: "ACE",
        replace: true,
        templateUrl: 'userInfo/changePassword/changePassword.template.html',
        controller:['$scope','$http','personalTool01',function ($scope,$http,personalTool01){

            var storage = window.localStorage;
            var seStorage = window.sessionStorage;
            var uId;
            var stoInfo = storage.getItem("info");
            if(stoInfo!=null){
                uId = stoInfo.split("&")[4];
                console.log(uId);
            }//若没有就找sessionStorage,不用判定因为能进来肯定有sessionStorage
            else{
                var seInfo = seStorage.getItem("infoSe");
                if(seInfo!=null){
                    uId = seInfo.split("&")[2];
                }else{
                    alert("系统异常了，亲");
                }
            }
            var getPhoto = storage.getItem('')
                $scope.submit01 = function () {
                   if(($scope.reg01&&$scope.reg02)==true&&$scope.newPass!=null&&$scope.confPass!=null){

                       var arr={
                           uId:uId,
                           oldPas:$scope.newPass,
                           newPas:$scope.confPass
                       };
                       personalTool01.httpUpdatePassword(arr,function (response) {
                           if(response.data==1||response.data==0){
                               console.log('mimammamammam');
                              $('#myModalchaPasSuc').modal('show');
                           }else if(response.data==3){
                               $('#myModalchaPasFal').modal('show');
                           }
                       })
                   }else{
                       $('#myModalError').modal('show');
                   }

                }

           /* $scope.oldPas01 = function () {
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
                console.log(reg.test($scope.oldPass));
                if(reg.test($scope.oldPass)==false){
                    $('.ch-main-top-right').eq(0).text('请输入正确密码格式').css({'color':'red','font-size':'16px'});
                }else{
                    $('.ch-main-top-right').eq(0).text('格式正确').css({'color':'red','font-size':'16px'});
                }
            }*/

            $scope.reg01;
            $scope.reg02;
            $scope.newPas01 = function () {
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
                console.log(reg.test($scope.newPass));
                if(reg.test($scope.newPass)==false){
                    $scope.reg01=false;
                    $('.ch-main-top-right').eq(0).text('请输入正确密码格式').css({'color':'red','font-size':'16px'});
                }/*else if($scope.oldPass==$scope.newPass){
                    $('.ch-main-top-right').eq(1).text('不能与原密码一致').css({'color':'red','font-size':'16px'});
                }*/else{
                    $scope.reg01=true;
                    $('.ch-main-top-right').eq(0).text('格式正确').css({'color':'red','font-size':'16px'});
                }
            }

            $scope.checkPas01= function () {
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
                console.log(reg.test($scope.confPass));
                if(reg.test($scope.confPass)==false){
                    $scope.reg02=false;
                    $('.ch-main-top-right').eq(1).text('请输入正确密码格式').css({'color':'red','font-size':'16px'});
                }else if($scope.confPass!=$scope.newPass){
                    $scope.reg02=false;
                    $('.ch-main-top-right').eq(1).text('两次输入密码不同 ').css({'color':'red','font-size':'16px'});
                }
                else{
                    $scope.reg02=true;
                    $('.ch-main-top-right').eq(1).text('格式正确').css({'color':'red','font-size':'16px'});;
                }
            }
        }]
    }
});