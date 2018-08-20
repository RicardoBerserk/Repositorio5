
app.controller('puestoController', ['$scope', 'dataService', 'configService', 'authenticationService', function ($scope, dataService, configService, authenticationService)
{

        var vm = this;
        vm.data = {
            codempresa: ""
        }
        vm.empresaList;
        console.log("puesto nuevo...");
        LoadEmpresa();
        function LoadEmpresa()
        {
            vm.empresaList = [{
                id: "01",
                nombre: "Scotiabank",
            }, {
                id: "02",
                nombre: "CrediScotia",
            }];
        };

        $scope.Nuevo = function ()
        {
            //$scope.LimpiarPerfil();
            $scope.disabledCodPerfil = false;
            fc_AbrirModal_Form("dialog-form-Perfil", "puestoController", "g", 400, 300, "open");
        };

        vm.CargaDataPorEmpresa = CargaDataPorEmpresa;
        $scope.example14model = [];
        $scope.example14settings = {
            scrollableHeight: '200px',
            scrollable: true,
            enableSearch: true
        };

        $scope.example2settings = {
            displayProp: 'id'
        };
        //$scope.example14data = [{
        //    "label": "Alabama",
        //    "id": "AL"
        //}, {
        //    "label": "Alaska",
        //    "id": "AK"
        //}, {
        //    "label": "American Samoa",
        //    "id": "AS"
        //}, {
        //    "label": "Arizona",
        //    "id": "AZ"
        //}, {
        //    "label": "Arkansas",
        //    "id": "AR"
        //}, {
        //    "label": "California",
        //    "id": "CA"
        //}, {
        //    "label": "Colorado",
        //    "id": "CO"
        //}, {
        //    "label": "Connecticut",
        //    "id": "CT"
        //}, {
        //    "label": "Delaware",
        //    "id": "DE"
        //}, {
        //    "label": "District Of Columbia",
        //    "id": "DC"
        //}, {
        //    "label": "Federated States Of Micronesia",
        //    "id": "FM"
        //}, {
        //    "label": "Florida",
        //    "id": "FL"
        //}, {
        //    "label": "Georgia",
        //    "id": "GA"
        //}, {
        //    "label": "Guam",
        //    "id": "GU"
        //}, {
        //    "label": "Hawaii",
        //    "id": "HI"
        //}, {
        //    "label": "Idaho",
        //    "id": "ID"
        //}, {
        //    "label": "Illinois",
        //    "id": "IL"
        //}, {
        //    "label": "Indiana",
        //    "id": "IN"
        //}, {
        //    "label": "Iowa",
        //    "id": "IA"
        //}, {
        //    "label": "Kansas",
        //    "id": "KS"
        //}, {
        //    "label": "Kentucky",
        //    "id": "KY"
        //}, {
        //    "label": "Louisiana",
        //    "id": "LA"
        //}, {
        //    "label": "Maine",
        //    "id": "ME"
        //}, {
        //    "label": "Marshall Islands",
        //    "id": "MH"
        //}, {
        //    "label": "Maryland",
        //    "id": "MD"
        //}, {
        //    "label": "Massachusetts",
        //    "id": "MA"
        //}, {
        //    "label": "Michigan",
        //    "id": "MI"
        //}, {
        //    "label": "Minnesota",
        //    "id": "MN"
        //}, {
        //    "label": "Mississippi",
        //    "id": "MS"
        //}, {
        //    "label": "Missouri",
        //    "id": "MO"
        //}, {
        //    "label": "Montana",
        //    "id": "MT"
        //}, {
        //    "label": "Nebraska",
        //    "id": "NE"
        //}, {
        //    "label": "Nevada",
        //    "id": "NV"
        //}, {
        //    "label": "New Hampshire",
        //    "id": "NH"
        //}, {
        //    "label": "New Jersey",
        //    "id": "NJ"
        //}, {
        //    "label": "New Mexico",
        //    "id": "NM"
        //}, {
        //    "label": "New York",
        //    "id": "NY"
        //}, {
        //    "label": "North Carolina",
        //    "id": "NC"
        //}, {
        //    "label": "North Dakota",
        //    "id": "ND"
        //}, {
        //    "label": "Northern Mariana Islands",
        //    "id": "MP"
        //}, {
        //    "label": "Ohio",
        //    "id": "OH"
        //}, {
        //    "label": "Oklahoma",
        //    "id": "OK"
        //}, {
        //    "label": "Oregon",
        //    "id": "OR"
        //}, {
        //    "label": "Palau",
        //    "id": "PW"
        //}, {
        //    "label": "Pennsylvania",
        //    "id": "PA"
        //}, {
        //    "label": "Puerto Rico",
        //    "id": "PR"
        //}, {
        //    "label": "Rhode Island",
        //    "id": "RI"
        //}, {
        //    "label": "South Carolina",
        //    "id": "SC"
        //}, {
        //    "label": "South Dakota",
        //    "id": "SD"
        //}, {
        //    "label": "Tennessee",
        //    "id": "TN"
        //}, {
        //    "label": "Texas",
        //    "id": "TX"
        //}, {
        //    "label": "Utah",
        //    "id": "UT"
        //}, {
        //    "label": "Vermont",
        //    "id": "VT"
        //}, {
        //    "label": "Virgin Islands",
        //    "id": "VI"
        //}, {
        //    "label": "Virginia",
        //    "id": "VA"
        //}, {
        //    "label": "Washington",
        //    "id": "WA"
        //}, {
        //    "label": "West Virginia",
        //    "id": "WV"
        //}, {
        //    "label": "Wisconsin",
        //    "id": "WI"
        //}, {
        //    "label": "Wyoming",
        //    "id": "WY"
        //}];
        function CargaDataPorEmpresa(idEmpresa)
        {
            console.log("Entro");
            loadData();

        };

        function loadData()
        {
            $scope.example14data = [{
                "label": "Alabama",
                "id": "AL"
            }, {
                "label": "Alaska",
                "id": "AK"
            }, {
                "label": "American Samoa",
                "id": "AS"
            }, {
                "label": "Arizona",
                "id": "AZ"
            }, {
                "label": "Arkansas",
                "id": "AR"
            }, {
                "label": "California",
                "id": "CA"
            }, {
                "label": "Colorado",
                "id": "CO"
            }, {
                "label": "Connecticut",
                "id": "CT"
            }, {
                "label": "Delaware",
                "id": "DE"
            }, {
                "label": "District Of Columbia",
                "id": "DC"
            }, {
                "label": "Federated States Of Micronesia",
                "id": "FM"
            }, {
                "label": "Florida",
                "id": "FL"
            }, {
                "label": "Georgia",
                "id": "GA"
            }, {
                "label": "Guam",
                "id": "GU"
            }, {
                "label": "Hawaii",
                "id": "HI"
            }, {
                "label": "Idaho",
                "id": "ID"
            }, {
                "label": "Illinois",
                "id": "IL"
            }, {
                "label": "Indiana",
                "id": "IN"
            }, {
                "label": "Iowa",
                "id": "IA"
            }, {
                "label": "Kansas",
                "id": "KS"
            }, {
                "label": "Kentucky",
                "id": "KY"
            }, {
                "label": "Louisiana",
                "id": "LA"
            }, {
                "label": "Maine",
                "id": "ME"
            }, {
                "label": "Marshall Islands",
                "id": "MH"
            }, {
                "label": "Maryland",
                "id": "MD"
            }, {
                "label": "Massachusetts",
                "id": "MA"
            }, {
                "label": "Michigan",
                "id": "MI"
            }, {
                "label": "Minnesota",
                "id": "MN"
            }, {
                "label": "Mississippi",
                "id": "MS"
            }, {
                "label": "Missouri",
                "id": "MO"
            }, {
                "label": "Montana",
                "id": "MT"
            }, {
                "label": "Nebraska",
                "id": "NE"
            }, {
                "label": "Nevada",
                "id": "NV"
            }, {
                "label": "New Hampshire",
                "id": "NH"
            }, {
                "label": "New Jersey",
                "id": "NJ"
            }, {
                "label": "New Mexico",
                "id": "NM"
            }, {
                "label": "New York",
                "id": "NY"
            }, {
                "label": "North Carolina",
                "id": "NC"
            }, {
                "label": "North Dakota",
                "id": "ND"
            }, {
                "label": "Northern Mariana Islands",
                "id": "MP"
            }, {
                "label": "Ohio",
                "id": "OH"
            }, {
                "label": "Oklahoma",
                "id": "OK"
            }, {
                "label": "Oregon",
                "id": "OR"
            }, {
                "label": "Palau",
                "id": "PW"
            }, {
                "label": "Pennsylvania",
                "id": "PA"
            }, {
                "label": "Puerto Rico",
                "id": "PR"
            }, {
                "label": "Rhode Island",
                "id": "RI"
            }, {
                "label": "South Carolina",
                "id": "SC"
            }, {
                "label": "South Dakota",
                "id": "SD"
            }, {
                "label": "Tennessee",
                "id": "TN"
            }, {
                "label": "Texas",
                "id": "TX"
            }, {
                "label": "Utah",
                "id": "UT"
            }, {
                "label": "Vermont",
                "id": "VT"
            }, {
                "label": "Virgin Islands",
                "id": "VI"
            }, {
                "label": "Virginia",
                "id": "VA"
            }, {
                "label": "Washington",
                "id": "WA"
            }, {
                "label": "West Virginia",
                "id": "WV"
            }, {
                "label": "Wisconsin",
                "id": "WI"
            }, {
                "label": "Wyoming",
                "id": "WY"
            }];

        }
        //$scope.$watch("nombre", function (newValue, oldValue)
        //{

        //    if (newValue === oldValue) {
        //        return;
        //    }

        //    alert("El nuevo valor es " + newValue);
        //});

        $scope.$watch('example14model', function ()
        {
            //alert('hey, myVar has changed!');
            console.log($scope.example14model);

        });
}]);


