/**
 * Created by 94802 on 2017/5/2.
 */
angular.module("myComment")
    .filter("timeChoose02",function () {
        return function (newArr,searchSta,searchEnd) {
            if(searchSta==null||searchEnd==null){

                return newArr
            }else{
                console.log(newArr.length);
                var latestArr=[];
                for(var i =0;i<newArr.length;i++){
                    if(newArr[i].collTime>searchSta && newArr[i].collTime<searchEnd){
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
                    if(newArr[i].collTime>searchSta && newArr[i].collTime<searchEnd){
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
 .directive("myCommentPage",function () {
     return{
         restrict:"ACE",
         replace: true,
         templateUrl: 'userInfo/myComment/myComment.template.html',
         controller:['$scope','$http','personalTool01','$filter','$state',function ($scope,$http,personalTool01,$filter,$state) {
             //1.获得uId,先查找看是否有localStorage


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

             personalTool01.httpGetCom(uId,function (response) {
                 var resCollect = response.data;
                 $scope.allInfo = response.data;
                 console.log(resCollect);
                 //如果传过来的有信息
                 if(resCollect.length>0){
                     $("#showPage").show();
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
                 }else{
                     $("#true").hide();
                     $("#false").show();
                 }


             });
             //为查询获得时间
             $scope.searchComment = function (){
                 $scope.searchSta = $("#d4313").val();
                 $scope.searchEnd = $("#d4314").val();
                 $scope.onChangeSer01 = {
                     sta:$scope.searchSta,
                     end:$scope.searchEnd
                 };
             };
             //获得全部的评论
            $scope.getAllCom =function () {
                $scope.part=$scope.allInfo;
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
            };

             //时间筛选器
             $scope.$watch('onChangeSer01',function () {

                 $scope.part = $scope.allInfo;
                 console.log(111111111111111111);
                 console.log($scope.part);
                 $scope.part = $filter("timeChoose02")($scope.part,$scope.searchSta,$scope.searchEnd);
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
             
             //点击更多
             var isMore = false;
             $scope.clickMore = function (e,content) {
                 isMore = !isMore;
                 if(isMore==true)
                 {
                     $(e.target).prevAll().text(content);
                     $(e.target).text('收起');
                 }else{
                     $(e.target).prevAll().text(content.substring(0,99));
                     $(e.target).text('更多');
                     }


             }
             
             $scope.turnImageCom = function (a,b) {
                 var data = {
                     carId:a,
                     eachCarId:b
                 }
                 $state.go('detailed',{data:JSON.stringify(data)});
             }

             $scope.getOrder01 = function () {


             }

         }]
     }
 });