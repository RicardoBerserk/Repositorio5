///// <reference path="../../../Scripts/angular.js" />

//(function (undefined) {

//    'use stric';

//    angular.module('appReferidos').controller('autorizacionFFMMController', autorizacionFFMMController);

//    autorizacionFFMMController.$inject = ['dataService', 'configService', '$state', 'localStorageService', 'toastr', 'authenticationService']

//    function autorizacionFFMMController(dataService, configService, $state, localStorageService, toastr, authenticationService) {

//        var apiUrl = configService.getApiUrl();
//        var vm = this;
//        vm.autorizar = {
//            usuario: '',
//            currentPage: 1,
//            pageSize: '10',
//            totalCount: 0,
//            maxSize: 1,
//            idFondoMutuo: 0,
//            numPages: 1,
//            validaFDN: false,
//            validaCDR: false,
//            observacion: ""
//        }
//        vm.ListaFondosVendedor = ListaFondosVendedor;
//        vm.PageChaged = PageChaged;
//        vm.resetAll = resetAll;
//        vm.SetPrevpage = SetPrevpage;
//        vm.SetNextpage = SetNextpage;
//        vm.AprobarSolicitud = AprobarSolicitud;
//        vm.RechazarSolicitud = RechazarSolicitud;

//        vm.FondoMutuoList;
//        vm.AprobarColocacion;
//        vm.DetalleFondoMutuo;
//        vm.FondoMutuoVendedor;

//        function ListaFondosVendedor() {
//            console.log(vm.autorizar);
//            dataService.getData(apiUrl + '/Autorizar/ObtenerFondoMutuosVendedor/' + vm.autorizar.usuario + "/" + vm.autorizar.currentPage + "/" + vm.autorizar.pageSize).then(function (resultado) {
//                if (resultado.statusText == 'OK') {
                    
//                    vm.FondoMutuoList = resultado.data.listaFondoMutuoVendedor;
//                    vm.autorizar.totalCount = resultado.data.totalFondoMutuos;
//                    console.log(vm.FondoMutuoList);
//                }
//            }, function (error) {
//                authenticationService.errorValida(error);
//            });
//        };

//        function PageChaged() {
//            ListaFondosVendedor();
//        };

//        function changePageSize() {
//            vm.autorizar.currentPage = 1;
//            ListaFondosVendedor();
//        };

//        function resetAll(currentRow) {
//            console.log(currentRow);
//            $.each(vm.FondoMutuoList, function (index, value) {
//                if (value.idFondoMutuo != currentRow.idFondoMutuo) {
//                    value.seleccionado = false;
//                } else {
//                    value.seleccionado = true;
//                    vm.autorizar.idFondoMutuo = currentRow.idFondoMutuo;
//                    vm.FondoMutuoVendedor = currentRow;
//                }
//            });
//        };

//        function SetPrevpage() {
//            vm.autorizar.currentPage = vm.autorizar.currentPage > 1 ? vm.autorizar.currentPage - 1 : 1;
//            ListaFondosVendedor();
//        };

//        function SetNextpage() {
//            console.log("Entro");
//            //vm.autorizar.pageSize = vm.autorizar.pageSize > 0 ? vm.autorizar.currentPage++ : vm.autorizar.currentPage -1;
//            vm.autorizar.currentPage++;
//            ListaFondosVendedor();
//        };

//        function AprobarSolicitud() {
            
