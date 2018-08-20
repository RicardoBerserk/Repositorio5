

app.controller('controladorInicio', ['$scope', 'dataService', 'configService', 'authenticationService', function ($scope, dataService, configService, authenticationService)
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
    console.log("Entra a appcontroller");
   

    function callInicio()
    {
        if (!configService.getLogin()) {
            window.location = URL.INICIO;
        }
    }


}]);



