/**
 * Created by 94802 on 2017/4/27.
 */
angular.module('userInfo')
    .config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/userInfoFirst.shortRent');
        $urlRouterProvider.otherwise('/userInfo.shortRent');
$stateProvider
    .state('userInfoFirst.shortRent', {
        url:"/userInfoFirst.shortRent",
        template:'<my-short-rent-page></my-short-rent-page>',

    })
    .state('userInfoFirst.integral', {
        url:"/userInfoFirst.integral",
        template:'<integral-page></integral-page>'
    })
    .state('userInfoFirst.changePassword', {
        url:"/userInfoFirst.changePassword",
        template:'<change-password-page></change-password-page>'
    }) 
    .state('userInfoFirst.myInfo', {
        url:"/userInfoFirst.myInfo",
        template:'<my-info-page></my-info-page>'
    })
    .state('userInfoFirst.memberRules', {
        url:"/userInfoFirst.memberRules",
        template:'<member-rules-page></member-rules-page>'
    })
    .state('userInfoFirst.memberShipLevel', {
        url:"/userInfoFirst.memberShipLevel",
        template:'<member-ship-level-page></member-ship-level-page>'
    })
    .state('userInfoFirst.myCollect', {
        url:"/userInfoFirst.myCollect",
        template:'<my-collect-page></my-collect-page>'
    })
    .state('userInfoFirst.myComment', {
        url:"/userInfoFirst.myComment",
        template:'<my-comment-page></my-comment-page>'
    })
    .state('userInfoFirst.orderDatail', {
        url:"/userInfoFirst.orderDatail/:oId",
        template:'<order-datail-page></order-datail-page>'
    })
    .state('userInfoFirst.writeInfo', {
        url:"/userInfoFirst.writeInfo",
        template:'<write-info-page></write-info-page>'
    })

}]);