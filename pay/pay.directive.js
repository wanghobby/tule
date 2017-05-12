/**
 * Created by wang on 2017/5/7.
 */
angular.module("pay").
directive('payPage', function () {
    return {
        restrict: "ACE",
        replace: true,
        templateUrl: 'pay/pay.templant.html',
        controller: ['$scope', '$http', '$parse', '$stateParams', '$state', 'serverURL', '$timeout', function ($scope, $http, $parse, $stateParams, $state, serverURL, $timeout) {
            $(document).ready(function () {
                $('.pay-container-main-middle-middle').on('click','div',function () {
                    $('#'+this.id).addClass("pay-container-main-middle-middle-chose")
                        .children().addClass("pay-container-main-img-chose");
                    $('#'+this.id).siblings('div').removeClass("pay-container-main-middle-middle-chose")
                        .children().removeClass("pay-container-main-img-chose");
                })
            });



            document.querySelector('.pay-container-main-ing01').onclick=function () {
                document.querySelector('.pay-container-main-table').style.display='block';
                document.querySelector('.pay-container-main-ing01').style.display='none';
                document.querySelector('.pay-container-main-ing02').style.display='block';
            };
            document.querySelector('.pay-container-main-ing02').onclick=function () {
                document.querySelector('.pay-container-main-table').style.display='none';
                document.querySelector('.pay-container-main-ing01').style.display='block';
                document.querySelector('.pay-container-main-ing02').style.display='none';
            };



            document.querySelector('.pay-container-main-radio01').onclick=function () {
                document.querySelector('.pay-container-main-middle-middle-sp02').style.display='none';
                document.querySelector('.pay-container-main-middle-middle-sp03').style.display='none';
                document.querySelector('.pay-container-main-middle-middle-sp04').style.display='none';
                var a=document.querySelector('.pay-container-main-price01 span').innerHTML;
                document.querySelector('.pay-container-main-text05').innerHTML=a;
            };
            document.querySelector('.pay-container-main-radio02').onclick=function () {
                document.querySelector('.pay-container-main-middle-middle-sp02').style.display='inline-block';
                document.querySelector('.pay-container-main-middle-middle-sp03').style.display='inline-block';
                document.querySelector('.pay-container-main-middle-middle-sp04').style.display='inline-block';
                var a=document.querySelector('.pay-container-main-price02 span').innerHTML;
                document.querySelector('.pay-container-main-text05').innerHTML=a;
            };

           if($stateParams.flag){
               document.querySelector('.pay-container-main-middle-middle-sp02').style.display='none';
               document.querySelector('.pay-container-main-middle-middle-sp03').style.display='none';
               document.querySelector('.pay-container-main-middle-middle-sp04').style.display='none';
               var a=document.querySelector('.pay-container-main-price01 span').innerHTML;
               document.querySelector('.pay-container-main-text05').innerHTML=a;
           }else{
               document.querySelector('.pay-container-main-middle-middle-sp02').style.display='inline-block';
               document.querySelector('.pay-container-main-middle-middle-sp03').style.display='inline-block';
               document.querySelector('.pay-container-main-middle-middle-sp04').style.display='inline-block';
               var a=document.querySelector('.pay-container-main-price02 span').innerHTML;
               document.querySelector('.pay-container-main-text05').innerHTML=a;
           }

           $scope.close001 =function () {
               $('#myModal1').modal('hide');
               setTimeout(function () {
                   $state.go('tule',{},{reload:true})
               },1000);


           }

        }]
    }});