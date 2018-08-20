///// <reference path="../../../Scripts/angular.js" />

//(function () {
//    'use strict';

//    angular.module('appReferidos').controller('autorizacionController', autorizacionController);

//    autorizacionController.$inject = ['dataService', 'configService', '$state', 'localStorageService', 'toastr', 'authenticationService']

//    function autorizacionController(dataService, configService, $state, localStorageService, toastr, authenticationService) {

//        var apiUrl = configService.getApiUrl();
//        var vm = this;
//        vm.autorizar = {
//            usuario: '',
//            currentPage: 1,
//            pageSize: '10',
//            totalCount: 0,
//            maxSize: 1,
//            idColocacion: 0,
//            numPages: 1,
//            validaFDN: false,
//            validaCDR: false
//        }
//        vm.ListaColocaciones = ListaColocaciones;
//        vm.PageChaged = PageChaged;
//        vm.resetAll = resetAll;
//        vm.SetPrevpage = SetPrevpage;
//        vm.SetNextpage = SetNextpage;
//        vm.AprobarSolicitud = AprobarSolicitud;
//        vm.RechazarSolicitud = RechazarSolicitud;

//        vm.Colocacion;
//        vm.AprobarColocacion;
//        vm.DetalleColocacion;
//        vm.ColocacionVendedor;

//        function ListaColocaciones() {
//            console.log(vm.autorizar);
//            dataService.getData(apiUrl + '/Autorizar/ObtenerColocacionesVendedor/' + vm.autorizar.usuario + "/" + vm.autorizar.currentPage + "/" + vm.autorizar.pageSize).then(function (resultado) {
//                if (resultado.statusText == 'OK') {          
//                    vm.Colocacion = resultado.data.listaColocacionVendedor;
//                    vm.autorizar.totalCount = resultado.data.totalColocaciones;
//                }
//            }, function (error) {
//                authenticationService.errorValida(error);
//            });
//        };

//        function PageChaged() {
//            ListaColocaciones();
//        };

//        function changePageSize() {
//            vm.autorizar.currentPage = 1;
//            ListaColocaciones();
//        };

//        function resetAll(currentRow) {
//            console.log(currentRow);
//            $.each(vm.Colocacion, function (index, value) {
//                if (value.idColocacion != currentRow.idColocacion) {
//                    value.seleccionado = false;
//                } else {
//                    value.seleccionado = true;
//                    vm.autorizar.idColocacion = currentRow.idColocacion;
//                    vm.ColocacionVendedor = currentRow;
//                    //$scope.idColocacion = currentRow.idColocacion;
//                }
//            });
//        };

//        function SetPrevpage() {
//            vm.autorizar.currentPage = vm.autorizar.currentPage > 1 ? vm.autorizar.currentPage - 1 : 1;
//            ListaColocaciones();
//        };

//        function SetNextpage() {
//            //vm.autorizar.pageSize = vm.autorizar.pageSize > 0 ? vm.autorizar.currentPage++ : vm.autorizar.currentPage -1;
//            vm.autorizar.currentPage++;
//            ListaColocaciones();
//        };


