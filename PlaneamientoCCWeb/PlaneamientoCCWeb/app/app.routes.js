///// <reference path="../Scripts/angular.js" />
///// <reference path="../Scripts/modules/angular-ui-router.js" />

//(function () {
//    'use strict';

//    angular.module('appReferidos')
//    .config(routeConfig);

//    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

//    function routeConfig($stateProvider, $urlRouterProvider) {
//        $stateProvider
//            .state("home", {
//                url: "/home",
//                templateUrl: URL.INICIO + 'app/public/home/home.html'
//            })
//            .state("login", {
//                url: "/login",
//                templateUrl: URL.INICIO + 'app/public/login/login.html'
//            })
//            .state("error", {
//                url: "/error",
//                templateUrl: URL.INICIO + 'app/public/error/error.html'
//            })
//            .state('dashboard', {
//                url: '/dashboard',
//                templateUrl: URL.INICIO + 'app/private/dashboard/dashboard.html'
//            })
//            .state('Usuario', {
//                url: '/Usuario',
//                templateUrl: URL.INICIO + 'app/private/Usuario/usuario.html'
//            })
//            .state('UsuarioNuevo', {
//                url: '/UsuarioNuevo',
//                templateUrl: URL.INICIO + 'app/private/UsuarioNew/usuarioNew.html'
//            })
//            .state('Puesto', {
//                url: '/Puesto',
//                templateUrl: URL.INICIO + 'app/private/Puesto/puesto.html'
//            })
//            .state("Regularizacion", {
//                url: "/Regularizacion",
//                templateUrl: URL.INICIO + "app/private/Regularizacion/RegularizacionInterna.html"
//            })
//            .state("Regularizacion1", {
//                url: "/Regularizacion1",
//                templateUrl: URL.INICIO + "app/private/Regularizacion/RegularizacionInternatest.html"
//            })
//            .state("RegularizacionInterna", {
//                url: "/RegularizacionInterna",
//                templateUrl: URL.INICIO + "app/private/Regularizacion/Regularizacion.html"
//            })
//            .state("Autorizacion", {
//                url: "/Autorizacion",
//                templateUrl: URL.INICIO + "app/private/Autorizacion/Autorizacion.html"
//            })
//            .state("AutorizacionFondos", {
//                url: "/AutorizacionFondos",
//                templateUrl: URL.INICIO + "app/private/FondoMutuos/AutorizacionFFMM.html"
//            })
//            .state("AutorizacionCompra", {
//                url: "/AutorizacionCompra",
//                templateUrl: URL.INICIO + "app/private/Autorizacion/Autorizacion.html"
//            })
//            .state("Puestos", {
//                url: "/Puestos",
//                templateUrl: URL.INICIO + "app/private/Puesto/puesto.html"
//            })
//            .state("otherwise", {
//                url: '*path',
//                templateUrl: URL.INICIO + 'app/public/home/home.html'
//                //templateUrl: URL.INICIO + 'app/public/login/login.html'
//                //templateUrl: 'app/home.html'
//            });

//        //$locationProvider.html5Mode(true).hashPrefix('!')
//        // use the HTML5 History API
//        //$locationProvider.html5Mode(true);
//    }


//})();