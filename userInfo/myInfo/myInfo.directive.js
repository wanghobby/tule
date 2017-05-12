/**
 * Created by 94802 on 2017/4/27.
 */
angular.module('myInfo').
directive('myInfoPage', function () {
    return {
        restrict: "ACE",
        replace: true,
        templateUrl: 'userInfo/myInfo/myInfo.template.html',
        controller:['$scope','$http','serverURL','$rootScope','personalTool01','$state',function ($scope,$http,serverURL,$rootScope,personalTool01,$state){
         //从session中读取phoneNum

            var storage = window.sessionStorage;
            var locStorage = window.localStorage;
            var userInfo = storage.getItem("infoSe");
            var userInfo01 = locStorage.getItem('info');
            if(userInfo!=null){
                var phoneNum = userInfo.split('&')[0]
            }else if(userInfo01!=null){
                var phoneNum = userInfo01.split('&')[0]
            }



            //保存的方法
            $scope.upDateInfo = function() {
                //获取修改后的信息
                var nowPhoneNum = $scope.phoneNum;
                var nowNickName =  $scope.nickName;
                var nowEmail = $scope.email;
                var nowUid = $scope.uId;
                var data = {uId:nowUid,phoneNum:nowPhoneNum,nickName:nowNickName,email:nowEmail};
                personalTool01.httpPersonalSave(JSON.stringify(data),function (response) {
                    if(response.data.affectedRows==2){
                        /*storage.setItem('infoSe',nowPhoneNum +"&"+nowNickName+"&"+nowUid);*/
                        $rootScope.userId = nowNickName;
                        $state.go('userInfoFirst.myInfo',{},{reload:false});
                        alert("修改成功");
                    }else{
                        alert("修改失败");
                    }
                })
            };

            personalTool01.httpPersonal(phoneNum,function (response) {

                 if(response.data[0].idCardNum==null||response.data[0].idCardNum==''||response.data[0].relName==null||response.data[0].relName==''){
                      $state.go("userInfoFirst.writeInfo",{},{reload:true});
                 }else{

                     $scope.uId = response.data[0].uId;
                     $scope.nickName = response.data[0].nickName;
                     $scope.email = response.data[0].email;
                     $scope.phoneNum = response.data[0].phoneNum;
                     $scope.relName = response.data[0].relName;
                     $scope.userPhoto = response.data[0].userPhoto;
                     $scope.jifen = response.data[0].jifen;
                     $scope.idCardNum = response.data[0].idCardNum;
                 }
               /* console.log(response.data[0].email);
                console.log($scope.phoneNum.substr(0,3)+"****"+$scope.phoneNum.substr(7,10));
                console.log(response.data[0].uId);*/
            });
            console.log('-----------');
            console.log(phoneNum);
            console.log($scope.nickName)


            //向服务器发送请求信息
          /*  personalTool01.httpPersonal();*!/*/
            //头像
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
                }).success(function (data) {
                    console.log('here');
                    console.log(data.result);
                    // $scope.hide(data);
                }).error(function () {

                    logger.log('error');
                });

            };




            document.querySelector('.ch1-change-phone').onclick=function () {
                document.querySelector('.ch1-change-ph-content').style.display='block';
                document.querySelector('.ch1-change-phone').style.display='none';
                document.querySelector('.ch1-change-phone1').style.display='block';

            };
            document.querySelector('.ch1-change-phone1').onclick=function () {
                document.querySelector('.ch1-change-ph-content').style.display='none';
                document.querySelector('.ch1-change-phone1').style.display='none';
                document.querySelector('.ch1-change-phone').style.display='block';
            };

        }]
    }
});