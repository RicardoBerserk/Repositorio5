
app.factory('authenticationService', ['$http', 'configService', function ($http, configService)
{
    //var apiUrl = configService.getApiUrl();
    var service = {};
    service.login = login;
    service.logout = logout;
    service.errorValida = errorValida;
    service.loginUsuario = loginUsuario;
    service.loginUsuarioWindows = loginUsuarioWindows;
    var user;

    var serviceBase = 'http://localhost:14766/';
    //var serviceBase = 'http://localhost:14769/';

    return service;

    function login(user)
    {
        var deferred = $q.defer();
        console.log(user);
        //var url = configService.getApiUrl() + 'token';
        //var url = serviceBase + 'token';
        var url = 'http://localhost:14766/token';
        //var url = 'http://localhost:14769/token';
        //var url = 'http://localhost:14770/token';
        var apiUrl = configService.getApiUrl();
        console.log(apiUrl);
        var data = "grant_type=password&username=" + user.userName + "&password=" + user.password;
        console.log(data);
        //var data = "grant_type=password&username=" + "lucas" + "&password=" + "lucas" + "&tipo=lucas";
        //$http.post(url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (result) {
        $http.post(url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (result)
        {

            if (result.statusText == 'OK') {
                console.log(result.data.access_token);
                $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;

            }
        }, function (error)
        {
            errorValida(error);
            //toastr.error('Usuario y/o contraseña invalidos.', 'Error');
            //configService.setLogin(false);
        });
    }

    function logout()
    {
        $http.defaults.headers.common.Authorization = '';

        //localStorageService.remove('userState');
        //configService.setLogin(false);
        //configService.setShowLogin(false);
        window.location = URL.INICIO;
    };

    function loginUsuario(user)
    {
        //var url = configService.getApiUrl() + '/token';
        var url = configService.getApiUrl();
        var apiUrl = configService.getApiUrl();
        var data = "grant_type=password&username=" + user + "&password=" + user;
        $http.post(url + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (result)
        {
            if (result.statusText == 'OK') {
                $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;
                var usuario = { firmaUsuario: user };
                $http.post(url + '/Usuario/DatosUsuario', usuario).then(function (resultDatos)
                {
                    if (resultDatos.statusText == 'OK') {
                        //localStorageService.set('usuarioToken', {
                        //    token: result.data.access_token,
                        //    codigoEmpleado: user.codigoEmpleado,
                        //    codigoUsuario: resultDatos.data.codigoUsuario,
                        //    codigoBT: resultDatos.data.codigoBT,
                        //    CDR: resultDatos.data.CDR,
                        //    nombre: resultDatos.data.nombre,
                        //    firmaUsuario: resultDatos.data.firmaUsuario,
                        //    correo: resultDatos.data.correo
                        //});
                        //configService.setLogin(true);
                        //$state.go('home');
                        //toastr.success('Bienvenido ' + resultDatos.data.nombre, 'COMISIONES');
                    }
                }, function (error) { errorValida(error); });
            }
        }, function (error)
        {
            errorValida(error);
            //toastr.error('Usuario y/o contraseña invalidos.', 'Error');
            configService.setLogin(false);
        });
    };

    function loginUsuarioWindows()
    {
        if (user) {
            return $q.when(user); // resolve with given value, necessary because calling function expects a promise.
        }
        $http.get(apiUrl + '/Usuario/UsuarioActual').then(function (result)
        {
            if (result.statusText == 'OK') {
                console.log(result);
            }
        }, function (error)
        {
            errorValida(error);
            toastr.error('Usuario invalido.', 'Error');
            configService.setLogin(false);
        });
    };


    function errorValida(error)
    {
        console.log(error);
        modalCargaCerrar();
        if (error.statusText == 'Unauthorized') {
            toastr.warning('Tu sesion a caducado, por favor vuelve a iniciar!', 'Alerta');
            //logout();
        } else if (error.statusText == 'Bad Request') {
            if (error.data.error == 'invalid_grant') {
                console.log('Usuario y/o contrasenia invalidos!!!');
            } else {
                //modalCargaLlamarError("Bad Request")
            }
        } else if (error.statusText == 'Internal Server Error') {
            toastr.error('Tu conexión a internet es muy lenta, por favor verifica tu señal de internet.', 'COMFFVV');
            //modalCargaLlamarError("Tu conexión a internet es muy lenta, por favor verifica tu señal de internet.")
            //logout();
        } else if (error.statusText == '') {
            //modalCargaLlamarError("Error no se encontro el servidor.")
            toastr.error('Error no se encontro el servidor.', 'COMFFVV');
        } else {
            toastr.error('Error ', 'COMFFVV');
        }
        //pintaConsola();
    }

    return {
        service: service
    }
}]);


//app.factory('authenticationService', function ($http, configService)
//{
    
//});




//(function ()
//{

//    'use strict';

//    angular.module('appReferidos').factory('authenticationService', authenticationService);

//    authenticationService.$inject = ['$http', '$state', 'localStorageService', 'configService', '$q', 'toastr'];

