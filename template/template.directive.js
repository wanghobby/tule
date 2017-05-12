/**
 * Created by wang on 2017/4/1.
 */
angular.module('templateRent').
    directive('templatePage',function (){
        return{
            restrict : "ACE",
            replace:true,
            templateUrl : 'template/template.html',
            controller:['$scope','$http','$parse','serverURL','$state','$timeout',function ($scope,$http,$parse,serverURL,$state,$timeout) {
               $(document).ready(function () {

                   var index=1;
                   var inter;
                   $scope.loopShow=function (index) {
                       inter=setInterval(function () {
                           if(index>=4){
                               index=1;
                           }else {
                               index++;
                           }
                           $scope.changeImage(index,0);
                       },3000);
                   }
                   $scope.loopShow(index);
                   $scope.changeImage= function(i,f) {
                       $scope.divImage=$('#divImage');
                       $scope.divImage.css('backgroundImage','url("images/index-images/'+i+'.jpg")');
                       $scope.imgs=$('[id^="img0"]');
                       $scope.imgs.eq(i-1).addClass("active").siblings().removeClass("active");

                       if(f==1){                //点击图片后接着点击的下一张自动播放，暂停掉原来的自动播放
                           window.clearInterval(inter);
                           $scope.loopShow(i);
                       }
                   }


                   $http.get("data/index-showCar.json").then(function (response) {
                       $scope.indexCar = response.data;
                       //展示车图片
                       $scope.showCars=$('[class^="show-car"]');
                       for(var i=0;i<$scope.showCars.length;i++){
                           $scope.showCars[i].style.backgroundImage='url("images/index-images/'+$scope.indexCar[i].carPho+'")';
                       }
                   })

               })


                    //从数据库读取展示车信息
                    $http({
                        method: 'get',
                        url: serverURL + 'cars/index',
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
                        $scope.indexShowCar=response.data.result;
                    }, function (data) {
                        console.log(data);
                    });


                    // 从数据库得到城市
                    $http({
                        method: 'get',
                        url: serverURL + 'cars/carCity',
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
                        $scope.rentCarCity=response.data.result;
                        $scope.returnCarCity=response.data.result;
                    }, function (data) {
                        console.log(data);
                    });

                    //取车店铺
                    $scope.$watch('rentCityName', function (newvalue, oldvalue, scope) {
                        var cityId=1;
                        var parseFun = $parse('rentCityName');
                        var t = parseFun(scope);
                        for(k in $scope.rentCarCity){
                            if($scope.rentCarCity[k].city==t){
                                var cityId = $scope.rentCarCity[k].cId;
                            }
                        }
                        if (newvalue !== oldvalue) {
                            $http({
                                method: 'GET',
                                url: serverURL + 'cars/carStore?cId='+cityId,
                            }).then(function (response) {
                                $scope.rentStore = response.data.result;
                            })
                        }else{
                            $http({
                                method: 'GET',
                                url: serverURL + 'cars/carStore?cId='+cityId,
                            }).then(function (response) {
                                $scope.rentStore = response.data.result;

                            });
                        }
                    });
                    //还车店铺
                    $scope.$watch('returnCityName', function (newvalue, oldvalue, scope) {
                        var cityId1=1;
                        var parseFun1 = $parse('returnCityName');
                        var t1 = parseFun1(scope);
                        for(r in $scope.returnCarCity){
                            if($scope.rentCarCity[r].city==t1){
                                var cityId1 = $scope.rentCarCity[r].cId;
                            }
                        }
                        // $scope.rentStorm=[];
                        if (newvalue !== oldvalue) {
                            $http({
                                method: 'GET',
                                url: serverURL + 'cars/carStore?cId='+cityId1,
                            }).then(function (response) {
                                $scope.returnStore= response.data.result;

                            })
                        }else{
                            $http({
                                method: 'GET',
                                url: serverURL + 'cars/carStore?cId='+cityId1,
                            }).then(function (response) {
                                $scope.returnStore = response.data.result;

                            })
                        }
                    });

                    //得到页面上店铺
                    $scope.getRentS=function () {
                        var x=document.getElementById("rentStoreName").selectedIndex;
                        $scope.rentStoreName=$scope.rentStore[x].store;
                    }

                    $scope.getRetuS=function () {
                        var y = document.getElementById("returnStoreName").selectedIndex;
                        $scope.returnStoreName = $scope.returnStore[y].store;

                    }
//点击立即租车按钮
                $scope.indexRentDate=$('#d4315').val();
                $scope.indexBackDate=$('#d4316').val();
                   // console.log($scope.indexRentDate);
                   // console.log($scope.indexBackDate);

                $scope.indexRentBtn=function () {
                    if($scope.rentStoreName==''){
                        $scope.rentStoreName='虹桥机场T2店';
                    }
                    if($scope.returnStoreName==''){
                        $scope.returnStoreName='虹桥机场T2店';
                    }


                    var indexDate={
                        rentCity:$scope.rentCityName,
                        rentStore:$scope.rentStoreName,
                        returnCity:$scope.returnCityName,
                        returnStore:$scope.returnStoreName,
                        rentTime:$scope.indexRentDate,
                        returnTime:$scope.indexBackDate,
                    };

                    if ($scope.indexRentDate!=='' && $scope.indexBackDate!==''){
                        $state.go('shortrent',{indexDate: JSON.stringify(indexDate)})
                    }else if($scope.indexRentDate==''&& $scope.indexRentDate==null ){
                        $('#d4315').css('border','solid 1px red')
                    }else  if($scope.indexBackDate=='' && $scope.indexBackDate==null ){
                        $('#d4316').css('border','solid 1px red')

                    }

                }


                    //日历控件
                    $(document).ready(function () {
                        Date.prototype.Format = function (fmt) { //author: meizz
                            var o = {
                                "M+": this.getMonth() + 1, //月份
                                "d+": this.getDate(), //日
                                "h+": this.getHours(), //小时
                                /*"m+": this.getMinutes(), //分
                                 "s+": this.getSeconds(), //秒
                                 "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                                 "S": this.getMilliseconds() //毫秒*/
                            };
                            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                            for (var k in o)
                                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                            return fmt;
                        }
                        Date.prototype.Format1 = function (fmt,d) { //author: meizz
                            var year=this.getYear()+1900;
                            var month=this.getMonth()+1;
                            var day=this.getDate();
                            var hour=this.getHours();
                            if((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)){
                                if( (month== 1) || (month== 3) || (month== 5) || (month== 7) || (month== 8)|| (month== 10) || (month== 12) ){
                                    if(day+d>31){
                                        month=month+1;
                                        day=(day+d)%31;
                                    }else{
                                        day=day+d;
                                    }
                                }else if((month== 4) || (month== 6) || (month== 9) || (month== 11)){
                                    if(day+d>30){
                                        month=month+1;
                                        day=(day+d)%30;
                                    }else{
                                        day=day+d;
                                    }
                                }else {
                                    if(day+d>29){
                                        month=month+1;
                                        day=(day+d)%29;
                                    }else{
                                        day=day+d;
                                    }
                                }
                            }else{

                                if( (month== 1) || (month== 3) || (month== 5) || (month== 7) || (month== 8)|| (month== 10) || (month== 12) ){

                                    if(day+d>31){
                                        month=month+1;
                                        day=(day+d)%31;
                                    }else{
                                        day=day+d;
                                    }
                                }else if((month== 4) || (month== 6) || (month== 9) || (month== 11)){

                                    if(day+d>30){
                                        month=month+1;
                                        day=(day+d)%30;
                                    }else{
                                        day=day+d;
                                    }
                                }else {
                                    if(day+d>28){
                                        month=month+1;
                                        day=(day+d)%28;
                                    }else{
                                        day=day+d;
                                    }
                                }
                            }
                            var o = {
                                "M+": month, //月份
                                "d+": day, //日
                                "h+": hour, //小时
                                /*"m+": this.getMinutes(), //分
                                 "s+": this.getSeconds(), //秒
                                 "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                                 "S": this.getMilliseconds() //毫秒*/
                            };
                            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                            for (var k in o)
                                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                            return fmt;
                        }

                        var da=4;
                        var time = new Date().Format("yyyy-MM-dd hh:00");
                        var time1 = new Date().Format1("yyyy-MM-dd hh:00",da);
                        $scope.indexRentDate=time;
                        $scope.indexBackDate=time1;
                    })









            }]
        }
    })