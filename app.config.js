/**
 * Created by wang on 2017/3/30.
 */
angular.module('tule')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        // $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/tule');
        $stateProvider
            .state('tule', {
                url:"/tule",
                template:'<template-page></template-page>'
            })
            .state('login', {
                url:"/login/:data",
                template:'<login-page></login-page>'
            })
            .state('regist', {
                url:"/regist",
                template:'<regist-page></regist-page>'
            })
            .state('shortrent', {
                url:"/shortrent/:indexDate",
               template:'<short-page></short-page>'
            })
            .state('longrent', {
                url:"/longrent",
                template:''
            })
            .state('companyrent', {
                url:"/companyrent",
                template:''
            })
                .state('order', {
                url:"/order/:data",
                template:'<order-page></order-page>'
            })
            .state('detailed', {
                url:"/detailed/:data",
                template:'<all-car-page></all-car-page>'
            })
            .state('userInfoFirst', {
                url:"/userInfo",
                template:'<user-info-page></user-info-page>',
            })
            .state('myComment', {
                url:"/myComment",
                template:'<my-comment-page></my-comment-page>',
            })
            .state('pay', {
                url:"/pay/:flag",
                template:'<pay-page></pay-page>',
            })

    }])

