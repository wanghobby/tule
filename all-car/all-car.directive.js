/**
 * Created by 94802 on 2017/4/23.
 */
angular.module("allCar")
    .directive('allCarPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: "all-car/all-car.template.html",
            controller: ['$scope', '$rootScope', '$stateParams', '$state', '$http', 'serverURL', '$parse','$timeout',function ($scope, $rootScope, $stateParams, $state, $http, serverURL,$parse,$timeout) {

                $scope.data = JSON.parse($stateParams.data);
                $scope.carId=$scope.data.carId;
                $scope.eachCarId=$scope.data.eachCarId;
                console.log(typeof ($scope.data.nowStore));
                console.log($scope.data.eachCarId);
                if(typeof ($scope.data.nowStore)=='string'){
                // if($scope.data.nowStore==''||$scope.data.rentCity==''||$scope.data.returnCity==''||$scope.data.nowReturnStore==''|| $scope.data.rentDate==''||$scope.data.backDate==''){
                    $scope.nowStore=$scope.data.nowStore;
                    $scope.rentCity=$scope.data.getCity;
                    $scope.returnCity=$scope.data.returnCity;
                    $scope.nowReturnStore=$scope.data.nowReturnStore;
                    $scope.rentDate=$scope.data.rentDate;
                    $scope.backDate=$scope.data.backDate;
                    var time1=new Date($scope.backDate);
                    var time2=new Date($scope.rentDate);
                    var time = time1-time2;
                    $scope.dayNu = Math.ceil(time/(24*60*60*1000));
                    $http({
                        method: 'GET',
                        url: serverURL + 'cars/getCarInfo?eachCarId='+$scope.eachCarId,
                    }).then(function (response) {
                        $scope.carInfo = response.data;
                        $scope.insurance=$scope.carInfo[0].insurance;
                        $scope.rentPrice=$scope.carInfo[0].rentPrice;
                        $scope.total=($scope.rentPrice+$scope.insurance)*$scope.dayNu;
                    }, function (data) {
                        console.log(data);
                    });

                }else{
                    $scope.nowStore='未选定';
                    $scope.rentCity='未选定';
                    $scope.returnCity='未选定';
                    $scope.nowReturnStore='未选定';
                    $scope.rentDate='未选定';
                    $scope.backDate='未选定';
                    $scope.dayNu = 0;
                    $http({
                        method: 'GET',
                        url: serverURL + 'cars/getCarInfo?eachCarId='+$scope.eachCarId,
                    }).then(function (response) {
                        $scope.carInfo = response.data;
                        console.log($scope.carInfo);
                        $scope.insurance=$scope.carInfo[0].insurance;
                        $scope.rentPrice=$scope.carInfo[0].rentPrice;
                        $scope.total=($scope.rentPrice+$scope.insurance)*$scope.dayNu;

                    }, function (data) {
                        console.log(data);
                    });



                }


                $(document).ready(function () {
//第一块

                    //从数据库得到carId的所有评论
                    $.ajax({
                        url: serverURL + 'cars/carIdComm',
                        type: 'get', //GET
                        async: true,    //或false,是否异步
                        data: {carId: $scope.carId},
                        timeout: 5000,    //超时时间
                        dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                        success: function (data, textStatus, jqXHR) {
                            $scope.car = data.result;
                            if ($scope.car.length !== 0) {
                                $scope.commLength = data.result.length;
                                $scope.part = $scope.car;
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
                                    } else if (page_now > page_count) {
                                        $scope.page_now = page_count;
                                    } else {
                                        $scope.page_now = page_now;
                                    }
                                    if ($scope.page_now == 1) {
                                        document.querySelector("#backPage").style.cursor = "not-allowed";
                                        document.querySelector("#backPage").style.opacity = "0.3";
                                    } else {

                                        document.querySelector("#backPage").style.cursor = "pointer";
                                        document.querySelector("#backPage").style.opacity = "1";

                                    }

                                    if ($scope.page_now == page_count) {

                                        document.querySelector("#goPage").style.cursor = "not-allowed";
                                        document.querySelector("#goPage").style.opacity = "0.3";

                                    } else {

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
                                    if (page_count < 3) {
                                        for (var i = 0; i < page_count; i++) {
                                            $scope.part_count[i] = i + 1;
                                        }
                                    } else {
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
                                //从数据库得到carId的总评分
                                $.ajax({
                                    url: serverURL + 'cars/carCommGrade',
                                    type: 'get', //GET
                                    async: true,    //或false,是否异步
                                    data: {carId: $scope.carId},
                                    timeout: 5000,    //超时时间
                                    dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                                    success: function (data, textStatus, jqXHR) {
                                        $scope.carCommGrade = data.result[0].carGrade;
                                        // $scope.carIdAvgGrade=4.9;
                                        $scope.carIdAvgGrade = parseFloat(($scope.carCommGrade / $scope.commLength).toFixed(1));
                                        var starBackWid = $('.gradeStar-bg').width();
                                        // console.log(starBackWid+'star')
                                        var starOverWid = parseInt(($scope.carIdAvgGrade / 5) * starBackWid)
                                        $('#gradeStar-over').width(starOverWid);
                                        // console.log(starOverWid+'px');

                                    }
                                });
                            } else {
                                $('.x_textscore').css('fontSize', '24px');
                                $scope.carIdAvgGrade = '暂无评分';
                                $('#gradeStar-over').width(0);
                                $('.noCommentText').css('display', 'block');
                            }

                            //从数据库读取车信息
                            $http({
                                method: 'get',
                                url: serverURL + 'cars/detailCarInfo?carId=' + $scope.carId,
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
                                var mate = 0;
                                //进入页面时显示的是第一张图片

                                $(".cover").eq(0).css('opacity', '0');
                                $(".cover").eq(0).parent().css('border', '2px red solid');
                                $('#bigPic img').attr('src', serverURL + 'images/detailCar/' + $scope.detailCarInfo[0].photo);
                                $(".previous").append("<img src=" + "images/detailed-img/previous.png" + ">");
                                $(".next").append("<img src=" + "images/detailed-img/previous.png" + ">");
                                var showImg = $(".show");
                                for (var i = 0; i < showImg.length; i++) {
                                    showImg.eq(i).append("<img src=" + serverURL + 'images/detailCar/' + $scope.detailCarInfo[i].photo + ">")
                                }

                                $('#showPicOne').click(function (event) {

                                    var tar = $(event.target);
                                    var str = event.target.nodeName;
                                    var class_str = tar[0].className;
                                    var arr = $scope.detailCarInfo;
                                    var length = arr.length;
                                    //图片点击事件
                                    if (str.toLowerCase() == "div" && class_str.toLowerCase() == "cover") {
                                        mate = tar.parent().attr("id").substring(2);
                                        var srcPath = tar.parent().children("img").attr("src");
                                        $('.show').unbind("mouseenter").unbind("mouseleave");
                                        //变边框
                                        tar.parent().css({'border': '2px red solid', 'opacity': '1'});
                                        tar.parent().siblings().css('border', 'none');
                                        tar.parent().siblings().hover(function () {
                                            $(this).css('border', '2px red solid')
                                        }, function () {
                                            $(this).css('border', '0');
                                        });
                                        //变亮度
                                        tar.css('opacity', '0');
                                        $(".cover").not(tar).css('opacity', '0.2');
                                        $('#bigPic img').attr('src', srcPath);
                                    }
                                    //上下点击事件
                                    else if (class_str.toLowerCase() == "previous" || tar.parent()[0].className == "previous") {
                                        //获得现在的点击图像

                                        if (mate == 0) {
                                            mate = 0;

                                            var arrEmpty = new Array(1);
                                            for (var i = 0; i < arr.length; i++) {
                                                if (i == 0) {
                                                    arrEmpty[0] = arr[i];
                                                } else {
                                                    arr[i - 1] = arr[i];
                                                    if (i == length - 1) {
                                                        arr[length - 1] = arrEmpty[0];
                                                    }
                                                }
                                                //数组转换后，已经有img了，找到img src
                                            }

                                            //得到图片的地址
                                            var pitMove = $(".cover").siblings("img");
                                            for (var i = 0; i < pitMove.length; i++) {
                                                pitMove.eq(i).attr("src", serverURL + 'images/detailCar/' + $scope.detailCarInfo[i].photo);
                                            }
                                            //console.log($(".show").eq(mate).attr("id"));
                                            $('#bigPic img').attr('src', serverURL + 'images/detailCar/' + $scope.detailCarInfo[i].photo);
                                        }
                                        else {
                                            $(".show").siblings().hover(function () {
                                                $(this).css('border', '2px red solid')
                                            }, function () {
                                                $(this).css('border', '0');
                                            });
                                            $(".show").eq(mate).css({'border': 'none'});
                                            mate = mate - 1;
                                            $('.show').eq(mate).unbind("mouseenter").unbind("mouseleave");
                                            $(".show").eq(mate).css({'border': '2px red solid', 'opacity': '1'});
                                            console.log($(".show img").eq(mate).attr("src"));
                                            $('#bigPic img').attr('src', serverURL + 'images/detailCar/' + $scope.detailCarInfo[mate].photo);
                                        }


                                    }

                                    else if (class_str.toLowerCase() == "next" || tar.parent()[0].className == "next") {
                                        //获得现在的点击图像
                                        if (mate == 5) {
                                            mate = 5;
                                            var arrEmpty = new Array(1);
                                            for (var i = length - 1; i >= 0; i--) {
                                                if (i == length - 1) {
                                                    arrEmpty[0] = arr[length - 1];

                                                } else {
                                                    arr[i + 1] = arr[i]
                                                    if (i == 0) {
                                                        arr[0] = arrEmpty[0];
                                                    }
                                                }//数组转换后，已经有img了，找到img src
                                            }
                                            var pitMove = $(".cover").siblings("img");
                                            for (var i = 0; i < pitMove.length; i++) {
                                                pitMove.eq(i).attr("src", serverURL + 'images/detailCar/' + $scope.detailCarInfo[i].photo);
                                            }
                                            //console.log($(".show").eq(mate).attr("id"));
                                            $('#bigPic img').attr('src', serverURL + 'images/detailCar/' + $scope.detailCarInfo[5].photo);

                                        }//end of mate=5

                                        else {
                                            console.log(mate);
                                            $(".show").siblings().hover(function () {
                                                $(this).css('border', '2px red solid')
                                            }, function () {
                                                $(this).css('border', '0');
                                            });
                                            $(".show").eq(mate).css({'border': 'none'});

                                            mate = mate - (-1);
                                            console.log(mate);
                                            $('.show').eq(mate).unbind("mouseenter").unbind("mouseleave");
                                            $(".show").eq(mate).css({'border': '2px red solid', 'opacity': '1'});
                                            console.log($(".show img").eq(mate).attr("src"));
                                            $('#bigPic img').attr('src', serverURL + 'images/detailCar/' + $scope.detailCarInfo[mate].photo);
                                        }


                                    }
                                })

                            })
                        }

                    });



                    var getstorage = window.sessionStorage;
                    var loStorage = window.localStorage;
                    $scope.info01 = loStorage.getItem('info');
                    $scope.info = getstorage.getItem("infoSe");
                    if ($scope.info != null) {
                        var arrInfo = $scope.info.split("&");
                        $scope.uId = arrInfo[2];
                        // 从数据库根据登录的uId查询是否收藏了这种车
                        $.ajax({
                            url: serverURL + 'users/getCollectorById',
                            type: 'get', //GET
                            async: true,    //或false,是否异步
                            data: {uId: $scope.uId, carId: $scope.carId,eachCarId:$scope.eachCarId},
                            timeout: 5000,    //超时时间
                            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                            success: function (data, textStatus, jqXHR) {
                                if (data.result == 0) {  //从数据库未查到收藏，显示心为白色
                                    $('.collIcon').attr("src", "images/detailed-img/coll-bef.png");
                                } else if (data.result == 1) {//查到已收藏，显示红色
                                    $('.collIcon').attr('src', "images/detailed-img/coll-aft.png");
                                }
                            }
                        });
                    } else if(loStorage.getItem('info')!=null){
                        $scope.uId =loStorage.getItem('info').split('&')[4];
                        // 从数据库根据登录的uId查询是否收藏了这种车
                        $.ajax({
                            url: serverURL + 'users/getCollectorById',
                            type: 'get', //GET
                            async: true,    //或false,是否异步
                            data: {uId: $scope.uId, carId: $scope.carId,eachCarId:$scope.eachCarId},
                            timeout: 5000,    //超时时间
                            dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                            success: function (data, textStatus, jqXHR) {
                                console.log('here')
                                if (data.result == 0) {  //从数据库未查到收藏，显示心为白色
                                    $('.collIcon').attr("src", "images/detailed-img/coll-bef.png");
                                } else if (data.result == 1) {//查到已收藏，显示红色
                                    $('.collIcon').attr('src', "images/detailed-img/coll-aft.png");
                                }
                            }
                        });

                    }else {
                        $('.collIcon').attr('src', "images/detailed-img/coll-bef.png");
                    }
                }, function (data) {
                    console.log(data);
                });




                // 页面操作-点击收藏
                $scope.changeColl = function () {
                    if($rootScope.isLogin==true){

                        if (($('.collIcon').attr('src')=='images/detailed-img/coll-bef.png')==true) {
                            $.ajax({
                                url: serverURL + 'users/collectorInsert',
                                type: 'get', //GET
                                async: true,    //或false,是否异步
                                data: {uId:$scope.uId, carId: $scope.carId,eachCarId:$scope.eachCarId},
                                timeout: 5000,    //超时时间
                                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                                success: function (data, textStatus, jqXHR) {
                                    if (data.result == 1) {
                                        $('.collIcon').attr("src","images/detailed-img/coll-aft.png");
                                    }
                                }
                            })
                        } else {
                            $.ajax({
                                url: serverURL + 'users/collectorDelete',
                                type: 'get', //GET
                                async: true,    //或false,是否异步
                                data: {uId: 1, carId: $scope.carId},
                                timeout: 5000,    //超时时间
                                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                                success: function (data, textStatus, jqXHR) {
                                    if (data.result == 1) {
                                        $('.collIcon').attr('src',"images/detailed-img/coll-bef.png");
                                    }
                                }
                            })
                        }
                    }else {
                        alert('先登录才可以收藏的');
                    }

                };


                $(document).ready(function ()  {
                    //关于页面操作
                    var navOffset=$(".payInstru").offset().top;
                    $(window).scroll(function(){
                        var scrollPos=$(window).scrollTop();

                        if(scrollPos >=navOffset){
                            // console.log('scropp');
                            // console.log(navOffset);
                            $(".payInstru").addClass("payInstru-fixed");
                        }else{
                            $(".payInstru").removeClass("payInstru-fixed");
                        }
                    });





  //点击立即预定按钮
                $scope.bookImme=function() {

                    var newData={
                        carId:$scope.data.carId,
                        eachCarId:$scope.data.eachCarId,
                        getCity:$scope.rentCity,
                        nowStore:$scope.nowStore,
                        returnCity:$scope.returnCity,
                        nowReturnStore:$scope.nowReturnStore,
                        rentDate:$scope.rentDate,
                        backDate:$scope.backDate,
                        dayNu:$scope.dayNu,
                    }

                    if($rootScope.isLogin==true){
                        $state.go('order',{data: JSON.stringify(newData)});

                    }else {

                        alert('请先登录');
                        var session =  window.sessionStorage ;
                        session.setItem("fromPath",'detailed');
                        $state.go('login',{data: JSON.stringify(newData)});
                    }
                }

            })


            //    修改

                $scope.cityName= $scope.rentCity;
                $scope.cityName01= $scope.returnCity;
                //城市
                $http({
                    method: 'GET',
                    url: serverURL + 'showCar/getCarCity',
                }).then(function (response) {
                    $scope.rentCarCity1 = response.data;
                    $scope.returnCarCity1 = response.data;
                }, function (data) {
                    console.log(data);
                });

                $("a[id^='update']").click(function () {

                    //取车店铺
                    $scope.$watch('cityName', function (newvalue, oldvalue, scope) {
                        // $scope.rentStorm=[];
                        if (newvalue !== oldvalue) {
                            var parseFun = $parse('cityName');
                            var t = parseFun(scope);
                            for (k in $scope.rentCarCity1) {
                                if ($scope.rentCarCity1[k].city == t) {
                                    var cityId = $scope.rentCarCity1[k].cId;
                                }
                            }
                            $http({
                                method: 'GET',
                                url: serverURL + 'showCar/getCarStrom?cId=' + cityId,
                            }).then(function (response) {
                                $scope.rentStorm = response.data;
                            })
                        } else {
                            for (k in $scope.rentCarCity1) {
                                if ($scope.rentCarCity1[k].city == $scope.cityName) {
                                    var cityId = $scope.rentCarCity1[k].cId;
                                }
                            }
                            $http({
                                method: 'GET',
                                url: serverURL + 'showCar/getCarStrom?cId=' + cityId,
                            }).then(function (response) {
                                $scope.rentStorm = response.data;
                            });

                        }
                    });


                    //还车店铺
                    $scope.$watch('cityName01', function (newvalue, oldvalue, scope) {

                        // $scope.rentStorm=[];
                        if (newvalue !== oldvalue) {
                            var parseFun1 = $parse('cityName01');
                            var t1 = parseFun1(scope);
                            for (r in $scope.returnCarCity1) {
                                if ($scope.rentCarCity1[r].city == t1) {
                                    var cityId1 = $scope.rentCarCity1[r].cId;
                                }
                            }
                            $http({
                                method: 'GET',
                                url: serverURL + 'showCar/getCarStrom?cId=' + cityId1,
                            }).then(function (response) {
                                $scope.returnStorm = response.data;
                            })
                        } else {
                            for (r in $scope.returnCarCity1) {
                                if ($scope.rentCarCity1[r].city == $scope.cityName01) {
                                    var cityId1 = $scope.rentCarCity1[r].cId;
                                }
                            }
                            $http({
                                method: 'GET',
                                url: serverURL + 'showCar/getCarStrom?cId=' + cityId1,
                            }).then(function (response) {
                                $scope.returnStorm = response.data;
                            })
                        }

                    });
                    $('#checkUpdate').one('click',function (e) {

                        $scope.rentDate1 = $('#d4318').val();
                        $scope.backDate1 = $('#d4319').val();
                        $scope.rentStorm1 = $('#rentStorm').val().split(':')[1];
                        $scope.city1 = $('#city').val().split(':')[1];
                        $scope.returnCity1 = $('#returnCity').val().split(':')[1];
                        $scope.returnStorm1 = $('#returnStorm').val().split(':')[1];
                        /*var time1=new Date($scope.backDate);
                        var time2=new Date($scope.rentDate);
                        var time = time1-time2;
                        $scope.dayNu = Math.ceil(time/(24*60*60*1000));
                        $scope.total=($scope.rentPrice+$scope.insurance)*$scope.dayNu;*/

                        $http({
                            method: 'GET',
                            url: serverURL + 'cars/getEachCarId?storm=' +  $scope.rentStorm1,
                        }).then(function (response) {
                            var id=response.data;
                             for(var j=0;j<id.length;j++){
                                 // console.log(id.length);
                                 if(id[j].eachCarId==$scope.eachCarId){
                                     // console.log('here');
                                     $http({
                                         method: 'GET',
                                         url: serverURL + 'cars/getTime?eachCarId=' +  $scope.eachCarId,
                                     }).then(function (response) {
                                         var order = response.data;
                                         // console.log(order);
                                         for (var i = 0; i < order.length; i++) {
                                             // console.log(order[i].rentTime);
                                             if (($scope.rentDate1 < order[i].returnTime) && ($scope.backDate1 > order[i].rentTime) && ((order[i].orderStatus == 1) || (order[i].orderStatus == 2) || (order[i].orderStatus == 3) || (order[i].orderStatus == 4))) {
                                                 break;
                                             }
                                         }
                                         if (i==order.length){
                                             var time1=new Date($scope.backDate1);
                                             var time2=new Date($scope.rentDate1);
                                             var time = time1-time2;
                                             $scope.dayNu = Math.ceil(time/(24*60*60*1000));
                                             $scope.total=($scope.rentPrice+$scope.insurance)*$scope.dayNu;
                                             $scope.rentDate = $scope.rentDate1;
                                             $scope.backDate = $scope.backDate1;
                                             $scope.nowStore=$scope.rentStorm1;
                                             $scope.rentCity=$scope.city1 ;
                                             $scope.returnCity=$scope.returnCity1;
                                             $scope.nowReturnStore=$scope.returnStorm1;
                                             alert('修改成功！');
                                             $scope.$apply();
                                             $state.go('detailed',{},{reload:true});

                                         }else {
                                             alert('修改失败！');
                                             // break;
                                         }
                                     })
                                     break;
                                 }
                             }
                             if (j==id.length){
                                 alert('修改失败！');
                             }

                        })

                    })



                })

            }]
        }
    });