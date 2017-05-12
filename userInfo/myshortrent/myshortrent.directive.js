/**
 * Created by wang on 2017/4/23.
 */
angular.module('myShortRent')
    .filter("status01",function () {
        return function (newArr,value,all) {
            if(value==null||value==""){
                return newArr;
            }else if(value=="全部"){
                return all;
            }else{
                console.log("1......");
                var latestArr=[];
                for(var i =0;i<newArr.length;i++){
                    if(newArr[i].orderStatus==value){
                        latestArr.push(newArr[i]);
                    }
                }
                return latestArr;
            }
        }
    })
    .filter("timeChoose01",function () {
        return function (newArr,searchSta,searchEnd) {
            if(searchSta==null||searchEnd==null){
                console.log("hahahahaha");
                return newArr
            }else{
                var latestArr=[];
                for(var i =0;i<newArr.length;i++){
                    if(newArr[i].orderTime>searchSta && newArr[i].orderTime<searchEnd){
                        latestArr.push(newArr[i]);
                    }
                }
                return latestArr;
            }
        }
    })
    /*.filter("timeChoose",function ($timeout) {
        return function (newArr,searchSta,searchEnd) {
            console.log(newArr.length);
            if(newArr.length>0){
                $("#showPage").show();
                $("#qwer").show();
                $("#false").hide();
            }else{
                $("#qwer").hide();
                $("#showPage").hide();
                $("#false").show();
            }
            if(searchSta==null||searchEnd==null){
               return newArr;
            }else{
                var latestArr=[];
                for(var i =0;i<newArr.length;i++){
                    if(newArr[i].orderTime>searchSta && newArr[i].orderTime<searchEnd){
                        latestArr.push(newArr[i]);
                    }
                }
                if(latestArr.length>0){
                    $("#showPage").show();
                    $("#qwer").show();
                    $("#false").hide();
                }else{
                    $("#qwer").hide();
                    $("#showPage").hide();
                    $("#false").show();
                }
                return latestArr;
            }
        }
    })*/
    .directive('myShortRentPage', function () {
    return {
        restrict: "ACE",
        replace: true,
        templateUrl: 'userInfo/myshortrent/myshortrent.template.html',
        controller: ['$scope', '$http', 'personalTool01','$filter','$state','$timeout',function ($scope, $http, personalTool01,$filter,$state,$timeout) {

            var storage = window.localStorage;
            var seStorage = window.sessionStorage;
            var uId;
            var stoInfo = storage.getItem("info");
            if (stoInfo != null) {
                uId = stoInfo.split("&")[4];
                console.log(uId);
            }//若没有就找sessionStorage,不用判定因为能进来肯定有sessionStorage
            else {
                var seInfo = seStorage.getItem("infoSe");
                if (seInfo != null) {
                    uId = seInfo.split("&")[2];
                } else {
                    alert("系统异常了，亲");
                }
            }
            var scoreNum = $scope.scoreNum = {};
            $scope.num = 10;

            //通过uid来进行查找
            personalTool01.httpGetOrderByUid(uId, function (response) {
                var resCollect = response.data;
                $scope.allInfo =response.data;
                console.log($scope.allInfo);
                console.log(resCollect);

                    $scope.part  = resCollect;
                    $scope.partNew = [];
                    $scope.page_now = 1;
                    //每页的评论条数
                    var page_ave = 5;
                    //默认总的页数
                    var page_count = 1;
                    var page_dis = 0;
                    var sta = 0;
                    var end;
                    $scope.turnPage = function turnPage(page_now) {
                        $scope.part_count = [];
                        //获取总的数据量
                        var countAll = $scope.part.length;
                        //获取总的页数
                        page_count = Math.ceil(countAll / page_ave);
                        if (page_now < 1) {
                            $scope.page_now = 1;
                        } else if(page_now>page_count) {
                            $scope.page_now = page_count;
                        }else{
                            $scope.page_now = page_now;
                        }
                        if ($scope.page_now == 1) {
                            document.querySelector("#backPage").style.cursor = "not-allowed";
                            document.querySelector("#backPage").style.opacity = "0.3";
                        }else{

                            document.querySelector("#backPage").style.cursor = "pointer";
                            document.querySelector("#backPage").style.opacity = "1";
                        }

                        if ($scope.page_now == page_count) {
                            document.querySelector("#goPage").style.cursor = "not-allowed";
                            document.querySelector("#goPage").style.opacity = "0.3";
                        }else{
                            document.querySelector("#goPage").style.cursor = "pointer";
                            document.querySelector("#goPage").style.opacity = "1";
                        }
                        //当前页的显示数据
                        if (countAll == 0) {
                            page_dis = 0;
                        } else {
                            if (countAll % 5 == 0)
                                page_dis = 5;
                            else {
                                page_dis = countAll % 5
                            }
                        }
                        //将数据定位到数组的指定位置
                        sta = ($scope.page_now - 1) * 5;
                        if ($scope.page_now == page_count) {
                            end = ($scope.page_now - 1) * 5 + page_dis;
                        } else {
                            end = ($scope.page_now - 1) * 5 + 5;
                        }


                        //显示新的数组
                        $scope.partNew = $scope.part.slice(sta, end);
                        //将页数总数放入数组里面
                        if(page_count<3){
                            for (var i = 0; i < page_count; i++) {
                                $scope.part_count[i] =i+1 ;
                            }
                        }else {
                            if (($scope.page_now + 2) >= page_count) {

                                for (var i = 0; i <= 2; i++) {
                                    $scope.part_count[i] = i + page_count - 2;
                                }
                            } else {
                                for (var i = 0; i <= 2; i++) {
                                    $scope.part_count[i] = $scope.page_now + i;
                                }
                            }
                        }
                    };
                    //
                    $scope.turnPage($scope.page_now);
                if($scope.partNew.length>0){
                    $("#showPage").show()
                }else{
                    $("#qwer").hide();
                    $("#false").show();
                }
/*
            if(resCollect.length>0){}
                else{
                    $("#qwer").hide();
                    $("#false").show();
                }
                $("#showPage").show();*/


            });

            //点击冒泡事件

            $('#qwer').click(function (e) {

                /* var res = 'scoreNum'+e.target.id.substr(4,8).toString();
                 $scope[res]=1;*/
                $('#show' + e.target.id).slideToggle();
                $('#show' + e.target.id).parent().siblings().children("div").slideUp();

            });

            //点击冒泡事件01

            $scope.score = function (event, oId) {
                var eventGet = event.target;
             
                var getEle = $('#showcomm' + oId + ' li');
                var len = getEle.length;
                for (var i = 0; i <= len - 1; i++) {
                    if (getEle[i] == $(eventGet).parent()[0]) {
                        scoreNum[oId] = i + 1;
                        getEle.eq(i).children().attr("src", "images/personal-img/yellowStar.png");
                        getEle.eq(i).prevAll().children().attr("src", "images/personal-img/yellowStar.png");
                        getEle.eq(i).nextAll().children().attr("src", "images/personal-img/whiteStar.png");
                    }
                }
            };

            var myOid01=0;
            var myCarId01=0;
            var myEachCarId01=0;
            $scope.submit = function (oId,carId,eachCarId) {
                var scorePoint = scoreNum[oId];
                myOid01=oId;
                myCarId01=carId;
                myEachCarId01=eachCarId;
                var context = $("#mycomment" + oId).val();
                personalTool01.httpPutComment(uId, oId,scorePoint,context,function (response) {
                             if(response.data.affectedRows==1){
                                 personalTool01.httpUpdateOrderStaus(oId,function (response) {
                                     if(response.data.affectedRows==1){
                                         // $state.go("userInfoFirst.shortRent",{},{reload:true});
                                         $('#myModalCom').modal('show');
                                         $("#showcomm"+oId).slideUp();
                                         $("#comm"+oId).text("已评价");
                                         $("#comm"+oId).css('cursor','not-allowed');

                                     }else{
                                         $('#myModalComFal').modal('show');
                                     }
                                 })
                                /* $state.go("detailed",{},{reload:true});*/

                             }else{
                                 $('#myModalComFal').modal('show');
                             }
                });
            };




              $scope.value=0;
            $scope.getStatus = function (event) {
                 var text = $(event.target).text();
                $(event.target).css({'background-color':"#FABE00","color":"white"});
                $(event.target).unbind("mouseenter").unbind("mouseleave");
                $(event.target).siblings().css({'background-color':"#F8F8FA","color":"#AC93A9"});
                $(event.target).siblings().hover(function () {
                        $(this).css({'background-color':"#FABE00","color":"white"});
                    },function () {
                        $(this).css({'background-color':"#F8F8FA","color":"#AC93A9"});
                    }
                );
                 $scope.value = text;

            };

            $scope.searchTime = function (){
                $scope.searchSta = $("#d4313").val();
                $scope.searchEnd = $("#d4314").val();
                $scope.onChangeSer = {
                    sta:$scope.searchSta,
                    end:$scope.searchEnd
                };
            };

           //newVal 为value变化后的值
           $scope.$watch('value',function (newVal) {
               $scope.part = $scope.allInfo;
               if(newVal=="全部"){
                   $scope.part = $filter("status01")($scope.part,newVal,$scope.allInfo);
                   if($scope.part.length<=0){
                       $("#qwer").hide();
                       $("#showPage").hide();
                       $("#false").show();
                   }else{
                       $("#showPage").show();
                       $("#qwer").show();
                       $("#false").hide();
                   }
                   $scope.turnPage(1);
               }else{
                   $scope.part = $filter("status01")($scope.part,newVal,$scope.allInfo);
                   $scope.part = $filter("timeChoose01")($scope.part,$scope.searchSta,$scope.searchEnd);
                   if($scope.part.length<=0){
                       $("#qwer").hide();
                       $("#showPage").hide();
                       $("#false").show();
                   }else{
                       $("#showPage").show();
                       $("#qwer").show();
                       $("#false").hide();
                   }
                   console.log($scope.part.length);
                   $scope.turnPage(1);
               }

           });

            $scope.$watch('onChangeSer',function () {
                $scope.part = $scope.allInfo;
                console.log($scope.value);
                $scope.part = $filter("status01")($scope.part,$scope.value,$scope.allInfo);
                $scope.part = $filter("timeChoose01")($scope.part,$scope.searchSta,$scope.searchEnd);
                if($scope.part.length<=0){
                    $("#qwer").hide();
                    $("#showPage").hide();
                    $("#false").show();
                }else{
                    $("#showPage").show();
                    $("#qwer").show();
                    $("#false").hide();
                }
                $scope.turnPage(1);
            });

            //5.8新添方法
            $scope.toogle = function () {
                var data = {
                    carId:myCarId01,
                    eachCarId:myEachCarId01
                };
             $('#myModalCom').modal('hide');
                setTimeout(function () {
                    $state.go("detailed",{data:JSON.stringify(data)},{reload:true});
                    console.log(123123);
                },1000);

             /*   $('#myModalCom').hide()*/

            };

        }]

    }
});