//        function AprobarSolicitud() {
//            if (vm.autorizar.idFondoMutuo === 0 || vm.autorizar.idFondoMutuo === null || vm.autorizar.idFondoMutuo === undefined) {
//                toastr.error('Seleccione un registro para gestionar la aprobación', 'Autorizar Colocación Vendedor');
//            } else {
//                console.log(vm.autorizar);
//                dataService.getData(apiUrl + '/Autorizar/ObtenerDetalleAprobacion/' + vm.autorizar.idColocacion + "/" + vm.autorizar.usuario).then(function (result) {
//                    if (result.statusText == 'OK' && result.data.length > 0) {
//                        vm.DetalleColocacion = result.data;
//                        if (vm.DetalleColocacion.length > 0) {
//                            if (vm.DetalleColocacion[0].cantAprobacion === 2) { /// actualiza el flag solo de la tabla detalle
//                                if (vm.DetalleColocacion[0].tipoAprobacionA === 1 && vm.DetalleColocacion[0].aprobacionRequerida) {
//                                    vm.DetalleColocacion[0].bReqAproGenA = false;
//                                    vm.DetalleColocacion[0].bReqFDN = false;
//                                    vm.DetalleColocacion[0].usuario = vm.autorizar.usuario;
//                                    vm.DetalleColocacion[0].cantAprobacion = vm.DetalleColocacion[0].cantAprobacion - 1;
//                                    console.log(vm.DetalleColocacion[0]);
//                                    bootbox.confirm("¿Deseas autorizar esta Solicitud de Colocación?", function (message) {
//                                        if (message) {
//                                            dataService.postData(apiUrl + '/Autorizar/GuardarAprobacionColocacion', vm.DetalleColocacion[0]).then(function (resultSolicitud) {
//                                                if (resultSolicitud.statusText == 'OK') {
//                                                    toastr.success('Se aprobó una de las solicitudes, falta la aprobación de otro gerente.', 'Autorizar');
//                                                    LimpiarSolicitud();
//                                                    ListaColocaciones();
//                                                }
//                                            }, function (error) { authenticationService.errorValida(error); });
//                                        }
//                                    });
//                                } else if (vm.DetalleColocacion[0].tipoAprobacionB === 1 && vm.DetalleColocacion[0].aprobacionRequerida) {
//                                    vm.DetalleColocacion[0].bReqAproGenB = false;
//                                    vm.DetalleColocacion[0].bReqCDR = false;
//                                    vm.DetalleColocacion[0].usuario = vm.autorizar.usuario;
//                                    vm.DetalleColocacion[0].cantAprobacion = vm.DetalleColocacion[0].cantAprobacion - 1;
//                                    console.log(vm.DetalleColocacion[0]);
//                                    bootbox.confirm("¿Deseas autorizar esta Solicitud de Colocación?", function (message) {
//                                        if (message) {
//                                            dataService.postData(apiUrl + '/Autorizar/GuardarAprobacionColocacion', vm.DetalleColocacion[0]).then(function (resultSolicitud) {
//                                                if (resultSolicitud.statusText == 'OK') {
//                                                    toastr.success('Se aprobó una de las solicitudes, falta la aprobación de otro gerente B.', 'Autorizar');
//                                                    LimpiarSolicitud();
//                                                    ListaColocaciones();
//                                                }
//                                            }, function (error) { authenticationService.errorValida(error); });
//                                        }
//                                    });
//                                }
//                            } else if (vm.DetalleColocacion[0].cantAprobacion === 1) { /// actualiza el flag y actualiza el estado de la solicitud
//                                if (vm.DetalleColocacion[0].tipoAprobacionA === 1 && vm.DetalleColocacion[0].aprobacionRequerida) {
//                                    vm.DetalleColocacion[0].bReqAproGenA = false;
//                                    vm.DetalleColocacion[0].bReqFDN = false;
//                                    vm.DetalleColocacion[0].usuario = vm.autorizar.usuario;
//                                    vm.DetalleColocacion[0].cantAprobacion = vm.DetalleColocacion[0].cantAprobacion - 1;
//                                    console.log(vm.DetalleColocacion[0]);
//                                    bootbox.confirm("¿Deseas aprobar esta Solicitud de Colocación?", function (message) {
//                                        if (message) {
//                                            dataService.postData(apiUrl + '/Autorizar/GuardarAprobacionColocacion', vm.DetalleColocacion[0]).then(function (resultSolicitud) {
//                                                if (resultSolicitud.statusText == 'OK') {
//                                                    vm.ColocacionVendedor.estadoSolicitud = 'A';
//                                                    vm.ColocacionVendedor.usuario = localStorageService.get('usuarioToken').firmaUsuario;
//                                                    vm.ColocacionVendedor.usuarioAprobador = localStorageService.get('usuarioToken').firmaUsuario;
//                                                    vm.ColocacionVendedor.observacion = vm.autorizar.observacion;
//                                                    console.log(vm.ColocacionVendedor);
//                                                    dataService.postData(apiUrl + '/Autorizar/AprobarColocacionVendedor', vm.ColocacionVendedor).then(function (resultAprob) {
//                                                        if (resultAprob.statusText == 'OK') {
//                                                            console.log("Entra");
//                                                            toastr.success('Se modifico el cambio de vendedor', 'Autorizar');
//                                                            LimpiarSolicitud();
//                                                            ListaColocaciones();
//                                                        }
//                                                    }, function (error) { authenticationService.errorValida(error); });
//                                                    toastr.success('Se aprobó una de las solicitudes, falta la aprobación de otro gerente B.', 'Autorizar');
//                                                }
//                                            }, function (error) { authenticationService.errorValida(error); });
//                                        }
//                                    });
//                                } else if (vm.DetalleColocacion[0].tipoAprobacionB === 1 && vm.DetalleColocacion[0].aprobacionRequerida) {
//                                    vm.DetalleColocacion[0].bReqAproGenB = false;
//                                    vm.DetalleColocacion[0].bReqCDR = false;
//                                    vm.DetalleColocacion[0].usuario = vm.autorizar.usuario;
//                                    vm.DetalleColocacion[0].cantAprobacion = vm.DetalleColocacion[0].cantAprobacion - 1;
//                                    console.log(vm.DetalleColocacion[0]);
//                                    bootbox.confirm("¿Deseas aprobar esta Solicitud de Colocación?", function (message) {
//                                        if (message) {
//                                            dataService.postData(apiUrl + '/Autorizar/GuardarAprobacionColocacion', vm.DetalleColocacion[0]).then(function (resultSolicitud) {
//                                                if (resultSolicitud.statusText == 'OK') {
//                                                    vm.ColocacionVendedor.estadoSolicitud = 'A';
//                                                    vm.ColocacionVendedor.usuario = localStorageService.get('usuarioToken').firmaUsuario;
//                                                    vm.ColocacionVendedor.usuarioAprobador = localStorageService.get('usuarioToken').firmaUsuario;
//                                                    vm.ColocacionVendedor.observacion = vm.autorizar.observacion;
//                                                    console.log(vm.ColocacionVendedor);
//                                                    dataService.postData(apiUrl + '/Autorizar/AprobarColocacionVendedor', vm.ColocacionVendedor).then(function (resultAprob) {
//                                                        if (resultAprob.statusText == 'OK') {
//                                                            console.log("Entra");
//                                                            toastr.success('Se modifico el cambio de vendedor', 'Autorizar');
//                                                            LimpiarSolicitud();
//                                                            ListaColocaciones();
//                                                        }