//            if (vm.autorizar.idFondoMutuo === 0 || vm.autorizar.idFondoMutuo === null || vm.autorizar.idFondoMutuo === undefined) {
//                toastr.error('Seleccione un registro para gestionar la aprobación', 'Autorizar Fondos Mutuo');
//            } else {
//                console.log("Entra");
//                console.log(vm.autorizar);
//                dataService.getData(apiUrl + '/Autorizar/ObtenerDetalleFondo/' + vm.autorizar.idFondoMutuo + "/" + vm.autorizar.usuario).then(function (result) {
//                    if (result.statusText == 'OK' && result.data.length > 0) {
//                        bootbox.confirm("¿Deseas Aprobar esta Solicitud de Fondo Mutuo?", function (message) {
//                            if (message) {
//                                vm.DetalleFondoMutuo = result.data;
//                                if (vm.DetalleFondoMutuo.length > 0) {
//                                    if (vm.DetalleFondoMutuo[0].cantAprobacion === 2) { /// actualiza el flag solo de la tabla detalle
//                                        if (vm.DetalleFondoMutuo[0].tipoAprobacionA === 1 && vm.DetalleFondoMutuo[0].aprobacionRequerida) {
//                                            vm.DetalleFondoMutuo[0].bReqAproGenA = false;
//                                            vm.DetalleFondoMutuo[0].bReqFDN = false;
//                                            vm.DetalleFondoMutuo[0].usuario = vm.autorizar.usuario;
//                                            vm.DetalleFondoMutuo[0].cantAprobacion = vm.DetalleFondoMutuo[0].cantAprobacion - 1;
//                                            console.log(vm.DetalleFondoMutuo[0]);
//                                            dataService.postData(apiUrl + '/Autorizar/GuardarSolicitudFFMM', vm.DetalleFondoMutuo[0]).then(function (resultSolicitud) {
//                                                if (resultSolicitud.statusText == 'OK') {
//                                                    toastr.success('Se aprobó una de las solicitudes, falta la aprobación de otro gerente.', 'Autorizar Colocación');
//                                                    LimpiarSolicitud();
//                                                    ListaFondosVendedor();
//                                                }
//                                            }, function (error) { authenticationService.errorValida(error); });
//                                        } else if (vm.DetalleFondoMutuo[0].tipoAprobacionB === 1 && vm.DetalleFondoMutuo[0].aprobacionRequerida) {
//                                            vm.DetalleFondoMutuo[0].bReqAproGenB = false;
//                                            vm.DetalleFondoMutuo[0].bReqCDR = false;
//                                            vm.DetalleFondoMutuo[0].usuario = vm.autorizar.usuario;
//                                            vm.DetalleFondoMutuo[0].cantAprobacion = vm.DetalleFondoMutuo[0].cantAprobacion - 1;
//                                            console.log(vm.DetalleFondoMutuo[0]);
//                                            dataService.postData(apiUrl + '/Autorizar/GuardarSolicitudFFMM', vm.DetalleFondoMutuo[0]).then(function (resultSolicitud) {
//                                                if (resultSolicitud.statusText == 'OK') {
//                                                    toastr.success('Se aprobó una de las solicitudes, falta la aprobación de otro gerente.', 'Autorizar Colocación');
//                                                    LimpiarSolicitud();
//                                                    ListaFondosVendedor();
//                                                }
//                                            }, function (error) { authenticationService.errorValida(error); });
//                                        }
//                                    } else if (vm.DetalleFondoMutuo[0].cantAprobacion === 1) { /// actualiza el flag y actualiza el estado de la solicitud
//                                        if (vm.DetalleFondoMutuo[0].tipoAprobacionA === 1 && vm.DetalleFondoMutuo[0].aprobacionRequerida) {
//                                            vm.DetalleFondoMutuo[0].bReqAproGenA = false;
//                                            vm.DetalleFondoMutuo[0].bReqFDN = false;
//                                            vm.DetalleFondoMutuo[0].usuario = vm.autorizar.usuario;
//                                            vm.DetalleFondoMutuo[0].cantAprobacion = vm.DetalleFondoMutuo[0].cantAprobacion - 1;
//                                            console.log(vm.DetalleFondoMutuo[0]);
//                                            dataService.postData(apiUrl + '/Autorizar/GuardarSolicitudFFMM', vm.DetalleFondoMutuo[0]).then(function (resultSolicitud) {
//                                                if (resultSolicitud.statusText == 'OK') {
//                                                    vm.FondoMutuoVendedor.estadoSolicitud = 'A';
//                                                    vm.FondoMutuoVendedor.usuario = localStorageService.get('usuarioToken').firmaUsuario;
//                                                    vm.FondoMutuoVendedor.usuarioAprobador = localStorageService.get('usuarioToken').firmaUsuario;
//                                                    vm.FondoMutuoVendedor.observacion = vm.autorizar.observacion;
//                                                    console.log(vm.FondoMutuoVendedor);
//                                                    dataService.postData(apiUrl + '/Autorizar/AprobarFFMMVendedor', vm.FondoMutuoVendedor).then(function (resultAprob) {
//                                                        if (resultAprob.statusText == 'OK') {
//                                                            toastr.success('Se modificó el cambio de vendedor para Fondo Mutuo', 'Autorizar');
//                                                            LimpiarSolicitud();
//                                                            ListaFondosVendedor();
//                                                        }
//                                                    }, function (error) {
//                                                        authenticationService.errorValida(error);
//                                                    });
//                                                    //toastr.success('Se aprobó una de las solicitudes, falta la aprobación de otro gerente B.', 'Autorizar');
//                                                }
//                                            }, function (error) { authenticationService.errorValida(error); });
//                                        } else if (vm.DetalleFondoMutuo[0].tipoAprobacionB === 1 && vm.DetalleFondoMutuo[0].aprobacionRequerida) {
//                                            vm.DetalleFondoMutuo[0].bReqAproGenB = false;
//                                            vm.DetalleFondoMutuo[0].bReqCDR = false;
//                                            vm.DetalleFondoMutuo[0].usuario = vm.autorizar.usuario;
//                                            vm.DetalleFondoMutuo[0].cantAprobacion = vm.DetalleFondoMutuo[0].cantAprobacion - 1;
//                                            console.log(vm.DetalleFondoMutuo[0]);
//                                            dataService.postData(apiUrl + '/Autorizar/GuardarSolicitudFFMM', vm.DetalleFondoMutuo[0]).then(function (resultSolicitud) {
//                                                if (resultSolicitud.statusText == 'OK') {
//                                                    vm.FondoMutuoVendedor.estadoSolicitud = 'A';
//                                                    vm.FondoMutuoVendedor.usuario = localStorageService.get('usuarioToken').firmaUsuario;
//                                                    vm.FondoMutuoVendedor.usuarioAprobador = localStorageService.get('usuarioToken').firmaUsuario;
//                                                    vm.FondoMutuoVendedor.observacion = vm.autorizar.observacion;
//                                                    console.log(vm.FondoMutuoVendedor);
//                                                    dataService.postData(apiUrl + '/Autorizar/AprobarFFMMVendedor', vm.FondoMutuoVendedor).then(function (resultAprob) {
//                                                        if (resultAprob.statusText == 'OK') {
//                                                            toastr.success('Se modificó el cambio de vendedor para Fondo Mutuo', 'Autorizar');
//                                                            LimpiarSolicitud();
//                                                            ListaFondosVendedor();
//                                                        }
//                                                    }, function (error) { authenticationService.errorValida(error); });
//                                                }
//                                            }, function (error) { authenticationService.errorValida(error); });
//                                        }
//                                    }
//                                }
//                            }
//                        });
//                    } else {
//                        toastr.warning('No existe la aprobación para este usuario!', 'Autorizar');
//                    }
//                }, function (error) {
//                    toastr.error('No existe la aprobación para este usuario!', 'Autorizar');
//                    authenticationService.errorValida(error);
//                });
//            }
//        };