//app.controller('puestoController', function ($scope, $http)
//{
//    var vm = this;
//    vm.data = {
//        codempresa: ""
//    }
//    vm.empresaList;
//    console.log("puesto nuevo...");
//    LoadEmpresa();
//    function LoadEmpresa()
//    {
//        vm.empresaList = [{
//            id: "01",
//            nombre: "Scotiabank",
//        }, {
//            id: "02",
//            nombre: "CrediScotia",
//        }];
//    };
//    vm.CargaDataPorEmpresa = CargaDataPorEmpresa;
//    $scope.example14model = [];
//    $scope.example14settings = {
//        scrollableHeight: '200px',
//        scrollable: true,
//        enableSearch: true
//    };

//    $scope.example2settings = {
//        displayProp: 'id'
//    };
//    //$scope.example14data = [{
//    //    "label": "Alabama",
//    //    "id": "AL"
//    //}, {
//    //    "label": "Alaska",
//    //    "id": "AK"
//    //}, {
//    //    "label": "American Samoa",
//    //    "id": "AS"
//    //}, {
//    //    "label": "Arizona",
//    //    "id": "AZ"
//    //}, {
//    //    "label": "Arkansas",
//    //    "id": "AR"
//    //}, {
//    //    "label": "California",
//    //    "id": "CA"
//    //}, {
//    //    "label": "Colorado",
//    //    "id": "CO"
//    //}, {
//    //    "label": "Connecticut",
//    //    "id": "CT"
//    //}, {
//    //    "label": "Delaware",
//    //    "id": "DE"
//    //}, {
//    //    "label": "District Of Columbia",
//    //    "id": "DC"
//    //}, {
//    //    "label": "Federated States Of Micronesia",
//    //    "id": "FM"
//    //}, {
//    //    "label": "Florida",
//    //    "id": "FL"
//    //}, {
//    //    "label": "Georgia",
//    //    "id": "GA"
//    //}, {
//    //    "label": "Guam",
//    //    "id": "GU"
//    //}, {
//    //    "label": "Hawaii",
//    //    "id": "HI"
//    //}, {
//    //    "label": "Idaho",
//    //    "id": "ID"
//    //}, {
//    //    "label": "Illinois",
//    //    "id": "IL"
//    //}, {
//    //    "label": "Indiana",
//    //    "id": "IN"
//    //}, {
//    //    "label": "Iowa",
//    //    "id": "IA"
//    //}, {
//    //    "label": "Kansas",
//    //    "id": "KS"
//    //}, {
//    //    "label": "Kentucky",
//    //    "id": "KY"
//    //}, {
//    //    "label": "Louisiana",
//    //    "id": "LA"
//    //}, {
//    //    "label": "Maine",
//    //    "id": "ME"
//    //}, {
//    //    "label": "Marshall Islands",
//    //    "id": "MH"
//    //}, {
//    //    "label": "Maryland",
//    //    "id": "MD"
//    //}, {
//    //    "label": "Massachusetts",
//    //    "id": "MA"
//    //}, {
//    //    "label": "Michigan",
//    //    "id": "MI"
//    //}, {
//    //    "label": "Minnesota",
//    //    "id": "MN"
//    //}, {
//    //    "label": "Mississippi",
//    //    "id": "MS"
//    //}, {
//    //    "label": "Missouri",
//    //    "id": "MO"
//    //}, {
//    //    "label": "Montana",
//    //    "id": "MT"
//    //}, {
//    //    "label": "Nebraska",
//    //    "id": "NE"
//    //}, {
//    //    "label": "Nevada",
//    //    "id": "NV"
//    //}, {
//    //    "label": "New Hampshire",
//    //    "id": "NH"
//    //}, {
//    //    "label": "New Jersey",
//    //    "id": "NJ"
//    //}, {
//    //    "label": "New Mexico",
//    //    "id": "NM"
//    //}, {
//    //    "label": "New York",
//    //    "id": "NY"
//    //}, {
//    //    "label": "North Carolina",
//    //    "id": "NC"
//    //}, {
//    //    "label": "North Dakota",
//    //    "id": "ND"
//    //}, {
//    //    "label": "Northern Mariana Islands",
//    //    "id": "MP"
//    //}, {
//    //    "label": "Ohio",
//    //    "id": "OH"
//    //}, {
//    //    "label": "Oklahoma",
//    //    "id": "OK"
//    //}, {
//    //    "label": "Oregon",
//    //    "id": "OR"
//    //}, {
//    //    "label": "Palau",
//    //    "id": "PW"
//    //}, {
//    //    "label": "Pennsylvania",
//    //    "id": "PA"
//    //}, {
//    //    "label": "Puerto Rico",
//    //    "id": "PR"
//    //}, {
//    //    "label": "Rhode Island",
//    //    "id": "RI"
//    //}, {
//    //    "label": "South Carolina",
//    //    "id": "SC"
//    //}, {
//    //    "label": "South Dakota",
//    //    "id": "SD"
//    //}, {
//    //    "label": "Tennessee",
//    //    "id": "TN"
//    //}, {
//    //    "label": "Texas",
//    //    "id": "TX"
//    //}, {
//    //    "label": "Utah",
//    //    "id": "UT"
//    //}, {
//    //    "label": "Vermont",
//    //    "id": "VT"
//    //}, {
//    //    "label": "Virgin Islands",
//    //    "id": "VI"
//    //}, {
//    //    "label": "Virginia",
//    //    "id": "VA"
//    //}, {
//    //    "label": "Washington",
//    //    "id": "WA"
//    //}, {
//    //    "label": "West Virginia",
//    //    "id": "WV"
//    //}, {
//    //    "label": "Wisconsin",
//    //    "id": "WI"
//    //}, {
//    //    "label": "Wyoming",
//    //    "id": "WY"
//    //}];
//    function CargaDataPorEmpresa(idEmpresa)
//    {
//        console.log("Entro");
//        loadData();

