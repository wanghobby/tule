/**
 * Created by 94802 on 2017/5/6.
 */
angular.module('writeInfo')
    .directive('writeInfoPage',function () {
        return{
            restrict: "ACE",
            replace: true,
            templateUrl: 'userInfo/writeInfo/writeInfo.template.html',
            controller:['$scope', '$http','personalTool01','$state',function ($scope,$http,personalTool01,$state) {
                var regStatus01;
                var regStatus02;
                var regStatus03;
                var regStatus04;
                var regStatus05;
                var storage = window.sessionStorage;
                var userInfo = storage.getItem("infoSe");
                if(userInfo!=null){
                    var phoneNum = userInfo.split('&')[0]
                }
                //保存的方法
                console.log(phoneNum);
                personalTool01.httpPersonal(phoneNum,function (response) {
                    $scope.uId = response.data[0].uId;
                    $scope.myNickName = response.data[0].nickName;
                    $scope.email = response.data[0].email;
                    $scope.myPhoneNum = response.data[0].phoneNum;
                    $scope.relName = response.data[0].relName;
                    $scope.userPhoto = response.data[0].userPhoto;
                    $scope.jifen = response.data[0].jifen;
                    $scope.idCardNum = response.data[0].idCardNum;

                });

                $scope.isIdCard = function () {

                    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    regStatus01=reg.test($scope.myIdCard);
                    if(reg.test($scope.myIdCard)==false){

                       $('.ch1-main-top-right1').eq(2).text('身份信息有误喔，亲').css('color','red');
                    }else{

                        $('.ch1-main-top-right1').eq(2).text('身份信息正确').css('color','red');


                    }
                }

                $scope.isRealName = function () {
                    var reg =/^[\u4E00-\u9AF5]+$/;
                    regStatus02=reg.test($scope.myRealName);
                    if(reg.test($scope.myRealName)==false){
                        $('.ch1-main-top-right1').eq(1).text('姓名有误喔，亲').css('color','red');
                        regStatus=false;
                    }else{
                        $('.ch1-main-top-right1').eq(1).text('姓名正确').css('color','red');
                        regStatus=true;
                    }
                }
                $scope.isEmail = function () {
                    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                    regStatus03=reg.test($scope.myEmail);
                    if(reg.test($scope.myEmail)==false){
                        $('.ch1-main-top-right1').eq(3).text('邮箱格式不正确喔，亲').css('color','red');
                    }else{
                        $('.ch1-main-top-right1').eq(3).text('邮箱正确').css('color','red');
                    }
                };

                $scope.isNickName = function () {
                    var reg = /[\u4e00-\u9fa5]/;
                    regStatus04=reg.test($scope.myRealName);
                    if(reg.test($scope.myNickName)==false){
                        $('.ch1-main-top-right1').eq(0).text('昵称格式不正确喔，亲').css('color','red');
                    }else{
                        $('.ch1-main-top-right1').eq(0).text('昵称正确').css('color','red');
                    }
                };


                //保存个人的基本信息
                $scope.saveMyInfo = function (e) {

                    var myNickName = $scope.myNickName;
                    var myRealName = $scope.myRealName;
                    var myCard = $scope.myIdCard;
                    var myPhoneNum = $scope.myPhoneNum;
                    var myEmail = $scope.myEmail;
                    if(myNickName==null||myRealName==null||myCard==null||myPhoneNum==null||myEmail==null){
                        //alert('前填写完所有的信息，亲');
                        $(e.target).attr('data-toggle','modal');
                        $(e.target).attr('data-target','.bs-example-modal-sm');

                    }else if((regStatus01||regStatus02||regStatus03||regStatus04)==false){
                        $(e.target).attr('data-toggle','modal');
                        $(e.target).attr('data-target','.bs-example-modal-sm');
                    }else{
                        var myInfoData = {
                            myUid:$scope.uId,
                            myNickName:myNickName,
                            myRealName:myRealName,
                            myCard:myCard,
                            myPhoneNum:myPhoneNum,
                            myEmail:myEmail,
                                //510703199601261213
                                //948021695@qq.com
                            //梁钧
                        };

                        personalTool01.httpSaveMyInfo(myInfoData,function (response) {
                            if(response.data==2){
                                $state.go("userInfoFirst.myInfo",{},{reload:true});
                            }else{
                                alert('更新失败');
                            }
                        });
                        //console.log($scope.uId+myNickName+myRealName+myCard+myEmail);
                    }




                }

            }]
        }
    })