//                                                    }, function (error) { authenticationService.errorValida(error); });
//                                                }
//                                            }, function (error) { authenticationService.errorValida(error); });
//                                        }
//                                    });
//                                }
//                            }
//                        }
//                    } else {
//                        toastr.warning('No existe la aprobación para este usuario!', 'Autorizar');
//                    }
//                }, function (error) {
//                    toastr.error('No existe la aprobación para este usuario!', 'Autorizar');
//                });
//            }

            
//        };

//        function RechazarSolicitud() {
//            console.log(vm.autorizar);
//            if (vm.autorizar.idColocacion === 0 || vm.autorizar.idColocacion === null || vm.autorizar.idColocacion === undefined) {
//                toastr.error('Seleccione un registro para gestionar el rechazó', 'Autorizar Colocación Vendedor');
//            } else {
//                dataService.getData(apiUrl + '/Autorizar/ObtenerDetalleAprobacion/' + vm.autorizar.idColocacion + "/" + vm.autorizar.usuario).then(function (result) {
//                    if (result.statusText == 'OK' && result.data.length > 0) {
//                        bootbox.confirm("¿Deseas Rechazar esta Solicitud de Colocación?", function (message) {
//                            if (message) {
//                                vm.DetalleColocacion = result.data;
//                                if (vm.DetalleColocacion[0].tipoAprobacionA === 1 && vm.DetalleColocacion[0].aprobacionRequerida) {
//                                    vm.DetalleColocacion[0].bReqAproGenA = false;
//                                    vm.DetalleColocacion[0].bReqFDN = false;
//                                    vm.DetalleColocacion[0].usuario = vm.autorizar.usuario;
//                                    vm.DetalleColocacion[0].cantAprobacion = 0;
//                                    dataService.postData(apiUrl + '/Autorizar/RechazarColocacionDetalleVendedor', vm.DetalleColocacion[0]).then(function (resultdetRechazo) {
//                                        if (resultdetRechazo.statusText == 'OK') {
//                                            vm.ColocacionVendedor.estadoSolicitud = 'R';
//                                            vm.ColocacionVendedor.usuario = localStorageService.get('usuarioToken').firmaUsuario;
//                                            vm.ColocacionVendedor.usuarioAprobador = localStorageService.get('usuarioToken').firmaUsuario;
//                                            vm.ColocacionVendedor.observacion = vm.autorizar.observacion;
//                                            dataService.postData(apiUrl + '/Autorizar/RechazarColocacionVendedor', vm.ColocacionVendedor).then(function (resultRechazo) {
//                                                if (resultRechazo.statusText == 'OK') {
//                                                    toastr.success('Se rechazó el cambio de vendedor para Colocación', 'Autorizar');
//                                                    LimpiarSolicitud();
//                                                    ListaColocaciones();
//                                                }
//                                            }, function (errorRechazo) { authenticationService.errorValida(errorRechazo); });
//                                        }
//                                    }, function (errordetRechazo) { authenticationService.errorValida(errordetRechazo); });
//                                } else if (vm.DetalleColocacion[0].tipoAprobacionB === 1 && vm.DetalleColocacion[0].aprobacionRequerida) {
//                                    vm.DetalleColocacion[0].bReqAproGenA = false;
//                                    vm.DetalleColocacion[0].bReqFDN = false;
//                                    vm.DetalleColocacion[0].usuario = vm.autorizar.usuario;
//                                    vm.DetalleColocacion[0].cantAprobacion = 0;
//                                    dataService.postData(apiUrl + '/Autorizar/RechazarColocacionDetalleVendedor', vm.DetalleColocacion[0]).then(function (resultdetRechazo) {
//                                        if (resultdetRechazo.statusText == 'OK') {
//                                            vm.ColocacionVendedor.estadoSolicitud = 'R';
//                                            vm.ColocacionVendedor.usuario = localStorageService.get('usuarioToken').firmaUsuario;
//                                            vm.ColocacionVendedor.usuarioAprobador = localStorageService.get('usuarioToken').firmaUsuario;
//                                            vm.ColocacionVendedor.observacion = vm.autorizar.observacion;
//                                            dataService.postData(apiUrl + '/Autorizar/RechazarColocacionVendedor', vm.ColocacionVendedor).then(function (resultRechazo) {
//                                                if (resultRechazo.statusText == 'OK') {
//                                                    toastr.success('Se rechazó el cambio de vendedor para Colocación', 'Autorizar');
//                                                    LimpiarSolicitud();
//                                                    ListaColocaciones();
//                                                }
//                                            }, function (errorRechazo) { authenticationService.errorValida(errorRechazo); });
//                                        }
//                                    }, function (errordetRechazo) { authenticationService.errorValida(errordetRechazo); });
//                                }
//                            }
//                        });
//                    }
//                }, function (error) { authenticationService.errorValida(error); });
//            }
//        };

//        function LimpiarSolicitud() {
//            vm.ColocacionVendedor = {};
//            vm.autorizar.idColocacion = 0;
//            vm.autorizar.observacion = "";
//            vm.DetalleColocacion = {};
//        };

//    }

//})();