//    };

//    function loadData()
//    {
//        $scope.example14data = [{
//            "label": "Alabama",
//            "id": "AL"
//        }, {
//            "label": "Alaska",
//            "id": "AK"
//        }, {
//            "label": "American Samoa",
//            "id": "AS"
//        }, {
//            "label": "Arizona",
//            "id": "AZ"
//        }, {
//            "label": "Arkansas",
//            "id": "AR"
//        }, {
//            "label": "California",
//            "id": "CA"
//        }, {
//            "label": "Colorado",
//            "id": "CO"
//        }, {
//            "label": "Connecticut",
//            "id": "CT"
//        }, {
//            "label": "Delaware",
//            "id": "DE"
//        }, {
//            "label": "District Of Columbia",
//            "id": "DC"
//        }, {
//            "label": "Federated States Of Micronesia",
//            "id": "FM"
//        }, {
//            "label": "Florida",
//            "id": "FL"
//        }, {
//            "label": "Georgia",
//            "id": "GA"
//        }, {
//            "label": "Guam",
//            "id": "GU"
//        }, {
//            "label": "Hawaii",
//            "id": "HI"
//        }, {
//            "label": "Idaho",
//            "id": "ID"
//        }, {
//            "label": "Illinois",
//            "id": "IL"
//        }, {
//            "label": "Indiana",
//            "id": "IN"
//        }, {
//            "label": "Iowa",
//            "id": "IA"
//        }, {
//            "label": "Kansas",
//            "id": "KS"
//        }, {
//            "label": "Kentucky",
//            "id": "KY"
//        }, {
//            "label": "Louisiana",
//            "id": "LA"
//        }, {
//            "label": "Maine",
//            "id": "ME"
//        }, {
//            "label": "Marshall Islands",
//            "id": "MH"
//        }, {
//            "label": "Maryland",
//            "id": "MD"
//        }, {
//            "label": "Massachusetts",
//            "id": "MA"
//        }, {
//            "label": "Michigan",
//            "id": "MI"
//        }, {
//            "label": "Minnesota",
//            "id": "MN"
//        }, {
//            "label": "Mississippi",
//            "id": "MS"
//        }, {
//            "label": "Missouri",
//            "id": "MO"
//        }, {
//            "label": "Montana",
//            "id": "MT"
//        }, {
//            "label": "Nebraska",
//            "id": "NE"
//        }, {
//            "label": "Nevada",
//            "id": "NV"
//        }, {
//            "label": "New Hampshire",
//            "id": "NH"
//        }, {
//            "label": "New Jersey",
//            "id": "NJ"
//        }, {
//            "label": "New Mexico",
//            "id": "NM"
//        }, {
//            "label": "New York",
//            "id": "NY"
//        }, {
//            "label": "North Carolina",
//            "id": "NC"
//        }, {
//            "label": "North Dakota",
//            "id": "ND"
//        }, {
//            "label": "Northern Mariana Islands",
//            "id": "MP"
//        }, {
//            "label": "Ohio",
//            "id": "OH"
//        }, {
//            "label": "Oklahoma",
//            "id": "OK"
//        }, {
//            "label": "Oregon",
//            "id": "OR"
//        }, {
//            "label": "Palau",
//            "id": "PW"
//        }, {
//            "label": "Pennsylvania",
//            "id": "PA"
//        }, {
//            "label": "Puerto Rico",
//            "id": "PR"
//        }, {
//            "label": "Rhode Island",
//            "id": "RI"
//        }, {
//            "label": "South Carolina",
//            "id": "SC"
//        }, {
//            "label": "South Dakota",
//            "id": "SD"
//        }, {
//            "label": "Tennessee",
//            "id": "TN"
//        }, {
//            "label": "Texas",
//            "id": "TX"
//        }, {
//            "label": "Utah",
//            "id": "UT"
//        }, {
//            "label": "Vermont",
//            "id": "VT"
//        }, {
//            "label": "Virgin Islands",
//            "id": "VI"
//        }, {
//            "label": "Virginia",
//            "id": "VA"
//        }, {
//            "label": "Washington",
//            "id": "WA"
//        }, {
//            "label": "West Virginia",
//            "id": "WV"
//        }, {
//            "label": "Wisconsin",
//            "id": "WI"
//        }, {
//            "label": "Wyoming",
//            "id": "WY"
//        }];

