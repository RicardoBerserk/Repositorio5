

app.controller('applicationController', ['$scope', 'dataService', 'configService', 'authenticationService', function ($scope, dataService, configService, authenticationService)
{
    var vm = this;

    vm.MenuList;
    vm.validate = validate;
    vm.logout = logout;
    vm.showLogout = showLogout;
    vm.showMenus = showMenus;
    vm.callInicio = callInicio;
    vm.MenuDetailsDispo;
    vm.usuariowind;
    vm.cargarInit = cargarInit;

    $scope.metodo = function ()
    {

    }

    $scope.showDetails = false;
    $scope.MenuDetailsDisp = [];
    var serviceBase = 'http://localhost:14766/';
    //var serviceBase = 'http://localhost:14769/';
    //var serviceBase = 'http://localhost:14770/';

    //activate();
    //opcionesMenu();
    //$scope.init();
    console.log("Entra a appcontroller" );
    function opcionesMenu(url)
    {

    }

    function activate(url)
    {
        //common.activateController([Autentificado()], controllerId);
        Autentificado(url);
    };

    function Autentificado(url)
    {
    };

    function login(usuario, url)
    {
        if (usuario) {
            authenticationService.loginUsuario(usuario, url);
        } else {
            //toastr.error('Completa los campos.', 'Inicio de sesión');
        }
    };

    $scope.showMenu = function (showMenus)
    {
        if (showMenus == 1) {
            $scope.showDetails = true;
        }
        else {
            $scope.showDetails = false;
        }
    }

    $scope.showsubMenu = function (showMenus, ids)
    {
        console.log(showMenus);
        console.log(ids);
        if (showMenus == 1) {
            $scope.subChildIDS = ids;
            $scope.showSubDetails = true;
        }
        else if (showMenus == 0) {
            $scope.showSubDetails = false;
        }
        else {
            $scope.showSubDetails = true;
        }
    };

    function cargarInit(url)
    {
        console.log("Entra");
        console.log(url);
        console.log(url);
        configService.setApiUrl(url);
    }

    $scope.init = function (url)
    {
        console.log("Entra");
        console.log(url);
    }

    function callInicio()
    {
        if (!configService.getLogin()) {
            window.location = URL.INICIO;
        }
    }

    function validate()
    {
        return configService.getLogin();
    }

    function logout()
    {
        authenticationService.logout();
    }

    function showLogout()
    {
        return configService.getShowLogin();
    }

    function showMenus()
    {
        return configService.getMenus();
    }

}]);

//app.controller('applicationController', function (dataService, configService, authenticationService, $scope)
//{

//    var vm = this;

//    vm.MenuList;
//    vm.validate = validate;
//    vm.logout = logout;
//    vm.showLogout = showLogout;
//    vm.showMenus = showMenus;
//    vm.callInicio = callInicio;
//    vm.MenuDetailsDispo;
//    vm.usuariowind;
//    $scope.metodo = function ()
//    {

//    }

//    $scope.showDetails = false;
//    $scope.MenuDetailsDisp = [];
//    var serviceBase = 'http://localhost:14766/';
//    //var serviceBase = 'http://localhost:14769/';
//    //var serviceBase = 'http://localhost:14770/';

//    //activate();
//    //opcionesMenu();
//    //$scope.init();
//    function opcionesMenu(url)
//    {
//        ////var url = apiUrl;
//        ////configService.setApiUrl(url);
//        //dataService.getData(url + '/Menu/OpcionesMenu').then(function (resultado) {
//        //    if (resultado.statusText == 'OK') {
//        //        //console.log(resultado.data);
//        //        vm.MenuList = resultado.data;
//        //    }
//        //}, function (error) {
//        //    authenticationService.errorValida(error);
//        //});
//    }

//    function activate(url)
//    {
//        //common.activateController([Autentificado()], controllerId);
//        Autentificado(url);
//    };

