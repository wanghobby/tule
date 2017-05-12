/**
 * Created by wang on 2017/4/4.
 */
angular.module('nav').
    directive('navPage',function (){
        return{
            restrict : "ACE",
            replace:true,
            templateUrl : 'nav/nav.html',
        }
    })