//    }
//    //$scope.$watch("nombre", function (newValue, oldValue)
//    //{

//    //    if (newValue === oldValue) {
//    //        return;
//    //    }

//    //    alert("El nuevo valor es " + newValue);
//    //});

//    $scope.$watch('example14model', function ()
//    {
//        //alert('hey, myVar has changed!');
//        console.log($scope.example14model);

//    });
//});






//(function () {
//    'use strict';

//    angular.module('appReferidos').controller('puestoController', puestoController);

//    puestoController.$inject = ['$state', '$scope', '$http'];

//    function puestoController($state, $scope, $http) {

//        var vm = this;
//        vm.data = {
//            codempresa: ""
//        }
//        vm.empresaList;
//        console.log("puesto nuevo...");
//        LoadEmpresa();
//        function LoadEmpresa()
//        {
//            vm.empresaList = [{
//                id: "01",
//                nombre:"Scotiabank",
//            }, {
//                id: "02",
//                nombre: "CrediScotia",
//            }];
//        };
//        vm.CargaDataPorEmpresa = CargaDataPorEmpresa;
//        $scope.example14model = [];
//        $scope.example14settings = {
//            scrollableHeight: '200px',
//            scrollable: true,
//            enableSearch: true
//        };
        
//        $scope.example2settings = {
//            displayProp: 'id'
//        };
//        //$scope.example14data = [{
//        //    "label": "Alabama",
//        //    "id": "AL"
//        //}, {
//        //    "label": "Alaska",
//        //    "id": "AK"
//        //}, {
//        //    "label": "American Samoa",
//        //    "id": "AS"
//        //}, {
//        //    "label": "Arizona",
//        //    "id": "AZ"
//        //}, {
//        //    "label": "Arkansas",
//        //    "id": "AR"
//        //}, {
//        //    "label": "California",
//        //    "id": "CA"
//        //}, {
//        //    "label": "Colorado",
//        //    "id": "CO"
//        //}, {
//        //    "label": "Connecticut",
//        //    "id": "CT"
//        //}, {
//        //    "label": "Delaware",
//        //    "id": "DE"
//        //}, {
//        //    "label": "District Of Columbia",
//        //    "id": "DC"
//        //}, {
//        //    "label": "Federated States Of Micronesia",
//        //    "id": "FM"
//        //}, {
//        //    "label": "Florida",
//        //    "id": "FL"
//        //}, {
//        //    "label": "Georgia",
//        //    "id": "GA"
//        //}, {
//        //    "label": "Guam",
//        //    "id": "GU"
//        //}, {
//        //    "label": "Hawaii",
//        //    "id": "HI"
//        //}, {
//        //    "label": "Idaho",
//        //    "id": "ID"
//        //}, {
//        //    "label": "Illinois",
//        //    "id": "IL"
//        //}, {
//        //    "label": "Indiana",
//        //    "id": "IN"
//        //}, {
//        //    "label": "Iowa",
//        //    "id": "IA"
//        //}, {
//        //    "label": "Kansas",
//        //    "id": "KS"
//        //}, {
//        //    "label": "Kentucky",
//        //    "id": "KY"
//        //}, {
//        //    "label": "Louisiana",
//        //    "id": "LA"
//        //}, {
//        //    "label": "Maine",
//        //    "id": "ME"
//        //}, {
//        //    "label": "Marshall Islands",
//        //    "id": "MH"
//        //}, {
//        //    "label": "Maryland",
//        //    "id": "MD"
//        //}, {
//        //    "label": "Massachusetts",
//        //    "id": "MA"
//        //}, {
//        //    "label": "Michigan",
//        //    "id": "MI"
//        //}, {
//        //    "label": "Minnesota",
//        //    "id": "MN"
//        //}, {
//        //    "label": "Mississippi",
//        //    "id": "MS"
//        //}, {
//        //    "label": "Missouri",
//        //    "id": "MO"
//        //}, {
//        //    "label": "Montana",
//        //    "id": "MT"
//        //}, {
//        //    "label": "Nebraska",
//        //    "id": "NE"
//        //}, {
//        //    "label": "Nevada",
//        //    "id": "NV"
//        //}, {
//        //    "label": "New Hampshire",
//        //    "id": "NH"
//        //}, {
//        //    "label": "New Jersey",
//        //    "id": "NJ"
//        //}, {
//        //    "label": "New Mexico",
//        //    "id": "NM"
//        //}, {
//        //    "label": "New York",
//        //    "id": "NY"
//        //}, {
//        //    "label": "North Carolina",
//        //    "id": "NC"
//        //}, {
//        //    "label": "North Dakota",
//        //    "id": "ND"
//        //}, {
//        //    "label": "Northern Mariana Islands",
//        //    "id": "MP"
//        //}, {
//        //    "label": "Ohio",
//        //    "id": "OH"
//        //}, {
//        //    "label": "Oklahoma",
//        //    "id": "OK"
//        //}, {
//        //    "label": "Oregon",
//        //    "id": "OR"
//        //}, {
//        //    "label": "Palau",
//        //    "id": "PW"
//        //}, {
//        //    "label": "Pennsylvania",
//        //    "id": "PA"
//        //}, {
//        //    "label": "Puerto Rico",
//        //    "id": "PR"
//        //}, {
//        //    "label": "Rhode Island",
//        //    "id": "RI"
//        //}, {
//        //    "label": "South Carolina",
//        //    "id": "SC"
//        //}, {
//        //    "label": "South Dakota",
//        //    "id": "SD"
//        //}, {
//        //    "label": "Tennessee",
//        //    "id": "TN"
//        //}, {
//        //    "label": "Texas",
//        //    "id": "TX"
//        //}, {
//        //    "label": "Utah",
//        //    "id": "UT"
//        //}, {
//        //    "label": "Vermont",
//        //    "id": "VT"
//        //}, {
//        //    "label": "Virgin Islands",
//        //    "id": "VI"
//        //}, {
//        //    "label": "Virginia",
//        //    "id": "VA"
//        //}, {
//        //    "label": "Washington",
//        //    "id": "WA"
//        //}, {
//        //    "label": "West Virginia",
//        //    "id": "WV"
//        //}, {
//        //    "label": "Wisconsin",
//        //    "id": "WI"
//        //}, {
//        //    "label": "Wyoming",
//        //    "id": "WY"
//        //}];
//        function CargaDataPorEmpresa(idEmpresa)
//        {
//            console.log("Entro");
//            loadData();
            