//    function Autentificado(url)
//    {
//        //dataService.getData(url + '/Usuario/UsuarioWin').then(function (resultado) {
//        //    if (resultado.statusText == 'OK') {
//        //        vm.usuariowind = resultado.data;
//        //        if (vm.usuariowind != null || vm.usuariowind != "") {
//        //            login(vm.usuariowind, url);
//        //        } else {
//        //        }
//        //    }
//        //}, function (error) {
//        //    authenticationService.errorValida(error);
//        //});
//    };

//    function login(usuario, url)
//    {
//        if (usuario) {
//            authenticationService.loginUsuario(usuario, url);
//        } else {
//            //toastr.error('Completa los campos.', 'Inicio de sesión');
//        }
//    };

//    $scope.showMenu = function (showMenus)
//    {
//        if (showMenus == 1) {
//            $scope.showDetails = true;
//        }
//        else {
//            $scope.showDetails = false;
//        }
//    }

//    $scope.showsubMenu = function (showMenus, ids)
//    {
//        console.log(showMenus);
//        console.log(ids);
//        if (showMenus == 1) {
//            $scope.subChildIDS = ids;
//            $scope.showSubDetails = true;
//        }
//        else if (showMenus == 0) {
//            $scope.showSubDetails = false;
//        }
//        else {
//            $scope.showSubDetails = true;
//        }
//    };


//    $scope.init = function (url)
//    {
//        //console.log(url);
//        //configService.setApiUrl(url);
//        //var userComision = localStorageService.get('usuarioToken');
//        //console.log(userComision);
//        //if (userComision != null) {
//        //    if (userComision.token != null || userComision.token != "") {
//        //        console.log(configService.getLogin());
//        //        console.log(!configService.getLogin());
//        //        console.log("Entra");
//        //        //opcionesMenu(configService.getApiUrl());
//        //    } else {
//        //        console.log("no entra");
//        //        //activate(configService.getApiUrl());
//        //        //opcionesMenu(configService.getApiUrl());
//        //    }
//        //} else {
//        //    console.log("nulo todo");
//        //    //activate(configService.getApiUrl());
//        //    //opcionesMenu(configService.getApiUrl());
//        //}

//        /*
//        if (configService.getLogin()) {
//            console.log(configService.getLogin());
//            console.log(!configService.getLogin());
//            console.log("Entra");
//            activate(configService.getApiUrl());
//            opcionesMenu(configService.getApiUrl());
//            //window.location = URL.BASE + '/Default/Index#!/public';
//        } else {
//            console.log("no entra");
//            console.log(configService.getLogin());
//            console.log(!configService.getLogin());
//        //    var userLenddo = localStorageService.get('userLenddo');
//        }*/
//    }

//    function callInicio()
//    {
//        if (!configService.getLogin()) {
//            window.location = URL.INICIO;
//        }
//    }

//    function validate()
//    {
//        return configService.getLogin();
//    }

//    function logout()
//    {
//        authenticationService.logout();
//    }

//    function showLogout()
//    {
//        return configService.getShowLogin();
//    }

//    function showMenus()
//    {
//        return configService.getMenus();
//    }

//    //vm.validate = validate;
//    //vm.logout = logout;

//    //$scope.init = function (url) {
//    //    configService.setApiUrl(url);
//    //}

//    //function validate() {
//    //    return configService.getLogin();
//    //}

//    //function logout() {
//    //    authenticationServive.logout();
//    //}
//});


//(function () {

//    'use stric';

//    angular.module("appReferidos").controller("applicationController", applicationController);

//    applicationController.$inject = ['dataService', 'configService', '$state', 'localStorageService', 'toastr', 'authenticationService', '$scope', 'auth']

//    function applicationController(dataService, configService, $state, localStorageService, toastr, authenticationService, $scope, auth) {
//        var vm = this;

//        vm.MenuList;
//        vm.validate = validate;
//        vm.logout = logout;
//        vm.showLogout = showLogout;
//        vm.showMenus = showMenus;
//        vm.callInicio = callInicio;
//        vm.MenuDetailsDispo;
//        vm.usuariowind;
//        $scope.metodo = function () {

//        }

//        $scope.showDetails = false;
//        $scope.MenuDetailsDisp = [];
//        var serviceBase = 'http://localhost:14766/';
//        //var serviceBase = 'http://localhost:14769/';
//        //var serviceBase = 'http://localhost:14770/';

