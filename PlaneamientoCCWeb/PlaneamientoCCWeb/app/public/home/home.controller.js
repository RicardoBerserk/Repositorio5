
//app.controller('homeController', function ($scope, $http)
//{
//    console.log("Cargando...");

//    $scope.showsubMenu = function (showMenus, ids)
//    {
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
//    }

//    $scope.getUrl = function (source, isParent)
//    {
//        console.log(source);
//        console.log(isParent);
//        //return source = (!isParent) ? 'javascript:;' :source; //: 'javascript:;';
//        return source = isParent ? '' : source; //: 'javascript:;';
//        //if (isParent) '#'

//        //return source.element == 0 ? '#' : '#/resource/' + source.a + '/' + source.b + '/val';
//    }
//});


//(function (undefined) {
//    'use strict';

//    angular.module('appReferidos').controller('homeController', homeController);

//    homeController.$inject = ['$state', '$scope', '$http'];

//    function homeController($state, $scope, $http) {

//        console.log("Cargando...");
     
//        $scope.showsubMenu = function (showMenus, ids) {
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
//        }

//        $scope.getUrl = function (source, isParent) {
//            console.log(source);
//            console.log(isParent);
//            //return source = (!isParent) ? 'javascript:;' :source; //: 'javascript:;';
//            return source = isParent ? '' : source; //: 'javascript:;';
//            //if (isParent) '#'

//            //return source.element == 0 ? '#' : '#/resource/' + source.a + '/' + source.b + '/val';
//        }
      

//    }

//})();