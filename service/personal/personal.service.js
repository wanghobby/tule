/**
 * Created by 94802 on 2017/4/28.
 */
angular.module('personalTool').
    factory("personalTool01",['$http','$rootScope','serverURL',function ($http,$rootScope,serverURL) {
      return {
          //登陆数据库的查找方法
          httpPersonal: function (phoneNum, callback) {
              $http.get(serverURL + "personal/myInfo?phoneNum=" + phoneNum)
                  .then(function (resopnse) {
                      callback(resopnse);
                  })
          },
          //修改并保存信息
          httpPersonalSave: function (upDate, callback) {
              $http.get(serverURL + "personal/upDateMyInfo?upDate=" + upDate)
                  .then(function (response) {
                      callback(response);
                  })
          },
          //获得收藏的信息
          httpPersonalCollect: function (uId, callback) {
              $http.get(serverURL + "personal/getCollectInfo?uId=" + uId)
                  .then(function (response) {
                      callback(response);
                  })
          },
          //删除收藏的信息
          httpPersonalCollectDelete: function (uId,carId,eachCarId,callback) {
           /*  console.log('------------');
               console.log(1111111111);*/
              /* console.log(uId);
              console.log(carId);
              console.log(eachCarId);*/
              $http.get(serverURL + "personal/deleteCollect?uId=" + uId+"&"+"carId="+carId+"&"+"eachCarId="+eachCarId)
                  .then(function (response) {
                      callback(response);
                  })
          },
          //修改密码
          httpUpdatePassword:function (passwordData,callback) {
              console.log(passwordData);
              $http({
                  method: 'POST',
                  url: serverURL + 'personal/upDatePas',
                  data: passwordData,
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
          //获得订单的消息
          httpGetOrderByUid:function (uId,callback) {
              console.log(uId);
              $http.get(serverURL + "personal/getOrder?uId=" + uId)
                  .then(function (resopnse) {
                      callback(resopnse);
                  })
          },
          //提交评论
          httpPutComment:function (uId,orderId,score,comText,callback) {
              $http.get(serverURL + "personal/putComment?uId=" + uId+"&"+"orderId="+orderId+"&"+"score="+score+"&"+"comContent="+comText)
                  .then(function (resopnse) {
                      callback(resopnse);
                  })
          },
          //查看评论
          httpGetCom:function (uId,callback) {
              $http.get(serverURL + "personal/getCom?uId=" + uId)
                  .then(function (resopnse) {
                      callback(resopnse);
                  })
          },
          //保存个人的详细信息
          httpSaveMyInfo:function (myInfoData,callback) {
              $http({
                  method: 'POST',
                  url: serverURL + 'personal/upDateMyInfo',
                  data: myInfoData,
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
                  console.log('成功返回的值');
                  callback(response);
              })
          },
          //通过订单获取信息
          httpGetInfoByOid:function (oId,callback) {
              $http.get(serverURL + "personal/getInfoByOid?oId=" + oId)
                  .then(function (resopnse) {
                      callback(resopnse);
                  })
          },
          //通过订单编号取消订单
          httpCanOrderByOid:function (oId,callback) {
              $http.get(serverURL + "personal/CanOrderByOid?oId=" + oId)
                  .then(function (resopnse) {
                      callback(resopnse);
                  })
          },
          //插入评价的同时更新此条订单的状态
          httpUpdateOrderStaus:function (oId,callback) {
              $http.get(serverURL + "personal/updateOrdStaByOid?oId=" + oId)
                  .then(function (resopnse) {
                      callback(resopnse);
                  })
          }
          
      }
}]);