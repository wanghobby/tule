/**
 * Created by wang on 2017/4/1.
 */
angular.module('shortRent')
    .directive('shortPage', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'shortrent/shortrent.html',
            controller: ['$scope', '$http', '$parse', 'serverURL', '$filter', '$state', function ($scope, $http, $parse, serverURL, $filter, $state) {
                $(document).ready(function () {

                    $scope.showShortText = function (i) {
                        $('#' + i).show();
                        $('#' + i + '1').show().css('animation', 'shortText 0.4s');

                    }
                    $scope.hideShortText = function (i) {
                        $('#' + i).hide();
                        $('#' + i + '1').hide();

                    }


                })

                //获取品牌
                $http({
                    method: 'GET',
                    url: serverURL + 'showCar/getBrand',
                }).then(function (response) {
                    $scope.Brand = response.data;
                }, function (data) {
                    console.log(data);
                });
                // 获取车型
                $http({
                    method: 'GET',
                    url: serverURL + 'showCar/getCarType',
                }).then(function (response) {
                    $scope.CarType = response.data;
                }, function (data) {
                    console.log(data);
                });
                //城市
                $http({
                    method: 'GET',
                    url: serverURL + 'showCar/getCarCity',
                }).then(function (response) {
                    $scope.rentCarCity = response.data;
                    $scope.returnCarCity = response.data;
                }, function (data) {
                    console.log(data);
                });
                //取车店铺
                $scope.$watch('cityName', function (newvalue, oldvalue, scope) {
                    var cityId = 1;
                    var parseFun = $parse('cityName');
                    var t = parseFun(scope);
                    $scope.getCity = t;
                    for (k in $scope.rentCarCity) {
                        if ($scope.rentCarCity[k].city == t) {
                            var cityId = $scope.rentCarCity[k].cId;
                        }
                    }
                    // $scope.rentStorm=[];
                    if (newvalue !== oldvalue) {
                        $http({
                            method: 'GET',
                            url: serverURL + 'showCar/getCarStrom?cId=' + cityId,
                        }).then(function (response) {
                            $scope.rentStorm = response.data;
                        })
                    } else {
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
                    var cityId1 = 1;
                    var parseFun1 = $parse('cityName01');
                    var t1 = parseFun1(scope);
                    $scope.returnCity = t1;
                    for (r in $scope.returnCarCity) {
                        if ($scope.rentCarCity[r].city == t1) {
                            var cityId1 = $scope.rentCarCity[r].cId;
                        }
                    }
                    // $scope.rentStorm=[];
                    if (newvalue !== oldvalue) {
                        $http({
                            method: 'GET',
                            url: serverURL + 'showCar/getCarStrom?cId=' + cityId1,
                        }).then(function (response) {
                            $scope.returnStorm = response.data;
                        })
                    } else {
                        $http({
                            method: 'GET',
                            url: serverURL + 'showCar/getCarStrom?cId=' + cityId1,
                        }).then(function (response) {
                            $scope.returnStorm = response.data;
                        })
                    }

                });
                //选择其他还车店铺
                document.querySelector('#shortRentShowOtherStorm').onclick = function () {
                    document.querySelector('#shortRentShowStorm').style.display = 'none';
                    document.querySelector('#shortRentShowRelStorm').style.display = 'block';
                };
                /*       window.onload(function () {
                 document.querySelector('#city').onclick = function () {
                 document.getElementById('rent1').style.backgroundColor = '#5390ED';
                 document.getElementById('rent1').style.color = 'white';
                 };
                 document.querySelector('#returnCity').onclick = function () {
                 document.getElementById('return1').style.backgroundColor = '#5390ED';
                 document.getElementById('return1').style.color = 'white';
                 };
                 });*/
                $(document).ready(function () {
                    $('#rent11').css('backgroundColor', '#5390ED');
                    $('#rent11').css('color', 'white');

                    //让搜素框fix
                    // var navOffset=$(".shortrent-select-container").offset().top;
                    // $(window).scroll(function(){
                    //     var scrollPos=$(window).scrollTop();
                    //     if(scrollPos >=navOffset){
                    //         $(".shortrent-select-container").addClass("shortrent-select-container-fixed");
                    //     }else{
                    //         $(".shortrent-select-container").removeClass("shortrent-select-container-fixed");
                    //     }
                    // });
                })
                //选择店铺
                $scope.getId = "rent11";
                $scope.rentId = "return11";
                // $('#shortRentShowGetCarStorm').on('click','span',function () {
                //
                // })
                document.querySelector('#shortRentShowGetCarStorm').onclick = function (e) {
                    if (e.target.id != "shortRentShowGetCarStorm") {
                        var getId = e.target.id;
                        $scope.getId = getId;
                        $('#' + getId).css('backgroundColor', '#5390ED');
                        $('#' + getId).css('color', 'white');
                        $('#' + getId).siblings().css('backgroundColor', 'white');
                        $('#' + getId).siblings().css('color', 'grey');
                        if (($scope.rentId).substr(6, 2) == $scope.getId.substr(4, 2)) {
                            document.querySelector('#shortRentShowStorm').style.display = 'block';
                            document.querySelector('#shortRentShowRelStorm').style.display = 'none';
                        }
                    }
                };
                document.querySelector('#shortRentShowRelStorm').onclick = function (e) {
                    if (e.target.id != "shortRentShowRelStorm") {
                        var rentId = e.target.id;
                        $scope.rentId = rentId;
                        $('#' + rentId).css('backgroundColor', '#5390ED');
                        $('#' + rentId).css('color', 'white');
                        $('#' + rentId).siblings().css('backgroundColor', 'white');
                        $('#' + rentId).siblings().css('color', 'grey');
                        if (($scope.rentId).substr(6, 2) == $scope.getId.substr(4, 2)) {
                            document.querySelector('#shortRentShowStorm').style.display = 'block';
                            document.querySelector('#shortRentShowRelStorm').style.display = 'none';
                        }

                    }
                };
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
                    Date.prototype.Format1 = function (fmt, d) { //author: meizz
                        var year = this.getYear() + 1900;
                        var month = this.getMonth() + 1;
                        var day = this.getDate();
                        var hour = this.getHours();
                        if ((year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)) {
                            if ((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12)) {
                                if (day + d > 31) {
                                    month = month + 1;
                                    day = (day + d) % 31;
                                } else {
                                    day = day + d;
                                }
                            } else if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
                                if (day + d > 30) {
                                    month = month + 1;
                                    day = (day + d) % 30;
                                } else {
                                    day = day + d;
                                }
                            } else {
                                if (day + d > 29) {
                                    month = month + 1;
                                    day = (day + d) % 29;
                                } else {
                                    day = day + d;
                                }
                            }
                        } else {

                            if ((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12)) {

                                if (day + d > 31) {
                                    month = month + 1;
                                    day = (day + d) % 31;
                                } else {
                                    day = day + d;
                                }
                            } else if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {

                                if (day + d > 30) {
                                    month = month + 1;
                                    day = (day + d) % 30;
                                } else {
                                    day = day + d;
                                }
                            } else {
                                if (day + d > 28) {
                                    month = month + 1;
                                    day = (day + d) % 28;
                                } else {
                                    day = day + d;
                                }
                            }
                        }
                        var o = {
                            "M+": month, //月份
                            "d+": day, //日
                            "h+": hour, //小时
                        };
                        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                        for (var k in o)
                            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                        return fmt;
                    }

                    var da = 2;
                    var time = new Date().Format("yyyy-MM-dd hh:00");
                    var time1 = new Date().Format1("yyyy-MM-dd hh:00", da);
                    $scope.rentDate = time;
                    $scope.backDate = time1;
                })


                $('#search').click(function () {
                    $scope.rentDate = $('#d4311').val();
                    $scope.backDate = $('#d4312').val();
                    showCars();

                })


                //创建和初始化地图函数：
                $scope.initMap = function () {
                    $('#myModal').modal();
                    $scope.createMap();//创建地图
                    $scope.setMapEvent();//设置地图事件
                    $scope.addMapControl();//向地图添加控件

                }

                //创建地图函数：
                $scope.createMap = function () {
                    console.log('here');
                    var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
                    var point = new BMap.Point(120.5899, 31.304566);//定义一个中心点坐标
                    map.centerAndZoom(point, 12);//设定地图的中心点和坐标并将地图显示在地图容器中
                    window.map = map;//将map变量存储在全局
                }

                //地图事件设置函数：
                $scope.setMapEvent = function () {
                    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
                    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
                    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
                    map.enableKeyboard();//启用键盘上下左右键移动地图
                }

                //地图控件添加函数：
                $scope.addMapControl = function () {
                    //向地图中添加缩放控件
                    var ctrl_nav = new BMap.NavigationControl({
                        anchor: BMAP_ANCHOR_TOP_LEFT,
                        type: BMAP_NAVIGATION_CONTROL_ZOOM
                    });
                    map.addControl(ctrl_nav);
                    //向地图中添加缩略图控件
                    var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 0});
                    map.addControl(ctrl_ove);
                    //向地图中添加比例尺控件
                    var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
                    map.addControl(ctrl_sca);
                }

                // initMap();//创建和初始化地图

                $http({
                    method: 'GET',
                    url: serverURL + 'showCar/showTime',
                }).then(function (response) {
                    $scope.shearByTime = response.data;
                    $scope.rentTime = $scope.shearByTime[0].rentTime;
                    $scope.returnTime = $scope.shearByTime[0].returnTime;
                })

                $scope.conditions = {
                    searchByType: [],
                    searchByPrice: [],
                    searchByBrand: [],
                };

                $('#searchByType').on('click', 'li', function () {
                    var typeId = $(this).attr("id");
                    // console.log($(this).children("h5")[0].innerHTML);
                    if (typeId == 'type0') {
                        $scope.conditions.searchByType = [];
                        $('#type0').siblings().removeClass('shortrent-search-type-true').addClass('shortrent-search-type-false');
                        $('#type0').siblings().children("[id^='img']").removeClass('shortrent-search-type-true-img').addClass('shortrent-search-type-false-img');
                        $('#type0').removeClass('shortrent-search-type-false').addClass('shortrent-search-type-true');
                        $('#img0').removeClass('shortrent-search-type-false-img').addClass('shortrent-search-type-true-img');
                    } else {
                        // console.log($scope.conditions.searchByType.length);
                        if ($scope.conditions.searchByType.length == 0) {
                            $scope.conditions.searchByType.push($(this).children("h5")[0].innerHTML);
                            $('#type0').removeClass('shortrent-search-type-true').addClass('shortrent-search-type-false');
                            $('#img0').removeClass('shortrent-search-type-true-img').addClass('shortrent-search-type-false-img');
                            $(this).removeClass('shortrent-search-type-false').addClass('shortrent-search-type-true');
                            $(this).children("[id^='img']").removeClass('shortrent-search-type-false-img').addClass('shortrent-search-type-true-img');
                        } else {
                            for (var i = 0; i < $scope.conditions.searchByType.length; i++) {
                                if ($scope.conditions.searchByType[i] == $(this).children("h5")[0].innerHTML) {
                                    $scope.conditions.searchByType.splice(i, 1);
                                    $(this).removeClass('shortrent-search-type-true').addClass('shortrent-search-type-false');
                                    $(this).children("[id^='img']").removeClass('shortrent-search-type-true-img').addClass('shortrent-search-type-false-img');

                                    if ($scope.conditions.searchByType.length == 0) {
                                        $('#type0').siblings().removeClass('shortrent-search-type-true').addClass('shortrent-search-type-false');
                                        $('#type0').siblings().children("[id^='img']").removeClass('shortrent-search-type-true-img').addClass('shortrent-search-type-false-img');
                                        $('#type0').removeClass('shortrent-search-type-false').addClass('shortrent-search-type-true');
                                        $('#img0').removeClass('shortrent-search-type-false-img').addClass('shortrent-search-type-true-img');
                                    }
                                    showCars();
                                    return;
                                }
                            }
                            if (i == $scope.conditions.searchByType.length) {
                                $scope.conditions.searchByType.push($(this).children("h5")[0].innerHTML);
                                $('#type0').removeClass('shortrent-search-type-true').addClass('shortrent-search-type-false');
                                $('#img0').removeClass('shortrent-search-type-true-img').addClass('shortrent-search-type-false-img');
                                $(this).removeClass('shortrent-search-type-false').addClass('shortrent-search-type-true');
                                $(this).children("[id^='img']").removeClass('shortrent-search-type-false-img').addClass('shortrent-search-type-true-img');
                            }
                        }
                    }
                    showCars();
                });
                $('#searchByPrice').on('click', 'li', function () {
                    // console.log($(this).attr("id"));
                    var priceId = $(this).attr("id");
                    if (priceId == 'carprice0') {
                        $scope.conditions.searchByPrice = [];
                        $('#carprice0').siblings().removeClass('shortrent-search-price-true').addClass('shortrent-search-price-false');
                        $('#carprice0').siblings().children("img").attr('src', 'images/shortRent/select.png');
                        $('#carprice0').removeClass('shortrent-search-pb-false').addClass('shortrent-search-pb-true');
                    } else {
                        if ($scope.conditions.searchByPrice.length == 0) {
                            $scope.conditions.searchByPrice.push($(this).children("span")[0].innerHTML);
                            $(this).removeClass('shortrent-search-price-false').addClass('shortrent-search-price-true');
                            $(this).children("img").attr('src', 'images/shortRent/selectcopy.png');
                            $('#carprice0').removeClass('shortrent-search-pb-true').addClass('shortrent-search-pb-false');
                        } else {
                            for (var i = 0; i < $scope.conditions.searchByPrice.length; i++) {
                                if ($scope.conditions.searchByPrice[i] == $(this).children("span")[0].innerHTML) {
                                    $scope.conditions.searchByPrice.splice(i, 1);
                                    $(this).removeClass('shortrent-search-price-true').addClass('shortrent-search-price-false');
                                    $(this).children("img").attr('src', 'images/shortRent/select.png');
                                    if ($scope.conditions.searchByPrice.length == 0) {
                                        $('#carprice0').siblings().removeClass('shortrent-search-price-true').addClass('shortrent-search-price-false');
                                        $('#carprice0').siblings().children("img").attr('src', 'images/shortRent/select.png');
                                        $('#carprice0').removeClass('shortrent-search-pb-false').addClass('shortrent-search-pb-true');
                                    }
                                    showCars();
                                    return;
                                }
                            }
                            if (i == $scope.conditions.searchByPrice.length) {
                                $scope.conditions.searchByPrice.push($(this).children("span")[0].innerHTML);
                                $(this).removeClass('shortrent-search-price-false').addClass('shortrent-search-price-true');
                                $(this).children("img").attr('src', 'images/shortRent/selectcopy.png');
                                $('#carprice0').removeClass('shortrent-search-pb-true').addClass('shortrent-search-pb-false');
                            }
                        }
                    }
                    showCars();
                });

                $('#searchByBrand').on('click', 'li', function () {
                    // console.log($(this).attr("id"));
                    var brandId = $(this).attr("id");
                    if (brandId == 'brand0') {
                        $scope.conditions.searchByBrand = [];
                        $('#brand0').siblings().removeClass('shortrent-search-brand-true').addClass('shortrent-search-brand-false');
                        $('#brand0').siblings().children("img").attr('src', 'images/shortRent/select.png');
                        $('#brand0').removeClass('shortrent-search-pb-false').addClass('shortrent-search-pb-true');
                    } else {
                        if ($scope.conditions.searchByBrand.length == 0) {
                            $scope.conditions.searchByBrand.push($(this).children("span")[0].innerHTML);
                            $(this).removeClass('shortrent-search-brand-false').addClass('shortrent-search-brand-true');
                            $(this).children("img").attr('src', 'images/shortRent/selectcopy.png');
                            $('#brand0').removeClass('shortrent-search-pb-true').addClass('shortrent-search-pb-false');
                        } else {
                            for (var i = 0; i < $scope.conditions.searchByBrand.length; i++) {
                                if ($scope.conditions.searchByBrand[i] == $(this).children("span")[0].innerHTML) {
                                    $scope.conditions.searchByBrand.splice(i, 1);
                                    $(this).removeClass('shortrent-search-brand-true').addClass('shortrent-search-brand-false');
                                    $(this).children("img").attr('src', 'images/shortRent/select.png');
                                    if ($scope.conditions.searchByBrand) {
                                        $('#brand0').siblings().removeClass('shortrent-search-brand-true').addClass('shortrent-search-brand-false');
                                        $('#brand0').siblings().children("img").attr('src', 'images/shortRent/select.png');
                                        $('#brand0').removeClass('shortrent-search-pb-false').addClass('shortrent-search-pb-true');
                                    }
                                    showCars();
                                    return;
                                }
                            }
                            if (i == $scope.conditions.searchByBrand.length) {
                                $scope.conditions.searchByBrand.push($(this).children("span")[0].innerHTML);
                                $(this).removeClass('shortrent-search-brand-false').addClass('shortrent-search-brand-true');
                                $(this).children("img").attr('src', 'images/shortRent/selectcopy.png');
                                $('#brand0').removeClass('shortrent-search-pb-true').addClass('shortrent-search-pb-false');
                            }
                        }
                    }
                    showCars();

                });
                /*$('#searchByBrand').off('mouseenter').unbind('mouseleave');
                 // $('#searchByBrand').unbind("mouseenter").unbind("mouseout");
                 $('#searchByBrand').on('mouseenter','li',function () {
                 // $(this).unbind("mouseenter").unbind("mouseout");
                 $(this).removeClass('shortrent-search-brand-false').addClass('shortrent-search-brand-true');
                 $(this).children("img").attr('src','images/shortRent/selecthover .png');
                 // $('#brand0').removeClass('shortrent-search-pb-true').addClass('shortrent-search-pb-false');
                 });
                 $('#searchByBrand').on('mouseleave','li',function () {
                 // $(this).unbind("mouseout");
                 $(this).removeClass('shortrent-search-brand-true').addClass('shortrent-search-brand-false');
                 $(this).children("img").attr('src','images/shortRent/select.png');
                 // $('#brand0').removeClass('shortrent-search-pb-true').addClass('shortrent-search-pb-false');
                 });
                 */

                //排序
                $('#normal').click(function () {
                    $('#normal').css('backgroundColor', '#5390ED');
                    $('#normal').css('color', 'white');
                    $('#pricedown').css('backgroundColor', 'white');
                    $('#pricedown').css('color', 'black');
                    $('#priceup').css('backgroundColor', 'white');
                    $('#priceup').css('color', 'black');
                    $scope.str = '';
                    $scope.isopen = false;
                    showCars();
                })
                $('#pricedown').click(function () {
                    $('#pricedown').css('backgroundColor', '#5390ED');
                    $('#pricedown').css('color', 'white');
                    $('#normal').css('backgroundColor', 'white');
                    $('#normal').css('color', 'black');
                    $('#priceup').css('backgroundColor', 'white');
                    $('#priceup').css('color', 'black');
                    $scope.str = 'rentPrice';
                    $scope.isopen = true;
                    showCars();
                })
                $('#priceup').click(function () {
                    $('#priceup').css('backgroundColor', '#5390ED');
                    $('#priceup').css('color', 'white');
                    $('#normal').css('backgroundColor', 'white');
                    $('#normal').css('color', 'black');
                    $('#pricedown').css('backgroundColor', 'white');
                    $('#pricedown').css('color', 'black');
                    $scope.str = 'rentPrice';
                    $scope.isopen = false;
                    showCars();
                })

                function showCars() {
                    $http({
                        method: 'GET',
                        url: serverURL + 'showCar/showCar',
                    }).then(function (response) {
                        $scope.carinfo = response.data;

                        //将车的图片作为背景


                        $scope.carinfo = $filter("orderBy")($scope.carinfo, $scope.str, $scope.isopen);


                        //通过店铺筛选

                        for (var i = 0; i < $scope.rentStorm.length; i++) {
                            if ($scope.rentStorm[i].id == $scope.getId.substr(5, 1)) {
                                $scope.rentStorm.id = $scope.rentStorm[i].id;
                                $scope.nowStore = $scope.rentStorm[i].store;
                            }
                        }

                        $scope.st = [];
                        for (var p = 0; p < $scope.carinfo.length; p++) {
                            if ($scope.carinfo[p].store == $scope.nowStore) {
                                $scope.st.push($scope.carinfo[p]);
                            }
                        }
                        //通过时间筛选
                        for (var i = 0; i < $scope.shearByTime.length; i++) {
                            if (($scope.rentDate < $scope.shearByTime[i].returnTime) && ($scope.backDate > $scope.shearByTime[i].rentTime) && (($scope.shearByTime[i].orderStatus == 1) || ($scope.shearByTime[i].orderStatus == 2) || ($scope.shearByTime[i].orderStatus == 3) || ($scope.shearByTime[i].orderStatus == 4))) {
                                for (var j = 0; j < $scope.st.length; j++) {
                                    if ($scope.shearByTime[i].eachCarId == $scope.st[j].eachCarId) {
                                        $scope.st.splice(j, 1);
                                    }
                                }
                            }
                        }

                        // console.log($scope.conditions);
                        //通过车型筛选
                        $scope.newcarinfo_Type = [];
                        if ($scope.conditions.searchByType.length == 0) {
                            $scope.newcarinfo_Type = $scope.st;
                        } else {
                            for (var i = 0; i < $scope.conditions.searchByType.length; i++) {
                                // console.log($scope.conditions.searchByType[i]);
                                for (var j = 0; j < $scope.st.length; j++) {
                                    if ($scope.st[j].type == $scope.conditions.searchByType[i]) {
                                        $scope.newcarinfo_Type.push($scope.st[j])
                                    }
                                }
                            }
                        }
                        //通过价格筛选
                        $scope.newcarinfo_Price = [];
                        if ($scope.conditions.searchByPrice.length == 0) {
                            $scope.newcarinfo_Price = $scope.newcarinfo_Type;
                        } else {
                            for (var i = 0; i < $scope.conditions.searchByPrice.length; i++) {
                                if ($scope.conditions.searchByPrice[i] == "500以上") {
                                    var star = 500;
                                    for (var j = 0; j < $scope.newcarinfo_Type.length; j++) {
                                        if (star <= $scope.newcarinfo_Type[j].rentPrice) {
                                            $scope.newcarinfo_Price.push($scope.newcarinfo_Type[j])
                                        }
                                    }
                                } else {
                                    var strs = new Array();
                                    strs = $scope.conditions.searchByPrice[i].split("-");
                                    for (var j = 0; j < $scope.newcarinfo_Type.length; j++) {
                                        if (strs[0] <= $scope.newcarinfo_Type[j].rentPrice && $scope.newcarinfo_Type[j].rentPrice <= strs[1]) {
                                            $scope.newcarinfo_Price.push($scope.newcarinfo_Type[j])
                                        }
                                    }
                                }
                            }
                        }
                        //通过品牌筛选
                        $scope.newcarinfo_Brand = [];
                        if ($scope.conditions.searchByBrand.length == 0) {
                            $scope.newcarinfo_Brand = $scope.newcarinfo_Price;
                        } else {
                            for (var i = 0; i < $scope.conditions.searchByBrand.length; i++) {
                                // console.log($scope.conditions.searchByType[i]);
                                for (var j = 0; j < $scope.newcarinfo_Price.length; j++) {
                                    if ($scope.newcarinfo_Price[j].brand == $scope.conditions.searchByBrand[i]) {
                                        $scope.newcarinfo_Brand.push($scope.newcarinfo_Price[j])
                                    }
                                }
                            }
                        }


                        $scope.carle = $scope.newcarinfo_Brand.length;
                        //每页的展示条数
                        var page_ave = 8;
                        //默认总的页数
                        var page_count = 1;
                        var page_dis = 0;
                        var sta = 0;
                        var end;
                        $scope.page_now = 1;
                        $scope.turnPage = function (page_now) {


                            $scope.part_count = [];

                            //获取总的数据量
                            var countAll = $scope.newcarinfo_Brand.length;
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
                                if (countAll % 8 == 0)
                                    page_dis = 8;
                                else {
                                    page_dis = countAll % 8
                                }
                            }

                            //将数据定位到数组的指定位置
                            sta = ($scope.page_now - 1) * 8;
                            if ($scope.page_now == page_count) {
                                end = ($scope.page_now - 1) * 8 + page_dis;
                            } else {
                                end = ($scope.page_now - 1) * 8 + 8;
                            }

                            //显示新的数组
                            $scope.newcarinfo = $scope.newcarinfo_Brand.slice(sta, end);
                            //将页数总数放入数组里面

                            if (page_count < 3) {
                                for (var j = 0; j < page_count; j++) {
                                    $scope.part_count[j] = j + 1;
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
                    }, function (data) {
                        console.log(data);
                    });
                }

                showCars();

                // //定位地图
                // $(window).scroll(function () {
                //
                //     if($(this).scrollTop() >= 464 ) {
                //         $('#showMap').css('position', 'fixed');
                //         $('#showMap').css('top', '0px');
                //     } else {
                //         $('#showMap').css('position','static');
                //         $("#gotop").css("display","none");
                //     }
                //     if($(this).scrollTop() >= 200 ) {
                //         $("#gotop").css("display","block");
                //     } else {
                //         $("#gotop").css("display","none");
                //     }
                //
                // });
                $("#gotop").click(function () {
                    $('body,html').animate({scrollTop: 0}, 500);
                })


                $('#stateGo').on('click', 'a', function () {

                    for (var i = 0; i < $scope.returnStorm.length; i++) {
                        if ($scope.returnStorm[i].id == $scope.rentId.substr(7, 1)) {
                            $scope.returnStorm.id = $scope.returnStorm[i].id
                            $scope.nowReturnStore = $scope.returnStorm[i].store;
                        }
                    }


                    $scope.eachCarId = this.id.substr(10, 4);
                    for (var i = 0; i < $scope.newcarinfo_Brand.length; i++) {
                        if ($scope.newcarinfo_Brand[i].eachCarId == $scope.eachCarId) {
                            $scope.carId = $scope.newcarinfo_Brand[i].carId;

                        }
                    }
                    var data = $scope.data = {
                        getCity: $scope.getCity,
                        nowStore: $scope.nowStore,
                        returnCity: $scope.returnCity,
                        nowReturnStore: $scope.nowReturnStore,
                        rentDate: $scope.rentDate,
                        backDate: $scope.backDate,
                        eachCarId: $scope.eachCarId,
                        carId: $scope.carId,

                    }

                    $state.go('detailed', {data: JSON.stringify(data)});

                })

            }]
        }
    });