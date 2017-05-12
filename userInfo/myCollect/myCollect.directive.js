/**
 * Created by 94802 on 2017/4/30.
 */
angular.module("myCollect")
.directive("myCollectPage",function () {
    return{
        restrict: "ACE",
        replace: true,
        templateUrl: 'userInfo/myCollect/myCollect.template.html',
        controller:['$scope','$http','personalTool01','$state','$window',function ($scope,$http,personalTool01,$state,$window){
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


            //2.获得uId后，通过uId进行查询，方法在factory里面
            personalTool01.httpPersonalCollect(uId,function (response) {
                       var resCollect = response.data;
                       //如果传过来的有信息
                       if(resCollect.length>0){
                           console.log(response.data+"1111");
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
                               console.log(countAll);
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
                           $scope.turnPage($scope.page_now);
                       }else{
                           $("#true").hide();
                           $("#false").show();
                       }

                //分页的信息
            });

          //删除收藏的信息
            $scope.delete = function () {


                personalTool01.httpPersonalCollectDelete(myU,myC,myE,function (response) {
                    var affected = response.data.affectedRows;
                    console.log(affected==1);
                    if(affected==1){
                        $state.go("userInfoFirst.myCollect",{},{reload:true});
                    }
                })      
            };

            $scope.mctCancel = function () {
                $('#mct_myModal').modal('hide');
            };
            var myU=0;
            var myC=0;
            var myE=0;
            $scope.delete001 = function (uId,carId,eachCarId){
                 myU = uId;
                 myC= carId;
                 myE=eachCarId;


            };

            $scope.turnImageCom01 = function (a,b) {
                var data = {
                    carId:a,
                    eachCarId:b
                }
                $state.go('detailed',{data:JSON.stringify(data)});
            }
        }]
    }
});