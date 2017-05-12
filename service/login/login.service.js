/**
 * Created by 94802 on 2017/4/26.
 */
angular.module('loginTool')
    .factory('loginTool01', ['$http','$rootScope','$state','serverURL',function ($http,$rootScope,$state,serverURL) {
        return {
            version: '1.0',
            httpLogin:function (Ischecked,loginData,callback) {
                $http({
                    method: 'POST',
                    url: serverURL + 'users/login',
                    data: loginData,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    //对请求数据的包装
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    },
                    responseType: 'json'

                }).then(function (response) {
                     callback(response);
                })
            },
            httpGetUid:function (phoneNum,callback) {
                $http.get(serverURL + "users/registTurn?phoneNum="+phoneNum)
                    .then(function (response) {
                        callback(response);
                    })
            },


           test:function (a,b) {
              return a-b; 
           }
        }
    }]);
/*  .then(function (response) {
 console.log(response.data);
 if (response.data.result == 1) {
 $rootScope.isLogin = true;
 $rootScope.userId=response.data.name;
 //是否点击30天登录
 //没有点击直接登录的情况

 if(Ischecked==true){
 storage.setItem("info",$rootScope.phone_num+"&"+$rootScope.pass_word+"&"+headway);
 }
 $state.go('tule');

 }else if(response.data.result==0){
 alert('用户不存在');
 }else if(response.data.result==2){
 alert('密码错误');
 }else if(response.data.result==3){
 alert('用户名不合法');
 }
 }, function (data) {
 console.log(data);
 })*///end of http