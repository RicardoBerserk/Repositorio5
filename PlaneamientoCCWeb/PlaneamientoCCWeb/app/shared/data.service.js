'use strict';
app.service('dataService', ['$http', 'configService', function ($http, configService)
{

    var service = {};
    service.getData = getData;
    service.postData = postData;
    service.putData = putData;
    service.deleteData = deleteData;

    return service;

    function salir()
    {

    }

    function getData(url)
    {
        salir();
        return $http.get(url);
    }

    function postData(url, data)
    {
        salir();
        return $http.post(url, data);
    }

    function putData(url, data)
    {
        salir();
        return $http.put(url, data);
    }

    function deleteData(url)
    {
        salir();
        return $http.delete(url);
    }
}]);





//(function ()
//{

//    'use strict';

//    angular.module('appReferidos').factory('dataService', dataService);

//    dataService.$inject = ['$http', '$state', 'localStorageService', 'configService'];

//    function dataService($http, $state, localStorageService, configService) {

//        var service = {};
//        service.getData = getData;
//        service.postData = postData;
//        service.putData = putData;
//        service.deleteData = deleteData;

//        return service;

//        function salir() {
//            if (configService.getLogin()) {
//                var user = localStorageService.get('userToken');
//                if (user && user.token != '') {
//                } else {
//                    $http.defaults.headers.common.Authorization = '';
//                    configService.setLogin(false);
//                    configService.setShowLogin(false);
//                }
//            } else {
//                //pintaConsola();
//            }
//        }

//        function getData(url) {
//            salir();
//            return $http.get(url);
//        }

//        function postData(url, data) {
//            salir();
//            return $http.post(url, data);
//        }

//        function putData(url, data) {
//            salir();
//            return $http.put(url, data);
//        }

//        function deleteData(url) {
//            salir();
//            return $http.delete(url);
//        }

//    }

//})();