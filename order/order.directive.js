/**
 * Created by wang on 2017/4/23.
 */
angular.module("order").
    directive('orderPage', function () {
    return {
        restrict: "ACE",
        replace: true,
        templateUrl: 'order/order.html',
        controller: ['$scope', '$http', '$parse','$stateParams','$state','serverURL','$timeout','personalTool01',function ($scope, $http, $parse,$stateParams,$state,serverURL,$timeout,personalTool01) {

           $scope.data = JSON.parse($stateParams.data);

            $http({
                method:'GET',
                url: serverURL + 'order/getCarInfo?eachCarId='+$scope.data.eachCarId,
            }).then(function (response) {
                $scope.newDate = response.data[0];
                $scope.allprice=$scope.otherCost+$scope.newDate.insurance*$scope.data.dayNu+$scope.newDate.rentPrice*$scope.data.dayNu;
                console.log($scope.newDate)
            }, function (data) {
                console.log(data);
            });
            // $scope.newDate=$scope.newDate1;



            var session =  window.sessionStorage ;
            var loStorage = window.localStorage;
            if(session.getItem('infoSe')!=null){
                var userPhone =session.getItem('infoSe').split('&')[0];
                $scope.uId =session.getItem('infoSe').split('&')[2];
                $scope.phoneNum=userPhone;
                $scope.nickName001 = session.getItem('infoSe').split('&')[1];
            }else if(loStorage!=null){
                var userPhone = loStorage.getItem('info').split('&')[0];
                $scope.uId =loStorage.getItem('info').split('&')[4];
                $scope.phoneNum=userPhone;
                $scope.nickName001 = loStorage.getItem('info').split('&')[2];
            }

            $http({
                method: 'GET',
                url: serverURL + 'order/getRealUser?uId='+$scope.uId,
            }).then(function (response) {
                $scope.user = response.data;

                $scope.relName = $scope.user.relName.substr(0, 1) + '**';
                $scope.idCardNum = $scope.user.idCardNum.substr(0, 1) + '****' + $scope.user.idCardNum.substr(17);
                //从数据库读取车信息
                $http({
                    method: 'get',
                    url: serverURL + 'cars/detailCarInfo?carId=' + $scope.data.carId,
                    data: {},
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
                    $scope.detailCarInfo = response.data.result;
                })

            }, function (data) {
                console.log(data);
            });
            $scope.phoneNum = $scope.phoneNum.substr(0, 3) + '****' + $scope.phoneNum.substr(7);
            $scope.phoneNum1 = $scope.phoneNum

            $(function (){
                $("#example").popover();
                $("#choseCost").popover();
            });

            var flag= true;
           $('#showOthersCost').click(function () {
               $('#othersCost').slideToggle();
               if(flag){
                   $('#openCost').attr('src','images/order/down.png');
                   $('#showOthersCost').css('border-bottom','solid 1px gainsboro');
               }else {
                   $('#openCost').attr('src','images/order/up.png');
                   $('#showOthersCost').css('border-bottom','dashed 1px gainsboro');
               }
               flag=!flag;
           });
            $scope.otherCost=35;
            var flag1= true;
            $scope.noNeedPay=0;
            $('#ischose').click(function () {
                var buji;
                if(flag1){
                    $('#ischose').attr('src','images/order/selectcopy.png');
                    buji=$scope.data.dayNu*50;
                    $scope.noNeedPay=1;
                }else {
                    $('#ischose').attr('src','images/order/select.png');
                    buji=0;
                    $scope.noNeedPay=0;
                }

                $scope.otherCost=buji+35;
                $scope.allprice=$scope.otherCost+$scope.newDate.insurance*$scope.data.dayNu+$scope.newDate.rentPrice*$scope.data.dayNu;
                $scope.$apply();
                flag1=!flag1;
            })

            $http({
                method: 'GET',
                url: serverURL + 'order/getStoreId?name='+$scope.data.nowStore,
            }).then(function (response) {
                console.log(response.data[0].id)
                $scope.rentStormId = response.data[0].id;
            }, function (data) {
                console.log(data);
            });
            $http({
                method: 'GET',
                url: serverURL + 'order/getStoreId?name='+$scope.data.nowReturnStore,
            }).then(function (response) {
                console.log(response.data[0].id)
                $scope.returnStormId = response.data[0].id;
            }, function (data) {
                console.log(data);
            });


            $('#gopay').click(function () {

                var order= $scope.orderInfo={
                    eachCarId:$scope.data.eachCarId,
                    uId:$scope.uId,
                    total:$scope.allprice,
                    rentStormId:$scope.rentStormId,
                    returnStormId:$scope.returnStormId,
                    rentDate:$scope.data.rentDate,
                    backDate:$scope.data.backDate,
                    orderStatus:1,
                    noNeedPay:$scope.noNeedPay,
                    commStatus:0,
                };
                $http({
                    method: 'GET',
                    url: serverURL + 'order/insertOrder?data='+JSON.stringify(order),
                }).then(function (response) {
                    if(response.data==1){
                        $state.go('pay',{flag:true});
                    }
                }, function (data) {
                    console.log(data);
                });

            });
            $('#gopay1').click(function () {
                var order= $scope.orderInfo={
                    eachCarId:$scope.data.eachCarId,
                    uId:$scope.uId,
                    total:$scope.allprice,
                    rentStormId:$scope.data.rentStormId,
                    returnStormId:$scope.data.returnStormId,
                    rentDate:$scope.data.rentDate,
                    backDate:$scope.data.backDate,
                    orderStatus:1,
                    noNeedPay:$scope.noNeedPay,
                    commStatus:0,
                };
                $http({
                    method: 'GET',
                    url: serverURL + 'order/insertOrder?data='+JSON.stringify(order),
                }).then(function (response) {
                    if(response.data==1){
                        $state.go('pay',{flag:false});
                    }
                }, function (data) {
                    console.log(data);
                });
            });

              var regStatus001;
              var regStatus002;
              var regStatus003;
             $scope.isRealName01 = function () {
                 var reg =/^[\u4E00-\u9AF5]+$/;
                 regStatus001=reg.test($('#input001').val());
                 if(reg.test($('#input001').val())==false){
                     $('#tishi01').text('身份信息有误喔，亲').css('color','red');
                 }else{
                     $('#tishi01').text('身份信息正确').css('color','red');
                 }
             };

             $scope.isIdCard01 = function () {
                 var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                 regStatus002=reg.test($('#input002').val());

                 if(reg.test($('#input002').val())==false){
                     $('#tishi02').text('身份证有误喔，亲').css('color','red');
                 }else{
                     $('#tishi02').text('身份证信息正确').css('color','red');
                 }
             };

            $scope.isEmail01 = function () {
                var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                regStatus003=reg.test($('#input003').val());

                if(reg.test($('#input003').val())==false){
                    $('#tishi03').text('邮箱格式不正确喔，亲').css('color','red');
                }else{
                    $('#tishi03').text('邮箱正确').css('color','red');
                }
            }
            
            $scope.wanshan = function () {
                console.log(1111122222222333333333)
                if((regStatus001&&regStatus002&&regStatus003)==true&&$('#input003').val()!=null&&$('#input002').val()!=null&&$('#input001').val()!=null){
                    //myInfo.myNickName,myInfo.myPhoneNum,myInfo.myRealName,myInfo.myCard,myInfo.myEmail,myInfo.myUid
                    var input001 = $('#input001').val();
                    var input002 = $('#input002').val();
                    var input003 = $('#input002').val()
                    var myInfo001 = {
                        myNickName:$scope.nickName001,
                        myPhoneNum:$scope.phoneNum1,
                        myRealName:input001,
                        myCard:input002,
                        myEmail:input003,
                        myUid:$scope.uId
                    }
                    personalTool01.httpSaveMyInfo(myInfo001,function (response) {
                        if(response.data>0){
                                $state.go("order",{},{reload:true});
                        }else{
                            $('#myModalFal001').modal('show');
                        }
                    })
                }else{
                    $('#myModalError001').modal('show');
                }
            }



        }]
    }
});