//        //activate();
//        //opcionesMenu();
//        //$scope.init();
//        function opcionesMenu(url) {
//            ////var url = apiUrl;
//            ////configService.setApiUrl(url);
//            //dataService.getData(url + '/Menu/OpcionesMenu').then(function (resultado) {
//            //    if (resultado.statusText == 'OK') {
//            //        //console.log(resultado.data);
//            //        vm.MenuList = resultado.data;
//            //    }
//            //}, function (error) {
//            //    authenticationService.errorValida(error);
//            //});
//        }

//        function activate(url) {
//            //common.activateController([Autentificado()], controllerId);
//            Autentificado(url);
//        };

//        function Autentificado(url) {
//            //dataService.getData(url + '/Usuario/UsuarioWin').then(function (resultado) {
//            //    if (resultado.statusText == 'OK') {
//            //        vm.usuariowind = resultado.data;
//            //        if (vm.usuariowind != null || vm.usuariowind != "") {
//            //            login(vm.usuariowind, url);
//            //        } else {
//            //        }
//            //    }
//            //}, function (error) {
//            //    authenticationService.errorValida(error);
//            //});
//        };

//        function login(usuario, url) {
//            if (usuario) {
//                authenticationService.loginUsuario(usuario, url);
//            } else {
//                toastr.error('Completa los campos.', 'Inicio de sesión');
//            }
//        };

//        $scope.showMenu = function (showMenus) {
//            if (showMenus == 1) {
//                $scope.showDetails = true;
//            }
//            else {
//                $scope.showDetails = false;
//            }
//        }

//        $scope.showsubMenu = function (showMenus, ids) {
//            console.log(showMenus);
//            console.log(ids);
//            if (showMenus == 1) {
//                $scope.subChildIDS = ids;
//                $scope.showSubDetails = true;
//            }
//            else if (showMenus == 0) {
//                $scope.showSubDetails = false;
//            }
//            else {
//                $scope.showSubDetails = true;
//            }
//        };


//        $scope.init = function (url) {
//            console.log(url);
//            configService.setApiUrl(url);
//            var userComision = localStorageService.get('usuarioToken');
//            console.log(userComision);
//            if (userComision != null) {
//                if (userComision.token != null || userComision.token != "") {
//                    console.log(configService.getLogin());
//                    console.log(!configService.getLogin());
//                    console.log("Entra");
//                    //opcionesMenu(configService.getApiUrl());
//                } else {
//                    console.log("no entra");
//                    //activate(configService.getApiUrl());
//                    //opcionesMenu(configService.getApiUrl());
//                }
//            } else {
//                console.log("nulo todo");
//                //activate(configService.getApiUrl());
//                //opcionesMenu(configService.getApiUrl());
//            }
            
//            /*
//            if (configService.getLogin()) {
//                console.log(configService.getLogin());
//                console.log(!configService.getLogin());
//                console.log("Entra");
//                activate(configService.getApiUrl());
//                opcionesMenu(configService.getApiUrl());
//                //window.location = URL.BASE + '/Default/Index#!/public';
//            } else {
//                console.log("no entra");
//                console.log(configService.getLogin());
//                console.log(!configService.getLogin());
//            //    var userLenddo = localStorageService.get('userLenddo');
//            }*/
//        }

//        function callInicio() {
//            if (!configService.getLogin()) {
//                window.location = URL.INICIO;
//            }
//        }

//        function validate() {
//            return configService.getLogin();
//        }

//        function logout() {
//            authenticationService.logout();
//        }

//        function showLogout() {
//            return configService.getShowLogin();
//        }

//        function showMenus() {
//            return configService.getMenus();
//        }

//        //vm.validate = validate;
//        //vm.logout = logout;

//        //$scope.init = function (url) {
//        //    configService.setApiUrl(url);
//        //}

//        //function validate() {
//        //    return configService.getLogin();
//        //}

//        //function logout() {
//        //    authenticationServive.logout();
//        //}
//    }

//})();