//        };

//        function loadData()
//        {
//            $scope.example14data = [{
//                "label": "Alabama",
//                "id": "AL"
//            }, {
//                "label": "Alaska",
//                "id": "AK"
//            }, {
//                "label": "American Samoa",
//                "id": "AS"
//            }, {
//                "label": "Arizona",
//                "id": "AZ"
//            }, {
//                "label": "Arkansas",
//                "id": "AR"
//            }, {
//                "label": "California",
//                "id": "CA"
//            }, {
//                "label": "Colorado",
//                "id": "CO"
//            }, {
//                "label": "Connecticut",
//                "id": "CT"
//            }, {
//                "label": "Delaware",
//                "id": "DE"
//            }, {
//                "label": "District Of Columbia",
//                "id": "DC"
//            }, {
//                "label": "Federated States Of Micronesia",
//                "id": "FM"
//            }, {
//                "label": "Florida",
//                "id": "FL"
//            }, {
//                "label": "Georgia",
//                "id": "GA"
//            }, {
//                "label": "Guam",
//                "id": "GU"
//            }, {
//                "label": "Hawaii",
//                "id": "HI"
//            }, {
//                "label": "Idaho",
//                "id": "ID"
//            }, {
//                "label": "Illinois",
//                "id": "IL"
//            }, {
//                "label": "Indiana",
//                "id": "IN"
//            }, {
//                "label": "Iowa",
//                "id": "IA"
//            }, {
//                "label": "Kansas",
//                "id": "KS"
//            }, {
//                "label": "Kentucky",
//                "id": "KY"
//            }, {
//                "label": "Louisiana",
//                "id": "LA"
//            }, {
//                "label": "Maine",
//                "id": "ME"
//            }, {
//                "label": "Marshall Islands",
//                "id": "MH"
//            }, {
//                "label": "Maryland",
//                "id": "MD"
//            }, {
//                "label": "Massachusetts",
//                "id": "MA"
//            }, {
//                "label": "Michigan",
//                "id": "MI"
//            }, {
//                "label": "Minnesota",
//                "id": "MN"
//            }, {
//                "label": "Mississippi",
//                "id": "MS"
//            }, {
//                "label": "Missouri",
//                "id": "MO"
//            }, {
//                "label": "Montana",
//                "id": "MT"
//            }, {
//                "label": "Nebraska",
//                "id": "NE"
//            }, {
//                "label": "Nevada",
//                "id": "NV"
//            }, {
//                "label": "New Hampshire",
//                "id": "NH"
//            }, {
//                "label": "New Jersey",
//                "id": "NJ"
//            }, {
//                "label": "New Mexico",
//                "id": "NM"
//            }, {
//                "label": "New York",
//                "id": "NY"
//            }, {
//                "label": "North Carolina",
//                "id": "NC"
//            }, {
//                "label": "North Dakota",
//                "id": "ND"
//            }, {
//                "label": "Northern Mariana Islands",
//                "id": "MP"
//            }, {
//                "label": "Ohio",
//                "id": "OH"
//            }, {
//                "label": "Oklahoma",
//                "id": "OK"
//            }, {
//                "label": "Oregon",
//                "id": "OR"
//            }, {
//                "label": "Palau",
//                "id": "PW"
//            }, {
//                "label": "Pennsylvania",
//                "id": "PA"
//            }, {
//                "label": "Puerto Rico",
//                "id": "PR"
//            }, {
//                "label": "Rhode Island",
//                "id": "RI"
//            }, {
//                "label": "South Carolina",
//                "id": "SC"
//            }, {
//                "label": "South Dakota",
//                "id": "SD"
//            }, {
//                "label": "Tennessee",
//                "id": "TN"
//            }, {
//                "label": "Texas",
//                "id": "TX"
//            }, {
//                "label": "Utah",
//                "id": "UT"
//            }, {
//                "label": "Vermont",
//                "id": "VT"
//            }, {
//                "label": "Virgin Islands",
//                "id": "VI"
//            }, {
//                "label": "Virginia",
//                "id": "VA"
//            }, {
//                "label": "Washington",
//                "id": "WA"
//            }, {
//                "label": "West Virginia",
//                "id": "WV"
//            }, {
//                "label": "Wisconsin",
//                "id": "WI"
//            }, {
//                "label": "Wyoming",
//                "id": "WY"
//            }];

//        }
//        //$scope.$watch("nombre", function (newValue, oldValue)
//        //{

//        //    if (newValue === oldValue) {
//        //        return;
//        //    }

//        //    alert("El nuevo valor es " + newValue);
//        //});

//        $scope.$watch('example14model', function ()
//        {
//            //alert('hey, myVar has changed!');
//            console.log($scope.example14model);
            
//        });
//    }

//})();