//        function RechazarSolicitud() {
//            if (vm.autorizar.idFondoMutuo === 0 || vm.autorizar.idFondoMutuo === null || vm.autorizar.idFondoMutuo === undefined) {
//                toastr.error('Seleccione un registro para gestionar el rechazó', 'Autorizar Fondos Mutuo');
//            } else {
//                dataService.getData(apiUrl + '/Autorizar/ObtenerDetalleFondo/' + vm.autorizar.idFondoMutuo + "/" + vm.autorizar.usuario).then(function (result) {
//                    if (result.statusText == 'OK' && result.data.length > 0) {
//                        bootbox.confirm("¿Deseas Rechazar esta Solicitud de Fondo Mutuo?", function (message) {
//                            if (message) {
//                                vm.DetalleFondoMutuo = result.data;
//                                if (vm.DetalleFondoMutuo[0].tipoAprobacionA === 1 && vm.DetalleFondoMutuo[0].aprobacionRequerida) {
//                                    vm.DetalleFondoMutuo[0].bReqAproGenA = false;
//                                    vm.DetalleFondoMutuo[0].bReqFDN = false;
//                                    vm.DetalleFondoMutuo[0].usuario = vm.autorizar.usuario;
//                                    vm.DetalleFondoMutuo[0].cantAprobacion = 0;
//                                    dataService.postData(apiUrl + '/Autorizar/RechazarFFMMDetalleVendedor', vm.DetalleFondoMutuo[0]).then(function (resultdetRechazo) {
//                                        if (resultdetRechazo.statusText == 'OK') {
//                                            vm.FondoMutuoVendedor.estadoSolicitud = 'R';
//                                            vm.FondoMutuoVendedor.usuario = localStorageService.get('usuarioToken').firmaUsuario;
//                                            vm.FondoMutuoVendedor.usuarioAprobador = localStorageService.get('usuarioToken').firmaUsuario;
//                                            vm.FondoMutuoVendedor.observacion = vm.autorizar.observacion;
//                                            dataService.postData(apiUrl + '/Autorizar/RechazarFFMMVendedor', vm.FondoMutuoVendedor).then(function (resultRechazo) {
//                                                if (resultRechazo.statusText == 'OK') {
//                                                    toastr.success('Se rechazó el cambio de vendedor para Fondo Mutuo', 'Autorizar');
//                                                    LimpiarSolicitud();
//                                                    ListaFondosVendedor();
//                                                }
//                                            }, function (errorRechazo) { authenticationService.errorValida(errorRechazo); });
//                                        }
//                                    }, function (errordetRechazo) { authenticationService.errorValida(errordetRechazo); });
//                                } else if (vm.DetalleFondoMutuo[0].tipoAprobacionB === 1 && vm.DetalleFondoMutuo[0].aprobacionRequerida) {
//                                    vm.DetalleFondoMutuo[0].bReqAproGenA = false;
//                                    vm.DetalleFondoMutuo[0].bReqFDN = false;
//                                    vm.DetalleFondoMutuo[0].usuario = vm.autorizar.usuario;
//                                    vm.DetalleFondoMutuo[0].cantAprobacion = 0;
//                                    dataService.postData(apiUrl + '/Autorizar/RechazarFFMMDetalleVendedor', vm.DetalleFondoMutuo[0]).then(function (resultdetRechazo) {
//                                        if (resultdetRechazo.statusText == 'OK') {
//                                            vm.FondoMutuoVendedor.estadoSolicitud = 'R';
//                                            vm.FondoMutuoVendedor.usuario = localStorageService.get('usuarioToken').firmaUsuario;
//                                            vm.FondoMutuoVendedor.usuarioAprobador = localStorageService.get('usuarioToken').firmaUsuario;
//                                            vm.FondoMutuoVendedor.observacion = vm.autorizar.observacion;
//                                            dataService.postData(apiUrl + '/Autorizar/RechazarFFMMVendedor', vm.FondoMutuoVendedor).then(function (resultRechazo) {
//                                                if (resultRechazo.statusText == 'OK') {
//                                                    toastr.success('Se rechazó el cambio de vendedor para Fondo Mutuo', 'Autorizar');
//                                                    LimpiarSolicitud();
//                                                    ListaFondosVendedor();
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
//            vm.FondoMutuoVendedor = {};
//            vm.autorizar.idFondoMutuo = 0;
//            vm.autorizar.observacion = "";
//            vm.DetalleFondoMutuo = {};
//        };

//    }

//})();