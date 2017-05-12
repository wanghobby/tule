/**
 * Created by dell on 2017/4/22.
 */
angular.module('loginPage')
    .directive('loginPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'login-page/login-page.template.html',
            controller: ['$scope', '$http', '$state', '$rootScope', 'serverURL', 'loginTool01','$stateParams','$timeout',function ($scope, $http, $state, $rootScope, serverURL, loginTool01,$stateParams,$timeout) {
                //sessionStorage
                var seStorage = window.sessionStorage;
                var fromPath = seStorage.getItem("fromPath");

                var dOfMs = (24 * 60 * 60 * 1000);
                var mydate = new Date();
                var headway = (mydate.getTime() / (24 * 60 * 60 * 1000)).toFixed(2);
                var Ischecked = $("input:checkbox").is(':checked');
                $("#autoLogin").click(function () {
                    Ischecked = !Ischecked;
                });

                var storage = window.localStorage;
                //检测storage是否存在
                var info = storage.getItem("info");
                if (info != null) {
                    //取出storage
                    var arrInfo = info.split("&");
                    var deposit = arrInfo[3];
                    console.log(deposit);
                    console.log(headway);
                    //判断时间
                    if ((headway - deposit) < 7) {
                        $scope.phone_num = arrInfo[0];
                        $scope.pass_word = arrInfo[1];
                        console.log($scope.phone_num)
                        loginTool01.httpLogin(Ischecked,{
                            phoneNum: $scope.phone_num,
                            password: $scope.pass_word
                        }, function (response){
                            console.log(response);
                            if (response.data.result == 1) {
                                $rootScope.isLogin = true;
                                //是否点击30天登录
                                //没有点击直接登录的情况
                                storage.setItem("info",$scope.phone_num+"&"+$scope.pass_word+"&"+deposit+"&"+response.data.uId);
                                $state.go('tule');
                            }else if(response.data.result==0){
                                alert('用户不存在');
                            }else if(response.data.result==2){
                                alert('密码错误');
                            }else if(response.data.result==3){
                                alert('用户名不合法');
                            }


                        });//end of httplogin

                    }
                }
                document.querySelector('#btnLoginAjax').onclick = function () {
                    if (Object.keys($scope.loginForm.phoneNum.$error).length === 0) {
                        loginTool01.httpLogin(Ischecked,{
                            phoneNum: $scope.phone_num,
                            password: $scope.pass_word
                        }, function (response){
                            console.log(response);
                            if (response.data.result == 1) {
                                $rootScope.isLogin = true;
                                $rootScope.userId=response.data.name;
                                $rootScope.phoneNum = $scope.phone_num;
                                // console.log(response.data.userPhoto)
                                // console.log("here.........................");
                                // console.log(response.data);
                                //是否点击30天登录
                                //没有点击直接登录的情况
                                if(Ischecked==true) {
                                    storage.setItem("info", $scope.phone_num + "&" + $scope.pass_word + "&"+response.data.name+"&"+headway+"&"+response.data.uId+"&"+response.data.userPhoto);
                                }
                                var fromPath = seStorage.getItem("fromPath");
                                // console.log(fromPath);
                                if(fromPath!=null){
                                    $rootScope.userPhoto001 = response.data.userPhoto;
                                    seStorage.setItem("infoSe",$scope.phone_num +"&"+response.data.name+"&"+response.data.uId+"&"+response.data.userPhoto);
                                    if(fromPath=='order'){
                                        $scope.data = JSON.parse($stateParams.data);
                                            $state.go(fromPath,{data: JSON.stringify($scope.data)},{reload:true});
                                    }else if(fromPath=='detailed'){
                                        $scope.data = JSON.parse($stateParams.data);
                                            $state.go(fromPath,{data: JSON.stringify($scope.data)},{reload:true});
                                    }else {
                                            $state.go(fromPath.split("/")[1],{},{reload:true});
                                    }
                                }else{
                                        $state.go('tule',{},{reload:true});
                                }

                            }else if(response.data.result==0){
                                alert('用户不存在');
                            }else if(response.data.result==2){
                                alert('密码错误');
                            }else if(response.data.result==3){
                                alert('用户名不合法');
                            }


                        })




                    }


                    //     $.ajax({
                    //         url:'http://localhost:3000/users/login',
                    //         type:'POST', //GET
                    //         async:true,    //或false,是否异步
                    //         data:$('#loginForm').serialize(),
                    //         timeout:5000,    //超时时间
                    //         dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                    //
                    //         success:function(data,textStatus,jqXHR){
                    //             if(data.result==1){
                    //                 $rootScope.isLogin=true;
                    //                 $rootScope.userId=$scope.phone_num;
                    //                 $state.go('index');
                    //             }else if(data.result==0){
                    //                 alert('用户不存在');
                    //             }else if(data.result==2){
                    //                 alert('密码错误');
                    //             }else if(data.result==3){
                    //                 alert('用户名不合法');
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