/**
 * Created by 94802 on 2017/5/4.
 */
angular.module('repeatFinish').
    directive("repeatFinishPage",function ($timeout) {
        return {
            restrict: "ACE",
           /* link:function (scope,elm,attr) {
              if(scope.$last===true){
                  $timeout(function () {
                      console.log($('#starCom1').children().length);
                  })

              }
            },*/
            controller:['$scope',function ($scope) {
                if($scope.$last===true) {
                    var newArr = $scope.partNew;
                    $timeout(function () {
                        for(var i=0;i<newArr.length;i++){
                            var score = newArr[i].grade;
                            if(score>0){
                               //console.log($('#starCom'+newArr[].orderId).length);
                                $('#starCom'+newArr[i].orderId).children().eq(score-1).css("background-image","url(./images/personal-img/yellowStar.png)");
                                $('#starCom'+newArr[i].orderId).children().eq(score-1).prevAll().css("background-image","url(./images/personal-img/yellowStar.png)");
                            }

                        }
                        //
                        console.log($('#starCom17012211').children().length);})
                }
            }]
        }
    }
 );
