/**
 * Created with JetBrains WebStorm.
 * User: Yogesh Joshi
 * Date: 31/10/13
 * Time: 11:36 PM
 * To change this template use File | Settings | File Templates.
 */
var RealTimeEdit = angular.module('realTimeEdit',[]);

RealTimeEdit.config(function ( $routeProvider) {
    $routeProvider.when('/', {
        controller: 'MainCtrl'
    })
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'AppCtrl'
        })
        .otherwise({
            redirectTo: '/index'
        })
});


