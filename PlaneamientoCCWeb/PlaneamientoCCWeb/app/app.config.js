//(function () {

//    'use strict';

//    angular.module('appReferidos').config(config).run(run);

//    config.$inject = ['$compileProvider'];

//    function config($compileProvider) {
//        $compileProvider.debugInfoEnabled(true);
//    }

//    run.$inject = ['$http', '$state', 'localStorageService', 'configService', '$rootScope'];

//    function run($http, $state, localStorageService, configService, $rootScope) {

//        var user = localStorageService.get('usuarioToken');

//        if (user && user.token != '') {
//            $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
//            //configService.setLogin(true);
//            //configService.setShowLogin(true);
//            var user = localStorageService.get('userToken');
//            //configService.setDocumento(user.nNroDoc);
//            //configService.setUserName(user.userName);
//            //configService.setPersona(user.nCodPers);
//            /*
//            var userState = localStorageService.get('userState');
//            if (userState) {
//                configService.setChangePass(userState.state);
//            } else {
//                configService.setChangePass(1);
//            }*/
//        } else {
//            $state.go('login');
//        }
//    }


//})();


