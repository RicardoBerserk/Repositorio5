///// <reference path="../../Scripts/angular.js" />

//(function () {
//    'use strict';

//    angular.module('appReferidos').controller('loginController', loginController);

//    loginController.$inject = ['authenticationService', '$state', 'configService', 'toastr', 'dataService', '$http']

//    function loginController(authenticationService, $state, configService, toastr, dataService, $http) {
//        var apiUrl = configService.getApiUrl();
//        var vm = this;
//        vm.user = {};
//        vm.userCambio = {};
//        vm.singIn = login;
//        //vm.validarCambio = validarCambio;
//        //vm.cambiarContrasena = cambiarContrasena;
//        vm.Codigo;
//        vm.Celular;

//        var serviceBase = 'http://localhost:14766/';
//        //var serviceBase = 'http://localhost:14769/';
//        //var serviceBase = 'http://localhost:14770/';

//        //init();

//        function init() {
//            if (configService.getLogin()) return $state.go('dashboard');
//            configService.setMenus(false);
//            var data = "grant_type=password&username=tibox@tibox.com.pe&password=TiboxWebApi&tipo=lucas";
//            //var url = apiUrl + 'token';
//            var url = serviceBase + 'token';
//            $http.post(url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (result) {
//                if (result.statusText == 'OK') {
//                    $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;
//                };
//            }, function (error) {
//                toastr.error('Error al cargar la pagína...', 'Error');
//            });
//        };


//        function login(valid) {
//            console.log(valid);
//            if (valid) {
//                authenticationService.login(vm.user);
//            } else {
//                //authenticationService.login(vm.user);
//                toastr.error('Completa los campos.', 'Inicio de sesión');
//            }
//        };

//    }

//})();