//    function authenticationService($http, $state, localStorageService, configService, $q, toastr) {
//        //var apiUrl = configService.getApiUrl();
//        var service = {};
//        service.login = login;
//        service.logout = logout;
//        service.errorValida = errorValida;
//        service.loginUsuario = loginUsuario;
//        service.loginUsuarioWindows = loginUsuarioWindows;
//        var user;

//        var serviceBase = 'http://localhost:14766/';
//        //var serviceBase = 'http://localhost:14769/';

//        return service;

//        function login(user) {
//            var deferred = $q.defer();
//            console.log(user);
//            //var url = configService.getApiUrl() + 'token';
//            //var url = serviceBase + 'token';
//            var url = 'http://localhost:14766/token';
//            //var url = 'http://localhost:14769/token';
//            //var url = 'http://localhost:14770/token';
//            var apiUrl = configService.getApiUrl();
//            console.log(apiUrl);
//            var data = "grant_type=password&username=" + user.userName + "&password=" + user.password;
//            console.log(data);
//            //var data = "grant_type=password&username=" + "lucas" + "&password=" + "lucas" + "&tipo=lucas";
//            //$http.post(url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (result) {
//            $http.post(url, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (result) {

//                if (result.statusText == 'OK') {
//                    console.log(result.data.access_token);
//                    $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;

//                }
//            }, function (error) {
//                errorValida(error);
//                //toastr.error('Usuario y/o contraseña invalidos.', 'Error');
//                configService.setLogin(false);
//            });
//        }

//        function logout() {
//            $http.defaults.headers.common.Authorization = '';
//            localStorageService.remove('usuarioToken');
//            //localStorageService.remove('userState');
//            configService.setLogin(false);
//            configService.setShowLogin(false);
//            window.location = URL.INICIO;
//        };

//        function loginUsuario(user) {
//            //var url = configService.getApiUrl() + '/token';
//            var url = configService.getApiUrl();
//            var apiUrl = configService.getApiUrl();
//            var data = "grant_type=password&username=" + user + "&password=" + user;
//            $http.post(url + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (result) {
//                if (result.statusText == 'OK') {
//                    $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;
//                    var usuario = { firmaUsuario: user };
//                    $http.post(url + '/Usuario/DatosUsuario', usuario).then(function (resultDatos) {
//                        if (resultDatos.statusText == 'OK') {
//                            localStorageService.set('usuarioToken', {
//                                token: result.data.access_token,
//                                codigoEmpleado: user.codigoEmpleado,
//                                codigoUsuario: resultDatos.data.codigoUsuario,
//                                codigoBT: resultDatos.data.codigoBT,
//                                CDR: resultDatos.data.CDR,
//                                nombre: resultDatos.data.nombre,
//                                firmaUsuario: resultDatos.data.firmaUsuario,
//                                correo: resultDatos.data.correo
//                            });
//                            configService.setLogin(true);
//                            $state.go('home');
//                            toastr.success('Bienvenido ' + resultDatos.data.nombre, 'COMISIONES');
//                        }
//                    }, function (error) { errorValida(error);});
//                }
//            }, function (error) {
//                errorValida(error);
//                //toastr.error('Usuario y/o contraseña invalidos.', 'Error');
//                configService.setLogin(false);
//            });
//        };

//        function loginUsuarioWindows() {
//            if (user) {
//                return $q.when(user); // resolve with given value, necessary because calling function expects a promise.
//            }
//            $http.get(apiUrl + '/Usuario/UsuarioActual').then(function (result) {
//                if (result.statusText == 'OK') {
//                    console.log(result);
//                }
//            }, function (error) {
//                errorValida(error);
//                toastr.error('Usuario invalido.', 'Error');
//                configService.setLogin(false);
//            });
//        };


//        function errorValida(error) {
//            console.log( error);
//            modalCargaCerrar();
//            if (error.statusText == 'Unauthorized') {
//                toastr.warning('Tu sesion a caducado, por favor vuelve a iniciar!', 'Alerta');
//                //logout();
//            } else if (error.statusText == 'Bad Request') {
//                if (error.data.error == 'invalid_grant') {
//                    console.log('Usuario y/o contrasenia invalidos!!!');
//                } else {
//                    //modalCargaLlamarError("Bad Request")
//                }
//            } else if (error.statusText == 'Internal Server Error') {
//                toastr.error('Tu conexión a internet es muy lenta, por favor verifica tu señal de internet.', 'COMFFVV');
//                //modalCargaLlamarError("Tu conexión a internet es muy lenta, por favor verifica tu señal de internet.")
//                //logout();
//            } else if (error.statusText == '') {
//                //modalCargaLlamarError("Error no se encontro el servidor.")
//                toastr.error('Error no se encontro el servidor.', 'COMFFVV');
//            } else {
//                toastr.error('Error ', 'COMFFVV');
//            }
//            //pintaConsola();
//        }

//        return {
//            service: service
//        }
//    }


//})();