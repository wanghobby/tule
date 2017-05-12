/**
 * Created by 94802 on 2017/5/6.
 */
angular.module('orderDatail')
    .directive('orderDatailPage',function () {
        return{
            restrict: "ACE",
            replace: true,
            templateUrl: 'userInfo/orderDetail/orderDetail.template.html',
            controller:['$scope','$http','$stateParams','personalTool01','$state',function ($scope,$http,$stateParams,personalTool01,$state) {
                       var receOid = $stateParams.oId;
                    $(".der-top-middle-bottom-text03").click(function(){
                        $(".der-top-middle-bottom-text04").toggle();
                        $(".der-top-middle-bottom-text03-image02").toggle();
                        $(".der-top-middle-bottom-text03-image01").toggle();
                    });

                personalTool01.httpGetInfoByOid(receOid,function (response) {
                        var getInfo = response.data[0];
                        console.log(response.data[0]);
                        $scope.oId = getInfo.oId;
                        $scope.days = getInfo.days;
                        $scope.rentTime = getInfo.rentTime;
                        $scope.rentAdd = getInfo.rentStore;
                        $scope.returnTime = getInfo.returnTime;
                        $scope.returnAdd = getInfo.returnStore;
                        $scope.carName = getInfo.carName;
                        $scope.carSize = getInfo.carSize;
                        $scope.sitNum = getInfo.sitNum;
                        $scope.rentPrice = getInfo.rentPrice;
                        $scope.insurance = getInfo.insurance;
                        $scope.total = getInfo.total;
                        $scope.orderStatus = getInfo.orderStatus;
                        $scope.output = getInfo.output;
                        $scope.realName = getInfo.relName;
                    console.log(123);
                    console.log($scope.output);


                  });


                $scope.turnCenter = function () {
                    $state.go("userInfoFirst.shortRent",{},{reload:true});
                };


                $('.der-top-middle-table-tr01-text').click(function () {
                    console.log(111);
                    $('.der-container-modal-box').show();
                    $('.der-container').css('opacity','0.5');
                });
                document.querySelector('.der-container-modal-box-div-delete').onclick=function () {
                    document.querySelector('.der-container-modal-box').style.display='none';
                    document.querySelector('.der-container').style.opacity='1';

                };

                /*************点击事件方法的集合***************/
                //1.取消订单
                $scope.cancelOrder = function () {
                      var cancelOid  = $scope.oId;

                      personalTool01.httpCanOrderByOid(cancelOid,function (response) {
                         if(response.data.affectedRows==1){
                             $('#myModalCancelsuc').modal('show');
                             $state.go("userInfoFirst.shortRent",{},{reload:true});
                         }else{
                             $('#myModalCancelfal').modal('show');
                         }
                      })

                }


            }]
        }
})