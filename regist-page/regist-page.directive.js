/**
 * Created by dell on 2017/4/22.
 */
angular.module('registPage')
    .directive('registPage',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl : 'regist-page/regist-page.template.html',
            controller:['$scope','$http','$state','$rootScope','serverURL','loginTool01',function ($scope,$http,$state,$rootScope,serverURL,loginTool01) {

                document.querySelector('#btnRegistrationAjax').onclick=function () {

                    if((Object.keys($scope.registForm.phoneNum.$error).length===0)&&
                    (Object.keys($scope.registForm.password.$error).length===0)){

                        $http({
                            method: 'POST',
                            url: serverURL + 'users/regist',
                            data: { nickName:$scope.nick_name,phoneNum: $scope.phone_num, password: $scope.pass_word},
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                            transformRequest: function (obj) {
                                var str = [];
                                for (var p in obj) {
                                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                                }
                                return str.join("&");
                            },
                            responseType: 'json'

                        }).then(function (response) {

                            if (response.data.result == 1) {
                                $rootScope.userPhoto001 = 'defaultIcon.png';
                                var myNickName = response.data.name;

                                loginTool01.httpGetUid($scope.phone_num,function (response) {
                                    var uId = response.data.result[0].uId;
                                    var seStorage = window.sessionStorage;
                                    seStorage.setItem('infoSe',$scope.phone_num+"&"+$scope.nick_name+'&'+uId);
                                    $rootScope.isLogin = true;
                                    $rootScope.userId = myNickName;
                                    $state.go('tule',{},{reload:true});
                                });
                                /*personalTool01.httpPersonal($scope.phone_num,function (response) {
                                    console.log(111111111111111111);

                                })*/
                            } else if (response.data.result == 2) {
                                alert('用户已存在');
                            } else if (response.data.result == 3 ||response.data.result == 0) {
                                alert('注册失败');
                            }
                        })
                    }






                //     $.ajax({
                //
                //         url:'http://localhost:3000/users/regist',
                //         type:'POST', //GET
                //         async:true,    //或false,是否异步
                //         data:$('#registForm').serialize(),
                //         timeout:5000,    //超时时间
                //         dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                //
                //         success:function(data,textStatus,jqXHR){
                //
                //             if(data.result==1){
                //                 alert('注册成功');
                //                 $rootScope.isLogin=true;
                //                 $rootScope.userId=$scope.phone_num;
                //                 $state.go('index');
                //
                //             }else if(data.result==2){
                //                 alert('用户已存在');
                //             }else if(data.result==3 ||data.result==0){
                //                 alert('注册失败');
                //             }
                //         },
                //         error:function(xhr,textStatus){
                //             console.log('错误')
                //             console.log(xhr)
                //             console.log(textStatus)
                //         },
                //         complete:function(){
                //             console.log('结束')
                //         }
                //     })
                }
            }]
        }
    });