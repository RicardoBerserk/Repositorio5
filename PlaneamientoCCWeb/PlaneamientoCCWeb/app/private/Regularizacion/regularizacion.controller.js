app.controller('regularizacionController', ['$scope', 'dataService', 'configService', 'authenticationService', '$http', function ($scope, dataService, configService, authenticationService, $http)
{


        var apiUrl = configService.getApiUrl();
        var vm = this;
        vm.Regularizar = {
            nTipo: '',
            tablaTipoSeleccionado: null,
            totalReg: 0,
            totalCount: 0,
            maxSize: 1,
            numPages: 1,
            label1: 'Modificar CDR',
            vendedor: null,
            sucursal: null,
            observacion: '',
            label2: 'Modificar FDN',
            correoGerenteA: '',
            correoGerenteB: '',
            correoFuncionario: '',
            requiereAprobGenA: false,
            requiereAprobGenB: false,
            validaFDN: false,
            campoFDN: false,
            validaCDR: false,
            validaCorreoFDN: false,
            validaCorreoCDR: false,
            colocacionVendedor: [],
            listColocacionAprobacion: [],
            listFondoMutuoAprobacion: [],
            moduloConsulta: null,
            cuentaConsulta: null,
            operacionConsulta: null,
            subOperacionConsulta: null,
            tipoConsulta: null,
            paginaActual: 1,
            cantidadRegistros: '10',
            correoGerenteBtest: "",
            modulo: null
        }

        vm.desahabilitado = true;
        vm.desahabilitadoA = false;
        vm.desahabilitadoB = false;
        vm.desahabilitadoCDR = true;
        vm.desahabilitadoFDN = true;
        vm.habilitadoCorreoGerenteA = true;
        vm.habilitadoCorreoGerenteB = true;
        vm.mostrarErrorSucursal = false;
        vm.verificaEstado = false;
        
        vm.CargarBusqueda = CargarBusqueda;

        vm.BuscarOperaciones = BuscarOperaciones;
        vm.LimpiarBusqueda = LimpiarBusqueda;
        vm.SolicitarRegularizacion = SolicitarRegularizacion;
        vm.ModuloSeleccionado = ModuloSeleccionado;
        vm.habilitarCDR = habilitarCDR;
        vm.habilitarFDN = habilitarFDN;
        vm.LimpiarRegularizacion = LimpiarRegularizacion;
        vm.Seleccionar = Seleccionar;
        vm.PageChaged = PageChaged;
        vm.resetAll = resetAll;

        vm.guardarModulo = guardarModulo;

        vm.colocacionVendedor;
        vm.OperacionVendedor;
        vm.ModuloList;
        vm.ModuloLista;
        vm.sucursalList;
        vm.Colocaciones = {};
        vm.GerenteA = [];
        vm.GerenteB = [];
        vm.Funcionario = [];
        vm.ColocacionVend;
        vm.FondoMutuoVend;
        vm.ModuloTipo = [];

        vm.ModuloTipo = {
            CodigoModulo: 5,
            NombreModulo: "PROD 3",
            Valor: "3",
            Tipo : 5
        };



        ModuloLoad();
        //CargarUsuarioLogueado();



        function ModuloLoad()
        {
            dataService.getData(apiUrl + '/TablaTipo/ObtenerTipoModulo').then(function (result)
            {
                console.log(result);
                vm.ModuloList = result.data;
            }, function (error) { authenticationService.errorValida(error); })
        };

        function ModuloSeleccionado(valor)
        {
            console.log("eNTRA");
            console.log(valor);
            if (valor == undefined) {
                vm.Regularizar.nModulo = null;
                vm.Regularizar.moduloConsulta = null;
                vm.Regularizar.tipoConsulta = null;
            } else {
                var seleccionado = [];
                seleccionado.push(valor);
                vm.Regularizar.nModulo = JSON.parse(seleccionado[0]).Valor;
                vm.Regularizar.moduloConsulta = JSON.parse(seleccionado[0]).Valor;
                vm.Regularizar.tipoConsulta = JSON.parse(seleccionado[0]).Tipo;
                console.log(vm.Regularizar);
                if (vm.Regularizar.tipoConsulta === 1) {
                    vm.Regularizar.totalCount = 0;
                    vm.Colocaciones = {};
                } else if (vm.Regularizar.tipoConsulta === 2) {
                    vm.Regularizar.totalCount = 0;
                    vm.Colocaciones = {};
                } else if (vm.Regularizar.tipoConsulta === 3) {
                    vm.Regularizar.totalCount = 0;
                    vm.Colocaciones = {};
                }
            }
        };

        function guardarModulo()
        {
            vm.ModuloTipo.CodigoModulo = 5;
            vm.ModuloTipo.NombreModulo = "PROD 3";
            vm.ModuloTipo.Valor = "3";
            vm.ModuloTipo.Tipo = 5;
            console.log(vm.ModuloTipo);
            $http.post(apiUrl + '/TablaTipo/GuardarModulo', vm.ModuloTipo).then(function (resultDatos)
            {
                if (resultDatos.statusText == 'OK') {
                    console.log("RETORNO EL GUARDADO");
                }
            }, function (error)
            {
                authenticationService.errorValida(error);
            });

            //dataService.postData(apiUrl + '/TablaTipo/GuardarModulo', vm.ModuloTipo).then(function (resultCant)
            //{
            //    if (resultCant.statusText == 'OK') {
            //        //toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
            //        console.log("RETORNO EL GUARDADO");
            //        //LimpiarRegularizacion();
            //        //$state.go("RegularizacionInterna", {}, { reload: true });
            //    }
            //}, function (error)
            //{
            //    authenticationService.errorValida(error);
            //});
        }

        function validaCamposSeteo()
        {

            if (vm.Regularizar.moduloConsulta === "" || vm.Regularizar.moduloConsulta === null) vm.Regularizar.moduloConsulta = "";
            if (vm.Regularizar.cuentaConsulta === "" || vm.Regularizar.cuentaConsulta === null) vm.Regularizar.cuentaConsulta = "";
            if (vm.Regularizar.operacionConsulta === "" || vm.Regularizar.operacionConsulta === null) vm.Regularizar.operacionConsulta = "";
            if (vm.Regularizar.subOperacionConsulta === "" || vm.Regularizar.subOperacionConsulta === null) vm.Regularizar.subOperacionConsulta = "";
        }

        function PageChaged()
        {
            console.log("consulta");
            BuscarOperaciones();
        };

        function SetPrevpage()
        {

        };

        function SetNextpage()
        {

        };

        function habilitarCDR()
        {
            if (vm.desahabilitadoA) {
                console.log("entro 1");
                vm.desahabilitadoA = false;
                if (vm.desahabilitadoB) {
                    console.log("entro 1.1");
                    vm.habilitadoCorreoGerenteA = false;
                    vm.habilitadoCorreoGerenteB = true;
                    vm.Regularizar.validaCorreoFDN = false;
                    vm.verificaEstado = false;
                } else {
                    console.log("entro 1.2");
                    vm.habilitadoCorreoGerenteA = true;
                    vm.habilitadoCorreoGerenteB = true;
                    vm.Regularizar.validaCorreoCDR = false;
                    vm.Regularizar.validaCorreoFDN = false;
                    vm.verificaEstado = false;
                }
                vm.desahabilitadoCDR = true;
                vm.Regularizar.validaCDR = false;
                $scope.validaCDR = false;
            } else {
                console.log("entro 2");
                if (vm.desahabilitadoB) {
                    console.log("entro 2.1");
                    vm.Regularizar.sucursal = "";
                } else {
                    console.log("entro 2.2");
                    vm.habilitadoCorreoGerenteA = false;
                    vm.Regularizar.validaCorreoCDR = true;
                }
                vm.desahabilitadoA = true;
                vm.desahabilitadoCDR = false;
                vm.Regularizar.validaCDR = true;
                $scope.validaCDR = true;
            }
        };

        function habilitarFDN()
        {
            console.log(vm.desahabilitadoB);
            if (vm.desahabilitadoB) {
                console.log("entro 1");
                console.log(vm.Regularizar.validaFDN);
                if (vm.Regularizar.validaCorreoCDR) {
                    console.log("entro 1.1");
                    vm.Regularizar.validaCorreoCDR = true;
                    vm.habilitadoCorreoGerenteA = false;
                } else {
                    console.log("entro 1.2");
                    vm.desahabilitadoB = false;
                    vm.desahabilitadoFDN = true;
                    vm.habilitadoCorreoGerenteA = true;
                    vm.Regularizar.validaCorreoCDR = true;
                }
                vm.desahabilitadoB = false;
                vm.desahabilitadoFDN = true;
                vm.Regularizar.validaFDN = false;
                vm.Regularizar.campoFDN = false;
                $scope.validaFDN = false;
            } else {
                console.log("entro 2");
                console.log(vm.Regularizar.validaFDN);
                if (vm.Regularizar.validaCorreoCDR) {
                    console.log("entro 2.1");
                } else {
                    console.log("entro 2.2");
                    vm.habilitadoCorreoGerenteA = false;
                }

                vm.desahabilitadoB = true;
                vm.desahabilitadoFDN = false;
                vm.Regularizar.validaFDN = true;
                vm.Regularizar.validaCorreoCDR = true;
                vm.Regularizar.campoFDN = true;
                $scope.validaFDN = true;
            }
        };

        function Seleccionar(colocacion)
        {
            LimpiarRegularizacion();
            vm.desahabilitado = false;
            vm.Regularizar.OperacionVendedor = colocacion;
            console.log(vm.Regularizar.OperacionVendedor);
        };

        function resetAll(currentRow)
        {
            setearValores();
            vm.desahabilitado = false;
            console.log(currentRow);
            $.each(vm.Colocaciones, function (index, value)
            {
                if (value.reg != currentRow.reg) {
                    value.seleccionado = false;
                } else {
                    value.seleccionado = true;
                    vm.Regularizar.OperacionVendedor = currentRow;
                }
            });
        };

        function resetAll2(currentRow)
        {
            //setearValores();
            vm.desahabilitado = false;
            console.log(currentRow);
            $.each(vm.Colocaciones, function (index, value)
            {
                if (value.reg != currentRow.reg) {
                    value.seleccionado = false;
                } else {
                    value.seleccionado = true;
                    //vm.Regularizar.OperacionVendedor = currentRow;
                }
            });
        };

        function setearValores()
        {
            vm.desahabilitado = true;
            vm.desahabilitadoA = false;
            vm.desahabilitadoB = false;
            vm.desahabilitadoCDR = true;
            vm.desahabilitadoFDN = true;
            vm.habilitadoCorreoGerenteA = true;
            vm.habilitadoCorreoGerenteB = true;
            vm.mostrarErrorSucursal = false;
            vm.verificaEstado = false;
            vm.Regularizar.validaCDR = false;
            vm.Regularizar.validaFDN = false;
            vm.Regularizar.campoFDN = false;
        };

        function LimpiarBusqueda()
        {
            //CargarBusqueda();
            vm.Regularizar.nTipo = '';
            vm.Regularizar.tablaTipoSeleccionado = null;
            vm.Regularizar.moduloConsulta = null;
            vm.Regularizar.cuentaConsulta = null;
            vm.Regularizar.operacionConsulta = null;
            vm.Regularizar.subOperacionConsulta = null;
            vm.Regularizar.tipoConsulta = null;
        };

        function LimpiarRegularizacion()
        {
            vm.colocacionVendedor = [];
            vm.Regularizar.sucursal = null;
            vm.Regularizar.vendedor = null;
            vm.Regularizar.correoGerenteA = '';
            vm.Regularizar.correoGerenteB = '';
            //vm.Regularizar.correoFuncionario = '';
            vm.Regularizar.observacion = '';
            vm.Regularizar.colocacionVendedor = [];
            vm.Regularizar.listColocacionAprobacion = [];
            vm.Regularizar.listFondoMutuoAprobacion = [];
            vm.desahabilitado = true;
            vm.desahabilitadoA = false;
            vm.desahabilitadoB = false;
            vm.desahabilitadoCDR = true;
        };

        function ObtenerUsuarioTemporal(valor)
        {
            var email = valor;
            var usuario = email.substring(0, email.lastIndexOf("@"));
            return usuario;
        };

        function CargarBusqueda()
        {
            console.log("Entras");
            dataService.getData(apiUrl + '/TablaTipo/ObtenerTipoModulo').then(function (result)
            {
                console.log(result);
                vm.ModuloLista = result.data;
            }, function (error) { authenticationService.errorValida(error); })

        }

        function BuscarOperaciones(valid)
        {
            console.log($scope.frmConsultar);
            console.log($scope.frmConsultar.$valid);
            console.log(valid);
            validaCamposSeteo();
            if ($scope.frmConsultar.$valid) {
                dataService.postData(apiUrl + '/Operacion/DatosCantidad', vm.Regularizar).then(function (resultCant)
                {
                    if (resultCant.statusText == 'OK') {
                        vm.Regularizar.totalCount = resultCant.data;
                        if (resultCant.data > 0) {
                            dataService.postData(apiUrl + '/Operacion/Datos', vm.Regularizar).then(function (result)
                            {
                                if (result.statusText == 'OK') {
                                    vm.Colocaciones = result.data;
                                }
                            }, function (error) { authenticationService.errorValida(error); });
                        }
                    }
                }, function (error)
                {
                    authenticationService.errorValida(error);
                });
            } else {
                //toastr.warning('Seleccione un modulo.', 'Regularizar');
            }
        };

        function SolicitarRegularizacion(valido)
        {
            console.log($scope.frmSolicitud);
            console.log($scope.frmSolicitud.$valid);
            console.log(valido);
            if (vm.desahabilitadoA || vm.desahabilitadoB) {
                if ($scope.frmSolicitud.$valid) {
                    if (vm.Regularizar.OperacionVendedor.tipoRegistro === 1) {
                        RegularizarColocacion();
                    } else if (vm.Regularizar.OperacionVendedor.tipoRegistro == 2) {
                        RegularizarFondoMutuo();
                    } else if (vm.Regularizar.OperacionVendedor.tipoRegistro == 3) {
                        dataService.postData(apiUrl + '/Operacion/ObtenerDatosCompraDeuda', vm.Regularizar.OperacionVendedor).then(function (result)
                        {
                            if (result.statusText == 'OK') {
                                console.log("Entra a compra");
                                console.log(result.data);
                            }
                        }, function (error) { authenticationService.errorValida(error); });
                    }
                    else {
                        //toastr.warning('No existe', 'Regularizar');
                    }
                } else {
                    //toastr.error('Ingrese los datos requeridos', 'Regularizar');
                }
            } else {
                //toastr.error('Seleccion cualquier opción', 'Regularizar');
            }
        };

        function VerificarGerenteCorreoInicial(valor)
        {
            var texto = document.getElementById("txtCorreoGerenteA").value;
            if (valor && texto.length > 1) {
                if (vm.Regularizar.OperacionVendedor.tipoRegistro === 1) {
                    var validarCorreo = { sucursal: vm.Regularizar.OperacionVendedor.sucursalVend, correo: vm.Regularizar.correoGerenteA };
                } else {
                    var validarCorreo = { sucursal: vm.Regularizar.OperacionVendedor.sucursalVend, correo: vm.Regularizar.correoGerenteA };
                }
                $('#txtCorreoGerenteA').autocomplete({
                    source: function (request, response)
                    {
                        $.ajax({
                            url: apiUrl + '/Certifica/ObtenerTrabajador',
                            data: validarCorreo,
                            dataType: 'json',
                            type: 'POST',
                            success: function (data)
                            {
                                response($.map(data, function (item)
                                {
                                    console.log(item);
                                    return {
                                        label: item.correo,
                                        value: item.firma,
                                        registro: item.registro,
                                    }
                                }));
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown)
                            {
                                console.log('error', textStatus, errorThrown);
                                console.log(textStatus);
                            }
                        })
                    },
                    minLength: 1,
                    select: function (event, ui)
                    {
                        console.log(ui);
                        vm.GerenteA.firma = ui.item.value;
                        vm.GerenteA.codigo = ui.item.registro;
                        vm.Regularizar.correoGerenteA = ui.item.label;
                        $('#txtCorreoGerenteA').val(ui.item.label);
                        console.log(vm.Regularizar.correoGerenteA);
                        console.log(vm.GerenteA);
                        return false;
                    }
                });
            } else {

            }
        };

        function VerificarGerenteCorreoFinal(valor)
        {
            var consulta = { sucursal: vm.Regularizar.sucursal, correo: vm.Regularizar.correoGerenteB };
            var texto = document.getElementById("txtCorreoGerenteB").value;
            console.log(texto.length);
            if (valor && texto.length > 1) {
                $('#txtCorreoGerenteB').autocomplete({
                    source: function (request, response)
                    {
                        var autocompleteUrl = apiUrl + '/Certifica/ObtenerTrabajadorFiltro/' + consulta.sucursal + '/' + consulta.correo;
                        $.ajax({
                            url: apiUrl + '/Certifica/ObtenerTrabajador',
                            data: consulta,
                            dataType: 'json',
                            type: 'POST',
                            success: function (data)
                            {
                                response($.map(data, function (item)
                                {
                                    console.log(item);
                                    return {
                                        label: item.correo,
                                        value: item.firma,
                                        registro: item.registro,

                                    }
                                }));
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown)
                            {
                                console.log('error', textStatus, errorThrown);
                                console.log(textStatus);
                            }
                        })
                    },
                    minLength: 1,
                    select: function (event, ui)
                    {
                        console.log(ui);
                        vm.GerenteB.firma = ui.item.value;
                        vm.GerenteB.codigo = ui.item.registro;
                        vm.Regularizar.correoGerenteB = ui.item.label;
                        $('#txtCorreoGerenteB').val(ui.item.label);
                        console.log(vm.Regularizar.correoGerenteB);
                        console.log(vm.GerenteB);
                        return false;
                    }
                });
            } else {
                console.log("no entra")
            }
        };

        function VerificarCorreoCopia(valor)
        {
            var texto = document.getElementById("txtCorreoFuncionario").value;
            var consulta = { correo: vm.Regularizar.correoFuncionario };
            console.log(texto.length);
            if (valor && texto.length > 1) {
                $('#txtCorreoFuncionario').autocomplete({
                    source: function (request, response)
                    {
                        $.ajax({
                            url: apiUrl + '/Certifica/ObtenerInfoTrabajador',
                            data: consulta,
                            dataType: 'json',
                            type: 'POST',
                            success: function (data)
                            {
                                response($.map(data, function (item)
                                {
                                    console.log(item);
                                    return {
                                        label: item.correo,
                                        value: item.firma,
                                        registro: item.registro,

                                    }
                                }));
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown)
                            {
                                console.log('error', textStatus, errorThrown);
                                console.log(textStatus);
                            }
                        })
                    },
                    minLength: 1,
                    select: function (event, ui)
                    {
                        console.log(ui);
                        vm.Funcionario.firma = ui.item.value;
                        vm.Funcionario.codigo = ui.item.registro;
                        vm.Regularizar.correoFuncionario = ui.item.label;
                        $('#txtCorreoFuncionario').val(ui.item.label);
                        console.log(vm.Regularizar.correoFuncionario);
                        console.log(vm.Funcionario);
                        return false;
                    }
                });
            }
        };

        function ValidaSucursales()
        {
            if (vm.desahabilitadoA) {
                if (vm.Regularizar.OperacionVendedor.sucursalCol === vm.Regularizar.sucursal) {
                    //toastr.warning('Ingrese una sucursal diferente.', 'Regularizar');
                    return false;
                } else {
                    //toastr.success('Correcto.', 'Regularizar');
                    return true;
                }
            } else {
                return true;
            }
        }

        function ValidaFuncionario()
        {
            if (vm.desahabilitadoB) {
                if (vm.Regularizar.OperacionVendedor.codigoVendedorCol === vm.Regularizar.vendedor) {
                    //toastr.warning('Ingrese un vendedor diferente.', 'Regularizar');
                    return false;
                } else {
                    //toastr.success('Correcto.', 'Regularizar');
                    return true;
                }
            } else {
                return true;
            }
        };

        function SetearColocacionVendedor()
        {
            console.log(vm.ColocacionVend);

            vm.ColocacionVend.empresaVendedorNuevo = vm.ColocacionVend.empresaVendedor;
            vm.ColocacionVend.codigoVendedorNuevo = (vm.Regularizar.vendedor === "" || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === 0) ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : (vm.Regularizar.vendedor == vm.Regularizar.OperacionVendedor.codigoVendedorCol) ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
            vm.ColocacionVend.agenciaNueva = (vm.desahabilitadoA == false) ? vm.Regularizar.OperacionVendedor.sucursalOpe : (vm.Regularizar.sucursal === "" || vm.Regularizar.sucursal === null || vm.Regularizar.sucursal === 0) ? vm.Regularizar.OperacionVendedor.sucursalOpe : (vm.Regularizar.sucursal == vm.Regularizar.OperacionVendedor.sucursalOpe) ? vm.Regularizar.OperacionVendedor.sucursalOpe : vm.Regularizar.sucursal;
            vm.ColocacionVend.empresaVendedorAntes = vm.ColocacionVend.empresaVendedor;
            vm.ColocacionVend.agenciaAntes = vm.Regularizar.OperacionVendedor.sucursalOpe;
            vm.ColocacionVend.codigoVendedorAntes = vm.Regularizar.OperacionVendedor.codigoVendedorCol;

            vm.ColocacionVend.observacion = vm.Regularizar.observacion;
            vm.ColocacionVend.estadoSolicitud = 'P';
            //vm.ColocacionVend.usuarioSolicitante = localStorageService.get('usuarioToken').firmaUsuario;
            vm.ColocacionVend.tipoReg = vm.Regularizar.OperacionVendedor.tipoRegistro;
            if (vm.verificaEstado) {/// solo cdr 
                console.log("Solo sucursal colocacion");
                vm.ColocacionVend.bReqAproGenA = (vm.desahabilitadoA) ? true : false;
                vm.ColocacionVend.bReqAproGenB = (vm.verificaEstado) ? true : false;
                vm.ColocacionVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
                vm.ColocacionVend.bReqFDN = (vm.desahabilitadoB) ? true : false;
                if (vm.ColocacionVend.bReqAproGenA && vm.ColocacionVend.bReqAproGenB) {
                    vm.ColocacionVend.cantAprobacion = 2;
                } else {
                    vm.ColocacionVend.cantAprobacion = 1;
                }

                if (vm.ColocacionVend.bReqAproGenA) {
                    vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 1, tipoAprobacionB: 0 });
                }
                else {
                    console.log("No agrega");
                }

                if (vm.ColocacionVend.bReqAproGenB) {
                    if (vm.desahabilitadoB) {
                        vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
                    } else {
                        if (vm.ColocacionVend.bReqAproGenB) {
                            vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 0, tipoAprobacionB: 1 });
                        } else {
                            vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
                        }
                    }
                } else {
                    console.log("No agrega");
                }

            } else {
                console.log("Solo ");
                //vm.ColocacionVend.bReqAproGenA = (vm.desahabilitadoA) ? true : false;
                vm.ColocacionVend.bReqAproGenA = (vm.desahabilitadoB) ? true : false;
                vm.ColocacionVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
                vm.ColocacionVend.bReqFDN = (vm.desahabilitadoB) ? true : false;
                if (vm.ColocacionVend.bReqAproGenA && vm.ColocacionVend.bReqAproGenB) {
                    vm.ColocacionVend.cantAprobacion = 2;
                } else {
                    vm.ColocacionVend.cantAprobacion = 1;
                }
                if (vm.ColocacionVend.bReqAproGenA) {
                    vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 1, tipoAprobacionB: 0 });
                }
                else {
                    console.log("No agrega");
                }
                /*
                if (vm.ColocacionVend.bReqAproGenB) {
                    vm.Regularizar.listColocacionAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB[0].usuarioISYS.firma, codigo: vm.GerenteB[0].usuarioISYS.codigo, usuario: vm.GerenteB[0].usuarioISYS.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 0, tipoAprobacionB: 1 });
                } else {
                    console.log("No agrega"); Funcionario
                }*/
            }
            //vm.ColocacionVend.usuarioSolicitante = localStorageService.get('usuarioToken').firmaUsuario;
            //vm.ColocacionVend.usuario = localStorageService.get('usuarioToken').codigoUsuario;
            vm.ColocacionVend.listColocacionAprobacion = vm.Regularizar.listColocacionAprobacion;
            vm.Regularizar.listColocacionAprobacion.push({ idFondoMutuo: 0, firma: vm.Funcionario.firma, codigo: vm.Funcionario.codigo, usuario: vm.Funcionario.firma, correoUsuario: vm.Regularizar.correoFuncionario, aprobacionRequerida: false, tipoAprobacionA: 0, tipoAprobacionB: 0 });
            console.log(vm.ColocacionVend);
        };

        function SetearFondosMutuos()
        {
            console.log(vm.FondoMutuoVend);
            vm.FondoMutuoVend.agenciaNueva = (vm.desahabilitadoA == false) ? vm.Regularizar.OperacionVendedor.sucursalVend : (vm.Regularizar.sucursal === "" || vm.Regularizar.sucursal === null || vm.Regularizar.sucursal === 0) ? vm.Regularizar.OperacionVendedor.sucursalVend : (vm.Regularizar.sucursal == vm.Regularizar.OperacionVendedor.sucursalVend) ? vm.Regularizar.OperacionVendedor.sucursalVend : vm.Regularizar.sucursal;
            //vm.FondoMutuoVend.funcionarioNuevo = vm.Regularizar.vendedor;
            vm.FondoMutuoVend.agenciaAntes = vm.Regularizar.OperacionVendedor.sucursalVend;
            vm.FondoMutuoVend.funcionarioAntes = vm.Regularizar.OperacionVendedor.codigoVendedorCol;
            vm.FondoMutuoVend.observacion = vm.Regularizar.observacion;
            vm.FondoMutuoVend.estadoSolicitud = 'P';
            vm.FondoMutuoVend.tipoReg = vm.Regularizar.OperacionVendedor.tipoRegistro;
            //vm.FondoMutuoVend.usuarioSolicitante = localStorageService.get('usuarioToken').firmaUsuario;
            /*Inicio valida solicitud*/
            if (vm.verificaEstado) {/// solo cdr 
                console.log("Solo sucursal");
                vm.FondoMutuoVend.bReqAproGenA = (vm.desahabilitadoA) ? true : false;
                vm.FondoMutuoVend.bReqAproGenB = (vm.verificaEstado) ? true : false;
                vm.FondoMutuoVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
                vm.FondoMutuoVend.bReqFDN = (vm.desahabilitadoB) ? true : false;
                if (vm.FondoMutuoVend.bReqAproGenA && vm.FondoMutuoVend.bReqAproGenB) {
                    vm.FondoMutuoVend.cantAprobacion = 2;
                } else {
                    vm.FondoMutuoVend.cantAprobacion = 1;
                }

                if (vm.FondoMutuoVend.bReqAproGenA) {
                    vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 1, tipoAprobacionB: 0 });
                }
                else {
                    console.log("No agrega");
                }
                if (vm.FondoMutuoVend.bReqAproGenB) {
                    if (vm.desahabilitadoB) {
                        vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol) ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : (vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
                        vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
                    } else {
                        if (vm.FondoMutuoVend.bReqAproGenB) {
                            vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
                            vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 0, tipoAprobacionB: 1 });
                        } else {
                            vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
                            vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
                        }
                    }
                } else {
                    console.log("No agrega");
                }
            } else {
                console.log("Solo ");

                vm.FondoMutuoVend.bReqAproGenA = (vm.desahabilitadoB) ? true : false;
                vm.FondoMutuoVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
                vm.FondoMutuoVend.bReqFDN = (vm.desahabilitadoB) ? true : false;

                vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
                if (vm.FondoMutuoVend.bReqAproGenA && vm.FondoMutuoVend.bReqAproGenB) {
                    vm.FondoMutuoVend.cantAprobacion = 2;
                } else {
                    vm.FondoMutuoVend.cantAprobacion = 1;
                }
                if (vm.FondoMutuoVend.bReqAproGenA) {
                    vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 1, tipoAprobacionB: 0 });
                }
                else {
                    console.log("No agrega");
                }
            }
            vm.FondoMutuoVend.listFondoMutuoAprobacion = vm.Regularizar.listFondoMutuoAprobacion;
            vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.Funcionario.firma, codigo: vm.Funcionario.codigo, usuario: vm.Funcionario.firma, correoUsuario: vm.Regularizar.correoFuncionario, aprobacionRequerida: false, tipoAprobacionA: 0, tipoAprobacionB: 0 });
            console.log(vm.FondoMutuoVend);
        };

        function SetearCompraDeuda()
        {

        };

        $('#idSucursal').keyup(function (e)
        {
            if (e.keyCode == 13)
                Buscar(true);
            else
                Buscar(true);
        });

        function Buscar(force)
        {
            var sucursal = $("#idSucursal").val();
            if (sucursal.length > 0) {
                if (vm.Regularizar.OperacionVendedor.tipoRegistro == 1) {
                    if (vm.Regularizar.OperacionVendedor.sucursalOpe != sucursal) {
                        vm.habilitadoCorreoGerenteB = false;
                        vm.Regularizar.validaCDR = false;
                        vm.Regularizar.validaCorreoFDN = true;
                        vm.verificaEstado = true;
                    } else {
                        vm.Regularizar.validaCDR = true;
                        vm.habilitadoCorreoGerenteB = true;
                        vm.verificaEstado = false;
                        //toastr.warning('Ingrese una sucursal diferente.', 'Regularizar');
                    }
                } else {
                    if (vm.Regularizar.OperacionVendedor.sucursalVend != sucursal) {
                        vm.habilitadoCorreoGerenteB = false;
                        vm.Regularizar.validaCDR = false;
                        if (vm.desahabilitadoA) {
                            vm.Regularizar.validaCorreoFDN = true;
                        } else if (vm.desahabilitadoA) {

                        } else {
                            vm.Regularizar.validaCorreoFDN = false;
                        }
                        vm.verificaEstado = true;
                    } else {
                        vm.Regularizar.validaCDR = true;
                        vm.habilitadoCorreoGerenteB = true;
                        vm.verificaEstado = false;
                        //toastr.warning('Ingrese una sucursal diferente.', 'Regularizar');
                    }
                }
            } else {
                vm.Regularizar.validaCDR = true;
                vm.habilitadoCorreoGerenteB = true;
                vm.verificaEstado = false;
                //toastr.error('Ingrese una sucursal.', 'Regularizar');
            }
        };

        $('#idVendedor').keyup(function (e)
        {
            if (e.keyCode == 13)
                BuscarVendedorKeyup(true);
            else
                //$(this).data('timer', setTimeout(BuscarVendedorKeyup, 500));
                BuscarVendedorKeyup(true);
        });

        function BuscarVendedorKeyup(force)
        {
            var vendedor = $("#idVendedor").val();
            if (vendedor.length > 0) {
                if (vm.Regularizar.OperacionVendedor.codigoVendedorCol != vendedor) {
                    vm.Regularizar.validaFDN = false;
                    vm.Regularizar.campoFDN = false;
                    console.log(vm.Regularizar.campoFDN);
                } else {
                    vm.Regularizar.validaFDN = true;
                    vm.Regularizar.campoFDN = true;
                    console.log(vm.Regularizar.campoFDN);
                    //toastr.warning('Ingrese un vendedor diferente.', 'Regularizar');
                }
            } else {
                vm.Regularizar.validaFDN = true;
                vm.Regularizar.campoFDN = true;
                console.log(vm.Regularizar.campoFDN);
                //toastr.error('Ingrese un vendedor.', 'Regularizar');
            }
        };

        $('#idVendedor').blur(function (e)
        {
            if (e.keyCode == 13)
                BuscarVendedorKeyup(true);
            else {
                BuscarVendedorKeyup(true);
            }
        });

        function RegularizarColocacion()
        {

            var filtrarSucursal = (vm.Regularizar.sucursal == null) ? false : true;
            if (filtrarSucursal) {
                dataService.getData(apiUrl + '/Operacion/ObtenerSucursal/' + vm.Regularizar.sucursal).then(function (resultSucursal)
                {
                    vm.sucursalList = resultSucursal.data.list;
                    if (vm.sucursalList.length > 0) {
                        dataService.postData(apiUrl + '/Operacion/ObtenerDatosColocacion', vm.Regularizar.OperacionVendedor).then(function (result)
                        {
                            if (result.statusText == 'OK') {
                                console.log("Entra a colocacion");
                                console.log(result.data);
                                vm.ColocacionVend = result.data;
                                dataService.postData(apiUrl + '/Regularizar/ValidarColocacion', vm.ColocacionVend).then(function (resultValida)
                                {
                                    console.log(resultValida.data.colocacion);
                                    if (resultValida.statusText == 'OK' && resultValida.data.colocacion == 0) {
                                        SetearColocacionVendedor();
                                        bootbox.confirm("¿Desea continuar?", function (message)
                                        {
                                            if (message) {
                                                dataService.postData(apiUrl + '/Regularizar/GuardarColocacion', vm.ColocacionVend).then(function (result)
                                                {
                                                    if (result.statusText == 'OK') {
                                                        //toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
                                                        console.log("RETORNO EL GUARDADO");
                                                        //LimpiarRegularizacion();
                                                        //$state.go("RegularizacionInterna", {}, { reload: true });
                                                    }
                                                }, function (error) { authenticationService.errorValida(error); });
                                            }
                                            else {
                                                vm.Regularizar.listColocacionAprobacion = [];
                                            }
                                        });
                                    } else {
                                        //toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
                                    }
                                }, function (errorValida) { authenticationService.errorValida(errorValida); });
                            }
                        }, function (error) { authenticationService.errorValida(error); });
                    } else {
                        //toastr.warning('La sucursal ingresada no existe.', 'Regularizar');
                    }
                }, function (errorSucursal) { authenticationService.errorValida(errorSucursal); });
            } else {
                dataService.postData(apiUrl + '/Operacion/ObtenerDatosColocacion', vm.Regularizar.OperacionVendedor).then(function (result)
                {
                    if (result.statusText == 'OK') {
                        console.log("Entra a colocacion");
                        console.log(result.data);
                        vm.ColocacionVend = result.data;
                        dataService.postData(apiUrl + '/Regularizar/ValidarColocacion', vm.ColocacionVend).then(function (resultValida)
                        {
                            if (resultValida.statusText == 'OK' && resultValida.data.colocacion == 0) {
                                SetearColocacionVendedor();
                                bootbox.confirm("¿Desea continuar?", function (message)
                                {
                                    if (message) {
                                        dataService.postData(apiUrl + '/Regularizar/GuardarColocacion', vm.ColocacionVend).then(function (result)
                                        {
                                            if (result.statusText == 'OK') {
                                                //toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
                                                console.log("RETORNO EL GUARDADO");
                                                //LimpiarRegularizacion();
                                                //$state.go("RegularizacionInterna", {}, { reload: true });
                                            }
                                        }, function (error) { authenticationService.errorValida(error); });
                                    } else {
                                        vm.Regularizar.listColocacionAprobacion = [];
                                    }
                                });
                            } else {
                                //toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
                            }
                        }, function (errorValida) { authenticationService.errorValida(errorValida); });
                    }
                }, function (error) { authenticationService.errorValida(error); });
            }
        };

        function RegularizarFondoMutuo()
        {
            var filtrarSucursal = (vm.Regularizar.sucursal == null) ? false : true;
            if (filtrarSucursal) {
                ///verificamos si la sucursal existe
                dataService.getData(apiUrl + '/Operacion/ObtenerSucursal/' + vm.Regularizar.sucursal).then(function (result)
                {
                    vm.sucursalList = result.data.list;
                    if (vm.sucursalList.length > 0) {
                        ///Obtener Fondos Mutuos
                        dataService.postData(apiUrl + '/Operacion/ObtenerDatosFondosMutuos', vm.Regularizar.OperacionVendedor).then(function (result)
                        {
                            if (result.statusText == 'OK') {
                                console.log("Entra a fondos");
                                console.log(result.data);
                                vm.FondoMutuoVend = result.data;
                                dataService.postData(apiUrl + '/Regularizar/ValidarFondoMutuo', vm.FondoMutuoVend).then(function (resultValida)
                                {
                                    console.log(resultValida);
                                    if (resultValida.statusText == 'OK' && resultValida.data.fondo == 0) {
                                        SetearFondosMutuos();
                                        bootbox.confirm("¿Desea continuar?", function (message)
                                        {
                                            if (message) {
                                                dataService.postData(apiUrl + '/Regularizar/GuardarFondoMutuo', vm.FondoMutuoVend).then(function (resultFondos)
                                                {
                                                    if (resultFondos.statusText == 'OK') {
                                                        //toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
                                                        console.log("RETORNO EL GUARDADO");
                                                        //LimpiarRegularizacion();
                                                        //$state.go('RegularizacionInterna');
                                                        //$state.go("RegularizacionInterna", {}, { reload: true });
                                                    }
                                                }, function (errorFondo) { authenticationService.errorValida(errorFondo); });
                                            } else {
                                                vm.Regularizar.listFondoMutuoAprobacion = [];
                                            }
                                        });
                                    } else {
                                        //toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
                                    }
                                }, function (errorValida) { authenticationService.errorValida(errorValida); });
                            }
                        }, function (error) { authenticationService.errorValida(error); });
                    } else {
                        //vm.habilitadoCorreoGerenteB = false;
                        //vm.Regularizar.validaCDR = true;
                        //toastr.warning('La sucursal ingresada no existe.', 'Regularizar');
                    }
                }, function (error) { authenticationService.errorValida(error); })
            }
            else {
                ///Obtener Fondos Mutuos
                dataService.postData(apiUrl + '/Operacion/ObtenerDatosFondosMutuos', vm.Regularizar.OperacionVendedor).then(function (result)
                {
                    if (result.statusText == 'OK') {
                        console.log("Entra a fondos");
                        console.log(result.data);
                        vm.FondoMutuoVend = result.data;
                        dataService.postData(apiUrl + '/Regularizar/ValidarFondoMutuo', vm.FondoMutuoVend).then(function (resultValida)
                        {
                            console.log(resultValida);
                            if (resultValida.statusText == 'OK' && resultValida.data.fondo == 0) {
                                SetearFondosMutuos();
                                bootbox.confirm("¿Desea continuar?", function (message)
                                {
                                    if (message) {
                                        dataService.postData(apiUrl + '/Regularizar/GuardarFondoMutuo', vm.FondoMutuoVend).then(function (resultFondos)
                                        {
                                            if (resultFondos.statusText == 'OK') {
                                                //toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
                                                console.log("RETORNO EL GUARDADO");
                                                //LimpiarRegularizacion();
                                                //return $state.go('RegularizacionInterna');
                                                //$state.go("RegularizacionInterna", {}, { reload: true });
                                            }
                                        }, function (error) { authenticationService.errorValida(error); });
                                    } else {
                                        vm.Regularizar.listFondoMutuoAprobacion = [];
                                    }
                                });
                            } else {
                                //toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
                            }
                        }, function (errorValida)
                        {
                            authenticationService.errorValida(errorValida);
                        });
                    }
                }, function (error) { authenticationService.errorValida(error); });
            }
        };

        function RegularizarCompraDeuda()
        {

        };

        $scope.SelectedCountry = null;
        $scope.SelectedCountry = function (selected)
        {
            if (selected) {
                $scope.SelectedCountry = selected.originalObject;
            }
        };

        $('#txtAutocomplete').keyup(function (e)
        {
            clearTimeout($.data(this, 'timer'));
            console.log(e.keyCode);
            if (e.keyCode == 13)
                VerificarGerenteCorreoInicial(false);
            else
                $(this).data('timer', setTimeout(VerificarGerenteCorreoInicial(true), 500));
        });

        $('#txtCorreoGerenteA').keyup(function (e)
        {
            clearTimeout($.data(this, 'timer'));
            console.log(e.keyCode);
            if (e.keyCode == 13)
                VerificarGerenteCorreoInicial(false);
            else
                $(this).data('timer', setTimeout(VerificarGerenteCorreoInicial(true), 500));
        });

        $('#txtCorreoGerenteB').keyup(function (e)
        {
            clearTimeout($.data(this, 'timer'));
            console.log(e.keyCode);
            if (e.keyCode == 13)
                VerificarGerenteCorreoFinal(false);
            else
                $(this).data('timer', setTimeout(VerificarGerenteCorreoFinal(true), 500));
        });

        $('#txtCorreoFuncionario').keyup(function (e)
        {
            clearTimeout($.data(this, 'timer'));
            console.log(e.keyCode);
            if (e.keyCode == 13)
                VerificarCorreoCopia(false);
            else
                $(this).data('timer', setTimeout(VerificarCorreoCopia(true), 500));
        });


}]);

//app.controller('regularizacionController', function (dataService, configService, authenticationService, $scope)
//{

//    var apiUrl = configService.getApiUrl();
//    var vm = this;
//    vm.Regularizar = {
//        nTipo: '',
//        tablaTipoSeleccionado: null,
//        totalReg: 0,
//        totalCount: 0,
//        maxSize: 1,
//        numPages: 1,
//        label1: 'Modificar CDR',
//        vendedor: null,
//        sucursal: null,
//        observacion: '',
//        label2: 'Modificar FDN',
//        correoGerenteA: '',
//        correoGerenteB: '',
//        correoFuncionario: '',
//        requiereAprobGenA: false,
//        requiereAprobGenB: false,
//        validaFDN: false,
//        campoFDN: false,
//        validaCDR: false,
//        validaCorreoFDN: false,
//        validaCorreoCDR: false,
//        colocacionVendedor: [],
//        listColocacionAprobacion: [],
//        listFondoMutuoAprobacion: [],
//        moduloConsulta: null,
//        cuentaConsulta: null,
//        operacionConsulta: null,
//        subOperacionConsulta: null,
//        tipoConsulta: null,
//        paginaActual: 1,
//        cantidadRegistros: '10',
//        correoGerenteBtest: "",
//        modulo: null
//    }

//    vm.desahabilitado = true;
//    vm.desahabilitadoA = false;
//    vm.desahabilitadoB = false;
//    vm.desahabilitadoCDR = true;
//    vm.desahabilitadoFDN = true;
//    vm.habilitadoCorreoGerenteA = true;
//    vm.habilitadoCorreoGerenteB = true;
//    vm.mostrarErrorSucursal = false;
//    vm.verificaEstado = false;

//    vm.BuscarOperaciones = BuscarOperaciones;
//    vm.LimpiarBusqueda = LimpiarBusqueda;
//    vm.SolicitarRegularizacion = SolicitarRegularizacion;
//    vm.ModuloSeleccionado = ModuloSeleccionado;
//    vm.habilitarCDR = habilitarCDR;
//    vm.habilitarFDN = habilitarFDN;
//    vm.LimpiarRegularizacion = LimpiarRegularizacion;
//    vm.Seleccionar = Seleccionar;
//    vm.PageChaged = PageChaged;
//    vm.resetAll = resetAll;

//    vm.guardarModulo = guardarModulo;

//    vm.colocacionVendedor;
//    vm.OperacionVendedor;
//    vm.ModuloList;
//    vm.sucursalList;
//    vm.Colocaciones = {};
//    vm.GerenteA = [];
//    vm.GerenteB = [];
//    vm.Funcionario = [];
//    vm.ColocacionVend;
//    vm.FondoMutuoVend;
//    vm.ModuloTipo = [];

//    ModuloLoad();
//    //CargarUsuarioLogueado();

    

//    function ModuloLoad()
//    {
//        dataService.getData(apiUrl + '/TablaTipo/ObtenerTipoModulo').then(function (result)
//        {
//            console.log(result);
//            vm.ModuloList = result.data;
//        }, function (error) { authenticationService.errorValida(error); })
//    };

//    function ModuloSeleccionado(valor)
//    {
//        console.log("eNTRA");
//        console.log(valor);
//        if (valor == undefined) {
//            vm.Regularizar.nModulo = null;
//            vm.Regularizar.moduloConsulta = null;
//            vm.Regularizar.tipoConsulta = null;
//        } else {
//            var seleccionado = [];
//            seleccionado.push(valor);
//            vm.Regularizar.nModulo = JSON.parse(seleccionado[0]).Valor;
//            vm.Regularizar.moduloConsulta = JSON.parse(seleccionado[0]).Valor;
//            vm.Regularizar.tipoConsulta = JSON.parse(seleccionado[0]).Tipo;
//            console.log(vm.Regularizar);
//            if (vm.Regularizar.tipoConsulta === 1) {
//                vm.Regularizar.totalCount = 0;
//                vm.Colocaciones = {};
//            } else if (vm.Regularizar.tipoConsulta === 2) {
//                vm.Regularizar.totalCount = 0;
//                vm.Colocaciones = {};
//            } else if (vm.Regularizar.tipoConsulta === 3) {
//                vm.Regularizar.totalCount = 0;
//                vm.Colocaciones = {};
//            }
//        }
//    };

//    function guardarModulo()
//    {
//        vm.ModuloTipo.CodigoModulo = 5;
//        vm.ModuloTipo.NombreModulo = "PROD 3";
//        vm.ModuloTipo.Valor = "3";
//        vm.ModuloTipo.Tipo = 5;
//        console.log(vm.ModuloTipo);
//        dataService.postData(apiUrl + '/TablaTipo/GuardarModulo', vm.ModuloTipo).then(function (resultCant)
//        {
//            if (resultCant.statusText == 'OK') {
//                //toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
//                console.log("RETORNO EL GUARDADO");
//                //LimpiarRegularizacion();
//                //$state.go("RegularizacionInterna", {}, { reload: true });
//            }
//        }, function (error)
//        {
//            authenticationService.errorValida(error);
//        });
//    }

//    function validaCamposSeteo()
//    {

//        if (vm.Regularizar.moduloConsulta === "" || vm.Regularizar.moduloConsulta === null) vm.Regularizar.moduloConsulta = "";
//        if (vm.Regularizar.cuentaConsulta === "" || vm.Regularizar.cuentaConsulta === null) vm.Regularizar.cuentaConsulta = "";
//        if (vm.Regularizar.operacionConsulta === "" || vm.Regularizar.operacionConsulta === null) vm.Regularizar.operacionConsulta = "";
//        if (vm.Regularizar.subOperacionConsulta === "" || vm.Regularizar.subOperacionConsulta === null) vm.Regularizar.subOperacionConsulta = "";
//    }

//    function PageChaged()
//    {
//        console.log("consulta");
//        BuscarOperaciones();
//    };

//    function SetPrevpage()
//    {

//    };

//    function SetNextpage()
//    {

//    };

//    function habilitarCDR()
//    {
//        if (vm.desahabilitadoA) {
//            console.log("entro 1");
//            vm.desahabilitadoA = false;
//            if (vm.desahabilitadoB) {
//                console.log("entro 1.1");
//                vm.habilitadoCorreoGerenteA = false;
//                vm.habilitadoCorreoGerenteB = true;
//                vm.Regularizar.validaCorreoFDN = false;
//                vm.verificaEstado = false;
//            } else {
//                console.log("entro 1.2");
//                vm.habilitadoCorreoGerenteA = true;
//                vm.habilitadoCorreoGerenteB = true;
//                vm.Regularizar.validaCorreoCDR = false;
//                vm.Regularizar.validaCorreoFDN = false;
//                vm.verificaEstado = false;
//            }
//            vm.desahabilitadoCDR = true;
//            vm.Regularizar.validaCDR = false;
//            $scope.validaCDR = false;
//        } else {
//            console.log("entro 2");
//            if (vm.desahabilitadoB) {
//                console.log("entro 2.1");
//                vm.Regularizar.sucursal = "";
//            } else {
//                console.log("entro 2.2");
//                vm.habilitadoCorreoGerenteA = false;
//                vm.Regularizar.validaCorreoCDR = true;
//            }
//            vm.desahabilitadoA = true;
//            vm.desahabilitadoCDR = false;
//            vm.Regularizar.validaCDR = true;
//            $scope.validaCDR = true;
//        }
//    };

//    function habilitarFDN()
//    {
//        console.log(vm.desahabilitadoB);
//        if (vm.desahabilitadoB) {
//            console.log("entro 1");
//            console.log(vm.Regularizar.validaFDN);
//            if (vm.Regularizar.validaCorreoCDR) {
//                console.log("entro 1.1");
//                vm.Regularizar.validaCorreoCDR = true;
//                vm.habilitadoCorreoGerenteA = false;
//            } else {
//                console.log("entro 1.2");
//                vm.desahabilitadoB = false;
//                vm.desahabilitadoFDN = true;
//                vm.habilitadoCorreoGerenteA = true;
//                vm.Regularizar.validaCorreoCDR = true;
//            }
//            vm.desahabilitadoB = false;
//            vm.desahabilitadoFDN = true;
//            vm.Regularizar.validaFDN = false;
//            vm.Regularizar.campoFDN = false;
//            $scope.validaFDN = false;
//        } else {
//            console.log("entro 2");
//            console.log(vm.Regularizar.validaFDN);
//            if (vm.Regularizar.validaCorreoCDR) {
//                console.log("entro 2.1");
//            } else {
//                console.log("entro 2.2");
//                vm.habilitadoCorreoGerenteA = false;
//            }

//            vm.desahabilitadoB = true;
//            vm.desahabilitadoFDN = false;
//            vm.Regularizar.validaFDN = true;
//            vm.Regularizar.validaCorreoCDR = true;
//            vm.Regularizar.campoFDN = true;
//            $scope.validaFDN = true;
//        }
//    };

//    function Seleccionar(colocacion)
//    {
//        LimpiarRegularizacion();
//        vm.desahabilitado = false;
//        vm.Regularizar.OperacionVendedor = colocacion;
//        console.log(vm.Regularizar.OperacionVendedor);
//    };

//    function resetAll(currentRow)
//    {
//        setearValores();
//        vm.desahabilitado = false;
//        console.log(currentRow);
//        $.each(vm.Colocaciones, function (index, value)
//        {
//            if (value.reg != currentRow.reg) {
//                value.seleccionado = false;
//            } else {
//                value.seleccionado = true;
//                vm.Regularizar.OperacionVendedor = currentRow;
//            }
//        });
//    };

//    function setearValores()
//    {
//        vm.desahabilitado = true;
//        vm.desahabilitadoA = false;
//        vm.desahabilitadoB = false;
//        vm.desahabilitadoCDR = true;
//        vm.desahabilitadoFDN = true;
//        vm.habilitadoCorreoGerenteA = true;
//        vm.habilitadoCorreoGerenteB = true;
//        vm.mostrarErrorSucursal = false;
//        vm.verificaEstado = false;
//        vm.Regularizar.validaCDR = false;
//        vm.Regularizar.validaFDN = false;
//        vm.Regularizar.campoFDN = false;
//    };

//    function LimpiarBusqueda()
//    {
//        vm.Regularizar.nTipo = '';
//        vm.Regularizar.tablaTipoSeleccionado = null;
//        vm.Regularizar.moduloConsulta = null;
//        vm.Regularizar.cuentaConsulta = null;
//        vm.Regularizar.operacionConsulta = null;
//        vm.Regularizar.subOperacionConsulta = null;
//        vm.Regularizar.tipoConsulta = null;
//    };

//    function LimpiarRegularizacion()
//    {
//        vm.colocacionVendedor = [];
//        vm.Regularizar.sucursal = null;
//        vm.Regularizar.vendedor = null;
//        vm.Regularizar.correoGerenteA = '';
//        vm.Regularizar.correoGerenteB = '';
//        //vm.Regularizar.correoFuncionario = '';
//        vm.Regularizar.observacion = '';
//        vm.Regularizar.colocacionVendedor = [];
//        vm.Regularizar.listColocacionAprobacion = [];
//        vm.Regularizar.listFondoMutuoAprobacion = [];
//        vm.desahabilitado = true;
//        vm.desahabilitadoA = false;
//        vm.desahabilitadoB = false;
//        vm.desahabilitadoCDR = true;
//    };

//    function ObtenerUsuarioTemporal(valor)
//    {
//        var email = valor;
//        var usuario = email.substring(0, email.lastIndexOf("@"));
//        return usuario;
//    };

//    function BuscarOperaciones(valid)
//    {
//        console.log($scope.frmConsultar);
//        console.log($scope.frmConsultar.$valid);
//        console.log(valid);
//        validaCamposSeteo();
//        if ($scope.frmConsultar.$valid) {
//            dataService.postData(apiUrl + '/Operacion/DatosCantidad', vm.Regularizar).then(function (resultCant)
//            {
//                if (resultCant.statusText == 'OK') {
//                    vm.Regularizar.totalCount = resultCant.data;
//                    if (resultCant.data > 0) {
//                        dataService.postData(apiUrl + '/Operacion/Datos', vm.Regularizar).then(function (result)
//                        {
//                            if (result.statusText == 'OK') {
//                                vm.Colocaciones = result.data;
//                            }
//                        }, function (error) { authenticationService.errorValida(error); });
//                    }
//                }
//            }, function (error)
//            {
//                authenticationService.errorValida(error);
//            });
//        } else {
//            //toastr.warning('Seleccione un modulo.', 'Regularizar');
//        }
//    };

//    function SolicitarRegularizacion(valido)
//    {
//        console.log($scope.frmSolicitud);
//        console.log($scope.frmSolicitud.$valid);
//        console.log(valido);
//        if (vm.desahabilitadoA || vm.desahabilitadoB) {
//            if ($scope.frmSolicitud.$valid) {
//                if (vm.Regularizar.OperacionVendedor.tipoRegistro === 1) {
//                    RegularizarColocacion();
//                } else if (vm.Regularizar.OperacionVendedor.tipoRegistro == 2) {
//                    RegularizarFondoMutuo();
//                } else if (vm.Regularizar.OperacionVendedor.tipoRegistro == 3) {
//                    dataService.postData(apiUrl + '/Operacion/ObtenerDatosCompraDeuda', vm.Regularizar.OperacionVendedor).then(function (result)
//                    {
//                        if (result.statusText == 'OK') {
//                            console.log("Entra a compra");
//                            console.log(result.data);
//                        }
//                    }, function (error) { authenticationService.errorValida(error); });
//                }
//                else {
//                    //toastr.warning('No existe', 'Regularizar');
//                }
//            } else {
//                //toastr.error('Ingrese los datos requeridos', 'Regularizar');
//            }
//        } else {
//            //toastr.error('Seleccion cualquier opción', 'Regularizar');
//        }
//    };

//    function VerificarGerenteCorreoInicial(valor)
//    {
//        var texto = document.getElementById("txtCorreoGerenteA").value;
//        if (valor && texto.length > 1) {
//            if (vm.Regularizar.OperacionVendedor.tipoRegistro === 1) {
//                var validarCorreo = { sucursal: vm.Regularizar.OperacionVendedor.sucursalVend, correo: vm.Regularizar.correoGerenteA };
//            } else {
//                var validarCorreo = { sucursal: vm.Regularizar.OperacionVendedor.sucursalVend, correo: vm.Regularizar.correoGerenteA };
//            }
//            $('#txtCorreoGerenteA').autocomplete({
//                source: function (request, response)
//                {
//                    $.ajax({
//                        url: apiUrl + '/Certifica/ObtenerTrabajador',
//                        data: validarCorreo,
//                        dataType: 'json',
//                        type: 'POST',
//                        success: function (data)
//                        {
//                            response($.map(data, function (item)
//                            {
//                                console.log(item);
//                                return {
//                                    label: item.correo,
//                                    value: item.firma,
//                                    registro: item.registro,
//                                }
//                            }));
//                        },
//                        error: function (XMLHttpRequest, textStatus, errorThrown)
//                        {
//                            console.log('error', textStatus, errorThrown);
//                            console.log(textStatus);
//                        }
//                    })
//                },
//                minLength: 1,
//                select: function (event, ui)
//                {
//                    console.log(ui);
//                    vm.GerenteA.firma = ui.item.value;
//                    vm.GerenteA.codigo = ui.item.registro;
//                    vm.Regularizar.correoGerenteA = ui.item.label;
//                    $('#txtCorreoGerenteA').val(ui.item.label);
//                    console.log(vm.Regularizar.correoGerenteA);
//                    console.log(vm.GerenteA);
//                    return false;
//                }
//            });
//        } else {

//        }
//    };

//    function VerificarGerenteCorreoFinal(valor)
//    {
//        var consulta = { sucursal: vm.Regularizar.sucursal, correo: vm.Regularizar.correoGerenteB };
//        var texto = document.getElementById("txtCorreoGerenteB").value;
//        console.log(texto.length);
//        if (valor && texto.length > 1) {
//            $('#txtCorreoGerenteB').autocomplete({
//                source: function (request, response)
//                {
//                    var autocompleteUrl = apiUrl + '/Certifica/ObtenerTrabajadorFiltro/' + consulta.sucursal + '/' + consulta.correo;
//                    $.ajax({
//                        url: apiUrl + '/Certifica/ObtenerTrabajador',
//                        data: consulta,
//                        dataType: 'json',
//                        type: 'POST',
//                        success: function (data)
//                        {
//                            response($.map(data, function (item)
//                            {
//                                console.log(item);
//                                return {
//                                    label: item.correo,
//                                    value: item.firma,
//                                    registro: item.registro,

//                                }
//                            }));
//                        },
//                        error: function (XMLHttpRequest, textStatus, errorThrown)
//                        {
//                            console.log('error', textStatus, errorThrown);
//                            console.log(textStatus);
//                        }
//                    })
//                },
//                minLength: 1,
//                select: function (event, ui)
//                {
//                    console.log(ui);
//                    vm.GerenteB.firma = ui.item.value;
//                    vm.GerenteB.codigo = ui.item.registro;
//                    vm.Regularizar.correoGerenteB = ui.item.label;
//                    $('#txtCorreoGerenteB').val(ui.item.label);
//                    console.log(vm.Regularizar.correoGerenteB);
//                    console.log(vm.GerenteB);
//                    return false;
//                }
//            });
//        } else {
//            console.log("no entra")
//        }
//    };

//    function VerificarCorreoCopia(valor)
//    {
//        var texto = document.getElementById("txtCorreoFuncionario").value;
//        var consulta = { correo: vm.Regularizar.correoFuncionario };
//        console.log(texto.length);
//        if (valor && texto.length > 1) {
//            $('#txtCorreoFuncionario').autocomplete({
//                source: function (request, response)
//                {
//                    $.ajax({
//                        url: apiUrl + '/Certifica/ObtenerInfoTrabajador',
//                        data: consulta,
//                        dataType: 'json',
//                        type: 'POST',
//                        success: function (data)
//                        {
//                            response($.map(data, function (item)
//                            {
//                                console.log(item);
//                                return {
//                                    label: item.correo,
//                                    value: item.firma,
//                                    registro: item.registro,

//                                }
//                            }));
//                        },
//                        error: function (XMLHttpRequest, textStatus, errorThrown)
//                        {
//                            console.log('error', textStatus, errorThrown);
//                            console.log(textStatus);
//                        }
//                    })
//                },
//                minLength: 1,
//                select: function (event, ui)
//                {
//                    console.log(ui);
//                    vm.Funcionario.firma = ui.item.value;
//                    vm.Funcionario.codigo = ui.item.registro;
//                    vm.Regularizar.correoFuncionario = ui.item.label;
//                    $('#txtCorreoFuncionario').val(ui.item.label);
//                    console.log(vm.Regularizar.correoFuncionario);
//                    console.log(vm.Funcionario);
//                    return false;
//                }
//            });
//        }
//    };

//    function ValidaSucursales()
//    {
//        if (vm.desahabilitadoA) {
//            if (vm.Regularizar.OperacionVendedor.sucursalCol === vm.Regularizar.sucursal) {
//                //toastr.warning('Ingrese una sucursal diferente.', 'Regularizar');
//                return false;
//            } else {
//                //toastr.success('Correcto.', 'Regularizar');
//                return true;
//            }
//        } else {
//            return true;
//        }
//    }

//    function ValidaFuncionario()
//    {
//        if (vm.desahabilitadoB) {
//            if (vm.Regularizar.OperacionVendedor.codigoVendedorCol === vm.Regularizar.vendedor) {
//                //toastr.warning('Ingrese un vendedor diferente.', 'Regularizar');
//                return false;
//            } else {
//                //toastr.success('Correcto.', 'Regularizar');
//                return true;
//            }
//        } else {
//            return true;
//        }
//    };

//    function SetearColocacionVendedor()
//    {
//        console.log(vm.ColocacionVend);

//        vm.ColocacionVend.empresaVendedorNuevo = vm.ColocacionVend.empresaVendedor;
//        vm.ColocacionVend.codigoVendedorNuevo = (vm.Regularizar.vendedor === "" || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === 0) ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : (vm.Regularizar.vendedor == vm.Regularizar.OperacionVendedor.codigoVendedorCol) ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
//        vm.ColocacionVend.agenciaNueva = (vm.desahabilitadoA == false) ? vm.Regularizar.OperacionVendedor.sucursalOpe : (vm.Regularizar.sucursal === "" || vm.Regularizar.sucursal === null || vm.Regularizar.sucursal === 0) ? vm.Regularizar.OperacionVendedor.sucursalOpe : (vm.Regularizar.sucursal == vm.Regularizar.OperacionVendedor.sucursalOpe) ? vm.Regularizar.OperacionVendedor.sucursalOpe : vm.Regularizar.sucursal;
//        vm.ColocacionVend.empresaVendedorAntes = vm.ColocacionVend.empresaVendedor;
//        vm.ColocacionVend.agenciaAntes = vm.Regularizar.OperacionVendedor.sucursalOpe;
//        vm.ColocacionVend.codigoVendedorAntes = vm.Regularizar.OperacionVendedor.codigoVendedorCol;

//        vm.ColocacionVend.observacion = vm.Regularizar.observacion;
//        vm.ColocacionVend.estadoSolicitud = 'P';
//        //vm.ColocacionVend.usuarioSolicitante = localStorageService.get('usuarioToken').firmaUsuario;
//        vm.ColocacionVend.tipoReg = vm.Regularizar.OperacionVendedor.tipoRegistro;
//        if (vm.verificaEstado) {/// solo cdr 
//            console.log("Solo sucursal colocacion");
//            vm.ColocacionVend.bReqAproGenA = (vm.desahabilitadoA) ? true : false;
//            vm.ColocacionVend.bReqAproGenB = (vm.verificaEstado) ? true : false;
//            vm.ColocacionVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
//            vm.ColocacionVend.bReqFDN = (vm.desahabilitadoB) ? true : false;
//            if (vm.ColocacionVend.bReqAproGenA && vm.ColocacionVend.bReqAproGenB) {
//                vm.ColocacionVend.cantAprobacion = 2;
//            } else {
//                vm.ColocacionVend.cantAprobacion = 1;
//            }

//            if (vm.ColocacionVend.bReqAproGenA) {
//                vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 1, tipoAprobacionB: 0 });
//            }
//            else {
//                console.log("No agrega");
//            }

//            if (vm.ColocacionVend.bReqAproGenB) {
//                if (vm.desahabilitadoB) {
//                    vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                } else {
//                    if (vm.ColocacionVend.bReqAproGenB) {
//                        vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                    } else {
//                        vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                    }
//                }
//            } else {
//                console.log("No agrega");
//            }

//        } else {
//            console.log("Solo ");
//            //vm.ColocacionVend.bReqAproGenA = (vm.desahabilitadoA) ? true : false;
//            vm.ColocacionVend.bReqAproGenA = (vm.desahabilitadoB) ? true : false;
//            vm.ColocacionVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
//            vm.ColocacionVend.bReqFDN = (vm.desahabilitadoB) ? true : false;
//            if (vm.ColocacionVend.bReqAproGenA && vm.ColocacionVend.bReqAproGenB) {
//                vm.ColocacionVend.cantAprobacion = 2;
//            } else {
//                vm.ColocacionVend.cantAprobacion = 1;
//            }
//            if (vm.ColocacionVend.bReqAproGenA) {
//                vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 1, tipoAprobacionB: 0 });
//            }
//            else {
//                console.log("No agrega");
//            }
//            /*
//            if (vm.ColocacionVend.bReqAproGenB) {
//                vm.Regularizar.listColocacionAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB[0].usuarioISYS.firma, codigo: vm.GerenteB[0].usuarioISYS.codigo, usuario: vm.GerenteB[0].usuarioISYS.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//            } else {
//                console.log("No agrega"); Funcionario
//            }*/
//        }
//        //vm.ColocacionVend.usuarioSolicitante = localStorageService.get('usuarioToken').firmaUsuario;
//        //vm.ColocacionVend.usuario = localStorageService.get('usuarioToken').codigoUsuario;
//        vm.ColocacionVend.listColocacionAprobacion = vm.Regularizar.listColocacionAprobacion;
//        vm.Regularizar.listColocacionAprobacion.push({ idFondoMutuo: 0, firma: vm.Funcionario.firma, codigo: vm.Funcionario.codigo, usuario: vm.Funcionario.firma, correoUsuario: vm.Regularizar.correoFuncionario, aprobacionRequerida: false, tipoAprobacionA: 0, tipoAprobacionB: 0 });
//        console.log(vm.ColocacionVend);
//    };

//    function SetearFondosMutuos()
//    {
//        console.log(vm.FondoMutuoVend);
//        vm.FondoMutuoVend.agenciaNueva = (vm.desahabilitadoA == false) ? vm.Regularizar.OperacionVendedor.sucursalVend : (vm.Regularizar.sucursal === "" || vm.Regularizar.sucursal === null || vm.Regularizar.sucursal === 0) ? vm.Regularizar.OperacionVendedor.sucursalVend : (vm.Regularizar.sucursal == vm.Regularizar.OperacionVendedor.sucursalVend) ? vm.Regularizar.OperacionVendedor.sucursalVend : vm.Regularizar.sucursal;
//        //vm.FondoMutuoVend.funcionarioNuevo = vm.Regularizar.vendedor;
//        vm.FondoMutuoVend.agenciaAntes = vm.Regularizar.OperacionVendedor.sucursalVend;
//        vm.FondoMutuoVend.funcionarioAntes = vm.Regularizar.OperacionVendedor.codigoVendedorCol;
//        vm.FondoMutuoVend.observacion = vm.Regularizar.observacion;
//        vm.FondoMutuoVend.estadoSolicitud = 'P';
//        vm.FondoMutuoVend.tipoReg = vm.Regularizar.OperacionVendedor.tipoRegistro;
//        //vm.FondoMutuoVend.usuarioSolicitante = localStorageService.get('usuarioToken').firmaUsuario;
//        /*Inicio valida solicitud*/
//        if (vm.verificaEstado) {/// solo cdr 
//            console.log("Solo sucursal");
//            vm.FondoMutuoVend.bReqAproGenA = (vm.desahabilitadoA) ? true : false;
//            vm.FondoMutuoVend.bReqAproGenB = (vm.verificaEstado) ? true : false;
//            vm.FondoMutuoVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
//            vm.FondoMutuoVend.bReqFDN = (vm.desahabilitadoB) ? true : false;
//            if (vm.FondoMutuoVend.bReqAproGenA && vm.FondoMutuoVend.bReqAproGenB) {
//                vm.FondoMutuoVend.cantAprobacion = 2;
//            } else {
//                vm.FondoMutuoVend.cantAprobacion = 1;
//            }

//            if (vm.FondoMutuoVend.bReqAproGenA) {
//                vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 1, tipoAprobacionB: 0 });
//            }
//            else {
//                console.log("No agrega");
//            }
//            if (vm.FondoMutuoVend.bReqAproGenB) {
//                if (vm.desahabilitadoB) {
//                    vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol) ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : (vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
//                    vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                } else {
//                    if (vm.FondoMutuoVend.bReqAproGenB) {
//                        vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
//                        vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                    } else {
//                        vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
//                        vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                    }
//                }
//            } else {
//                console.log("No agrega");
//            }
//        } else {
//            console.log("Solo ");

//            vm.FondoMutuoVend.bReqAproGenA = (vm.desahabilitadoB) ? true : false;
//            vm.FondoMutuoVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
//            vm.FondoMutuoVend.bReqFDN = (vm.desahabilitadoB) ? true : false;

//            vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
//            if (vm.FondoMutuoVend.bReqAproGenA && vm.FondoMutuoVend.bReqAproGenB) {
//                vm.FondoMutuoVend.cantAprobacion = 2;
//            } else {
//                vm.FondoMutuoVend.cantAprobacion = 1;
//            }
//            if (vm.FondoMutuoVend.bReqAproGenA) {
//                vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 1, tipoAprobacionB: 0 });
//            }
//            else {
//                console.log("No agrega");
//            }
//        }
//        vm.FondoMutuoVend.listFondoMutuoAprobacion = vm.Regularizar.listFondoMutuoAprobacion;
//        vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.Funcionario.firma, codigo: vm.Funcionario.codigo, usuario: vm.Funcionario.firma, correoUsuario: vm.Regularizar.correoFuncionario, aprobacionRequerida: false, tipoAprobacionA: 0, tipoAprobacionB: 0 });
//        console.log(vm.FondoMutuoVend);
//    };

//    function SetearCompraDeuda()
//    {

//    };

//    $('#idSucursal').keyup(function (e)
//    {
//        if (e.keyCode == 13)
//            Buscar(true);
//        else
//            Buscar(true);
//    });

//    function Buscar(force)
//    {
//        var sucursal = $("#idSucursal").val();
//        if (sucursal.length > 0) {
//            if (vm.Regularizar.OperacionVendedor.tipoRegistro == 1) {
//                if (vm.Regularizar.OperacionVendedor.sucursalOpe != sucursal) {
//                    vm.habilitadoCorreoGerenteB = false;
//                    vm.Regularizar.validaCDR = false;
//                    vm.Regularizar.validaCorreoFDN = true;
//                    vm.verificaEstado = true;
//                } else {
//                    vm.Regularizar.validaCDR = true;
//                    vm.habilitadoCorreoGerenteB = true;
//                    vm.verificaEstado = false;
//                    //toastr.warning('Ingrese una sucursal diferente.', 'Regularizar');
//                }
//            } else {
//                if (vm.Regularizar.OperacionVendedor.sucursalVend != sucursal) {
//                    vm.habilitadoCorreoGerenteB = false;
//                    vm.Regularizar.validaCDR = false;
//                    if (vm.desahabilitadoA) {
//                        vm.Regularizar.validaCorreoFDN = true;
//                    } else if (vm.desahabilitadoA) {

//                    } else {
//                        vm.Regularizar.validaCorreoFDN = false;
//                    }
//                    vm.verificaEstado = true;
//                } else {
//                    vm.Regularizar.validaCDR = true;
//                    vm.habilitadoCorreoGerenteB = true;
//                    vm.verificaEstado = false;
//                    //toastr.warning('Ingrese una sucursal diferente.', 'Regularizar');
//                }
//            }
//        } else {
//            vm.Regularizar.validaCDR = true;
//            vm.habilitadoCorreoGerenteB = true;
//            vm.verificaEstado = false;
//            //toastr.error('Ingrese una sucursal.', 'Regularizar');
//        }
//    };

//    $('#idVendedor').keyup(function (e)
//    {
//        if (e.keyCode == 13)
//            BuscarVendedorKeyup(true);
//        else
//            //$(this).data('timer', setTimeout(BuscarVendedorKeyup, 500));
//            BuscarVendedorKeyup(true);
//    });

//    function BuscarVendedorKeyup(force)
//    {
//        var vendedor = $("#idVendedor").val();
//        if (vendedor.length > 0) {
//            if (vm.Regularizar.OperacionVendedor.codigoVendedorCol != vendedor) {
//                vm.Regularizar.validaFDN = false;
//                vm.Regularizar.campoFDN = false;
//                console.log(vm.Regularizar.campoFDN);
//            } else {
//                vm.Regularizar.validaFDN = true;
//                vm.Regularizar.campoFDN = true;
//                console.log(vm.Regularizar.campoFDN);
//                //toastr.warning('Ingrese un vendedor diferente.', 'Regularizar');
//            }
//        } else {
//            vm.Regularizar.validaFDN = true;
//            vm.Regularizar.campoFDN = true;
//            console.log(vm.Regularizar.campoFDN);
//            //toastr.error('Ingrese un vendedor.', 'Regularizar');
//        }
//    };

//    $('#idVendedor').blur(function (e)
//    {
//        if (e.keyCode == 13)
//            BuscarVendedorKeyup(true);
//        else {
//            BuscarVendedorKeyup(true);
//        }
//    });

//    function RegularizarColocacion()
//    {

//        var filtrarSucursal = (vm.Regularizar.sucursal == null) ? false : true;
//        if (filtrarSucursal) {
//            dataService.getData(apiUrl + '/Operacion/ObtenerSucursal/' + vm.Regularizar.sucursal).then(function (resultSucursal)
//            {
//                vm.sucursalList = resultSucursal.data.list;
//                if (vm.sucursalList.length > 0) {
//                    dataService.postData(apiUrl + '/Operacion/ObtenerDatosColocacion', vm.Regularizar.OperacionVendedor).then(function (result)
//                    {
//                        if (result.statusText == 'OK') {
//                            console.log("Entra a colocacion");
//                            console.log(result.data);
//                            vm.ColocacionVend = result.data;
//                            dataService.postData(apiUrl + '/Regularizar/ValidarColocacion', vm.ColocacionVend).then(function (resultValida)
//                            {
//                                console.log(resultValida.data.colocacion);
//                                if (resultValida.statusText == 'OK' && resultValida.data.colocacion == 0) {
//                                    SetearColocacionVendedor();
//                                    bootbox.confirm("¿Desea continuar?", function (message)
//                                    {
//                                        if (message) {
//                                            dataService.postData(apiUrl + '/Regularizar/GuardarColocacion', vm.ColocacionVend).then(function (result)
//                                            {
//                                                if (result.statusText == 'OK') {
//                                                    //toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
//                                                    console.log("RETORNO EL GUARDADO");
//                                                    //LimpiarRegularizacion();
//                                                    //$state.go("RegularizacionInterna", {}, { reload: true });
//                                                }
//                                            }, function (error) { authenticationService.errorValida(error); });
//                                        }
//                                        else {
//                                            vm.Regularizar.listColocacionAprobacion = [];
//                                        }
//                                    });
//                                } else {
//                                    //toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
//                                }
//                            }, function (errorValida) { authenticationService.errorValida(errorValida); });
//                        }
//                    }, function (error) { authenticationService.errorValida(error); });
//                } else {
//                    //toastr.warning('La sucursal ingresada no existe.', 'Regularizar');
//                }
//            }, function (errorSucursal) { authenticationService.errorValida(errorSucursal); });
//        } else {
//            dataService.postData(apiUrl + '/Operacion/ObtenerDatosColocacion', vm.Regularizar.OperacionVendedor).then(function (result)
//            {
//                if (result.statusText == 'OK') {
//                    console.log("Entra a colocacion");
//                    console.log(result.data);
//                    vm.ColocacionVend = result.data;
//                    dataService.postData(apiUrl + '/Regularizar/ValidarColocacion', vm.ColocacionVend).then(function (resultValida)
//                    {
//                        if (resultValida.statusText == 'OK' && resultValida.data.colocacion == 0) {
//                            SetearColocacionVendedor();
//                            bootbox.confirm("¿Desea continuar?", function (message)
//                            {
//                                if (message) {
//                                    dataService.postData(apiUrl + '/Regularizar/GuardarColocacion', vm.ColocacionVend).then(function (result)
//                                    {
//                                        if (result.statusText == 'OK') {
//                                            //toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
//                                            console.log("RETORNO EL GUARDADO");
//                                            //LimpiarRegularizacion();
//                                            //$state.go("RegularizacionInterna", {}, { reload: true });
//                                        }
//                                    }, function (error) { authenticationService.errorValida(error); });
//                                } else {
//                                    vm.Regularizar.listColocacionAprobacion = [];
//                                }
//                            });
//                        } else {
//                            //toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
//                        }
//                    }, function (errorValida) { authenticationService.errorValida(errorValida); });
//                }
//            }, function (error) { authenticationService.errorValida(error); });
//        }
//    };

//    function RegularizarFondoMutuo()
//    {
//        var filtrarSucursal = (vm.Regularizar.sucursal == null) ? false : true;
//        if (filtrarSucursal) {
//            ///verificamos si la sucursal existe
//            dataService.getData(apiUrl + '/Operacion/ObtenerSucursal/' + vm.Regularizar.sucursal).then(function (result)
//            {
//                vm.sucursalList = result.data.list;
//                if (vm.sucursalList.length > 0) {
//                    ///Obtener Fondos Mutuos
//                    dataService.postData(apiUrl + '/Operacion/ObtenerDatosFondosMutuos', vm.Regularizar.OperacionVendedor).then(function (result)
//                    {
//                        if (result.statusText == 'OK') {
//                            console.log("Entra a fondos");
//                            console.log(result.data);
//                            vm.FondoMutuoVend = result.data;
//                            dataService.postData(apiUrl + '/Regularizar/ValidarFondoMutuo', vm.FondoMutuoVend).then(function (resultValida)
//                            {
//                                console.log(resultValida);
//                                if (resultValida.statusText == 'OK' && resultValida.data.fondo == 0) {
//                                    SetearFondosMutuos();
//                                    bootbox.confirm("¿Desea continuar?", function (message)
//                                    {
//                                        if (message) {
//                                            dataService.postData(apiUrl + '/Regularizar/GuardarFondoMutuo', vm.FondoMutuoVend).then(function (resultFondos)
//                                            {
//                                                if (resultFondos.statusText == 'OK') {
//                                                    //toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
//                                                    console.log("RETORNO EL GUARDADO");
//                                                    //LimpiarRegularizacion();
//                                                    //$state.go('RegularizacionInterna');
//                                                    //$state.go("RegularizacionInterna", {}, { reload: true });
//                                                }
//                                            }, function (errorFondo) { authenticationService.errorValida(errorFondo); });
//                                        } else {
//                                            vm.Regularizar.listFondoMutuoAprobacion = [];
//                                        }
//                                    });
//                                } else {
//                                    //toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
//                                }
//                            }, function (errorValida) { authenticationService.errorValida(errorValida); });
//                        }
//                    }, function (error) { authenticationService.errorValida(error); });
//                } else {
//                    //vm.habilitadoCorreoGerenteB = false;
//                    //vm.Regularizar.validaCDR = true;
//                    //toastr.warning('La sucursal ingresada no existe.', 'Regularizar');
//                }
//            }, function (error) { authenticationService.errorValida(error); })
//        }
//        else {
//            ///Obtener Fondos Mutuos
//            dataService.postData(apiUrl + '/Operacion/ObtenerDatosFondosMutuos', vm.Regularizar.OperacionVendedor).then(function (result)
//            {
//                if (result.statusText == 'OK') {
//                    console.log("Entra a fondos");
//                    console.log(result.data);
//                    vm.FondoMutuoVend = result.data;
//                    dataService.postData(apiUrl + '/Regularizar/ValidarFondoMutuo', vm.FondoMutuoVend).then(function (resultValida)
//                    {
//                        console.log(resultValida);
//                        if (resultValida.statusText == 'OK' && resultValida.data.fondo == 0) {
//                            SetearFondosMutuos();
//                            bootbox.confirm("¿Desea continuar?", function (message)
//                            {
//                                if (message) {
//                                    dataService.postData(apiUrl + '/Regularizar/GuardarFondoMutuo', vm.FondoMutuoVend).then(function (resultFondos)
//                                    {
//                                        if (resultFondos.statusText == 'OK') {
//                                            //toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
//                                            console.log("RETORNO EL GUARDADO");
//                                            //LimpiarRegularizacion();
//                                            //return $state.go('RegularizacionInterna');
//                                            //$state.go("RegularizacionInterna", {}, { reload: true });
//                                        }
//                                    }, function (error) { authenticationService.errorValida(error); });
//                                } else {
//                                    vm.Regularizar.listFondoMutuoAprobacion = [];
//                                }
//                            });
//                        } else {
//                            //toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
//                        }
//                    }, function (errorValida)
//                    {
//                        authenticationService.errorValida(errorValida);
//                    });
//                }
//            }, function (error) { authenticationService.errorValida(error); });
//        }
//    };

//    function RegularizarCompraDeuda()
//    {

//    };

//    $scope.SelectedCountry = null;
//    $scope.SelectedCountry = function (selected)
//    {
//        if (selected) {
//            $scope.SelectedCountry = selected.originalObject;
//        }
//    };

//    $('#txtAutocomplete').keyup(function (e)
//    {
//        clearTimeout($.data(this, 'timer'));
//        console.log(e.keyCode);
//        if (e.keyCode == 13)
//            VerificarGerenteCorreoInicial(false);
//        else
//            $(this).data('timer', setTimeout(VerificarGerenteCorreoInicial(true), 500));
//    });

//    $('#txtCorreoGerenteA').keyup(function (e)
//    {
//        clearTimeout($.data(this, 'timer'));
//        console.log(e.keyCode);
//        if (e.keyCode == 13)
//            VerificarGerenteCorreoInicial(false);
//        else
//            $(this).data('timer', setTimeout(VerificarGerenteCorreoInicial(true), 500));
//    });

//    $('#txtCorreoGerenteB').keyup(function (e)
//    {
//        clearTimeout($.data(this, 'timer'));
//        console.log(e.keyCode);
//        if (e.keyCode == 13)
//            VerificarGerenteCorreoFinal(false);
//        else
//            $(this).data('timer', setTimeout(VerificarGerenteCorreoFinal(true), 500));
//    });

//    $('#txtCorreoFuncionario').keyup(function (e)
//    {
//        clearTimeout($.data(this, 'timer'));
//        console.log(e.keyCode);
//        if (e.keyCode == 13)
//            VerificarCorreoCopia(false);
//        else
//            $(this).data('timer', setTimeout(VerificarCorreoCopia(true), 500));
//    });
//});















//(function () {
//    'use strict';

//    angular.module('appReferidos').controller("regularizacionController", regularizacionController);

//    regularizacionController.$inject = ['dataService', 'configService', '$state', 'localStorageService', 'toastr', 'authenticationService', '$scope']
//    function regularizacionController(dataService, configService, $state, localStorageService, toastr, authenticationService, $scope) {
//        var apiUrl = configService.getApiUrl();
//        var vm = this;
//        vm.Regularizar = {
//            nTipo: '',
//            tablaTipoSeleccionado: null,
//            totalReg: 0,
//            totalCount: 0,
//            maxSize: 1,
//            numPages: 1,
//            label1: 'Modificar CDR',
//            vendedor: null,
//            sucursal: null,
//            observacion: '',
//            label2: 'Modificar FDN',
//            correoGerenteA: '',
//            correoGerenteB: '',
//            correoFuncionario: '',
//            requiereAprobGenA: false,
//            requiereAprobGenB: false,
//            validaFDN: false,
//            campoFDN: false,
//            validaCDR: false,
//            validaCorreoFDN: false,
//            validaCorreoCDR: false,
//            colocacionVendedor: [],
//            listColocacionAprobacion: [],
//            listFondoMutuoAprobacion: [],
//            moduloConsulta: null,
//            cuentaConsulta: null,
//            operacionConsulta: null,
//            subOperacionConsulta: null,
//            tipoConsulta: null,
//            paginaActual: 1,
//            cantidadRegistros: '10',
//            correoGerenteBtest: "",
//            modulo : null
//        }

//        vm.desahabilitado = true;
//        vm.desahabilitadoA = false;
//        vm.desahabilitadoB = false;
//        vm.desahabilitadoCDR = true;
//        vm.desahabilitadoFDN = true;
//        vm.habilitadoCorreoGerenteA = true;
//        vm.habilitadoCorreoGerenteB = true;
//        vm.mostrarErrorSucursal = false;
//        vm.verificaEstado = false;

//        vm.BuscarOperaciones = BuscarOperaciones;
//        vm.LimpiarBusqueda = LimpiarBusqueda;
//        vm.SolicitarRegularizacion = SolicitarRegularizacion;
//        vm.ModuloSeleccionado = ModuloSeleccionado;
//        vm.habilitarCDR = habilitarCDR;
//        vm.habilitarFDN = habilitarFDN;
//        vm.LimpiarRegularizacion = LimpiarRegularizacion;
//        vm.Seleccionar = Seleccionar;
//        vm.PageChaged = PageChaged;
//        vm.resetAll = resetAll;

//        vm.guardarModulo = guardarModulo;

//        vm.colocacionVendedor;
//        vm.OperacionVendedor;
//        vm.ModuloList;
//        vm.sucursalList;
//        vm.Colocaciones = {};
//        vm.GerenteA = [];
//        vm.GerenteB = [];
//        vm.Funcionario = [];
//        vm.ColocacionVend;
//        vm.FondoMutuoVend;
//        vm.ModuloTipo = [];

//        ModuloLoad();
//        //CargarUsuarioLogueado();

//        function CargarUsuarioLogueado() {
//            var user = localStorageService.get('usuarioToken');
//            if (user.token != null) {
//                vm.Regularizar.correoFuncionario = "";//user.correo;
//            }
//        };

//        function ModuloLoad() {
//            dataService.getData(apiUrl + '/TablaTipo/ObtenerTipoModulo').then(function (result)
//            {
//                console.log(result);
//                vm.ModuloList = result.data;
//            }, function (error) { authenticationService.errorValida(error); })
//        };

//        function ModuloSeleccionado(valor)
//        {
//            console.log("eNTRA");
//            console.log(valor);
//            if (valor == undefined) {
//                vm.Regularizar.nModulo = null;
//                vm.Regularizar.moduloConsulta = null;
//                vm.Regularizar.tipoConsulta = null;
//            } else {
//                var seleccionado = [];
//                seleccionado.push(valor);
//                vm.Regularizar.nModulo = JSON.parse(seleccionado[0]).Valor;
//                vm.Regularizar.moduloConsulta = JSON.parse(seleccionado[0]).Valor;
//                vm.Regularizar.tipoConsulta = JSON.parse(seleccionado[0]).Tipo;
//                console.log(vm.Regularizar);
//                if (vm.Regularizar.tipoConsulta === 1) {
//                    vm.Regularizar.totalCount = 0;
//                    vm.Colocaciones = {};
//                } else if (vm.Regularizar.tipoConsulta === 2) {
//                    vm.Regularizar.totalCount = 0;
//                    vm.Colocaciones = {};
//                } else if (vm.Regularizar.tipoConsulta === 3) {
//                    vm.Regularizar.totalCount = 0;
//                    vm.Colocaciones = {};
//                }
//            }
//        };

//        function guardarModulo()
//        {
//            vm.ModuloTipo.CodigoModulo = 5;
//            vm.ModuloTipo.NombreModulo = "PROD 3";
//            vm.ModuloTipo.Valor = "3";
//            vm.ModuloTipo.Tipo = 5;
//            console.log(vm.ModuloTipo);
//            dataService.postData(apiUrl + '/TablaTipo/GuardarModulo', vm.ModuloTipo).then(function (resultCant)
//            {
//                if (resultCant.statusText == 'OK') {
//                    toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
//                    console.log("RETORNO EL GUARDADO");
//                    //LimpiarRegularizacion();
//                    $state.go("RegularizacionInterna", {}, { reload: true });
//                }
//            }, function (error)
//            {
//                authenticationService.errorValida(error);
//            });
//        }

//        function validaCamposSeteo() {

//            if (vm.Regularizar.moduloConsulta === "" || vm.Regularizar.moduloConsulta === null) vm.Regularizar.moduloConsulta = "";
//            if (vm.Regularizar.cuentaConsulta === "" || vm.Regularizar.cuentaConsulta === null) vm.Regularizar.cuentaConsulta = "";
//            if (vm.Regularizar.operacionConsulta === "" || vm.Regularizar.operacionConsulta === null) vm.Regularizar.operacionConsulta = "";
//            if (vm.Regularizar.subOperacionConsulta === "" || vm.Regularizar.subOperacionConsulta === null) vm.Regularizar.subOperacionConsulta = "";
//        }

//        function PageChaged() {
//            console.log("consulta");
//            BuscarOperaciones();
//        };

//        function SetPrevpage() {

//        };

//        function SetNextpage() {

//        };

//        function habilitarCDR() {
//            if (vm.desahabilitadoA) {
//                console.log("entro 1");
//                vm.desahabilitadoA = false;
//                if (vm.desahabilitadoB) {
//                    console.log("entro 1.1");
//                    vm.habilitadoCorreoGerenteA = false;
//                    vm.habilitadoCorreoGerenteB = true;
//                    vm.Regularizar.validaCorreoFDN = false;
//                    vm.verificaEstado = false;
//                } else {
//                    console.log("entro 1.2");
//                    vm.habilitadoCorreoGerenteA = true;
//                    vm.habilitadoCorreoGerenteB = true;
//                    vm.Regularizar.validaCorreoCDR = false;
//                    vm.Regularizar.validaCorreoFDN = false;
//                    vm.verificaEstado = false;
//                }
//                vm.desahabilitadoCDR = true;
//                vm.Regularizar.validaCDR = false;
//                $scope.validaCDR = false;
//            } else {
//                console.log("entro 2");
//                if (vm.desahabilitadoB) {
//                    console.log("entro 2.1");
//                    vm.Regularizar.sucursal = "";
//                } else {
//                    console.log("entro 2.2");
//                    vm.habilitadoCorreoGerenteA = false;
//                    vm.Regularizar.validaCorreoCDR = true;
//                }
//                vm.desahabilitadoA = true;
//                vm.desahabilitadoCDR = false;
//                vm.Regularizar.validaCDR = true;
//                $scope.validaCDR = true;
//            }
//        };

//        function habilitarFDN() {
//            console.log(vm.desahabilitadoB);
//            if (vm.desahabilitadoB) {
//                console.log("entro 1");
//                console.log(vm.Regularizar.validaFDN);
//                if (vm.Regularizar.validaCorreoCDR) {
//                    console.log("entro 1.1");
//                    vm.Regularizar.validaCorreoCDR = true;
//                    vm.habilitadoCorreoGerenteA = false;
//                } else {
//                    console.log("entro 1.2");
//                    vm.desahabilitadoB = false;
//                    vm.desahabilitadoFDN = true;
//                    vm.habilitadoCorreoGerenteA = true;
//                    vm.Regularizar.validaCorreoCDR = true;
//                }
//                vm.desahabilitadoB = false;
//                vm.desahabilitadoFDN = true;
//                vm.Regularizar.validaFDN = false;
//                vm.Regularizar.campoFDN = false;
//                $scope.validaFDN = false;
//            } else {
//                console.log("entro 2");
//                console.log(vm.Regularizar.validaFDN);
//                if (vm.Regularizar.validaCorreoCDR) {
//                    console.log("entro 2.1");
//                } else {
//                    console.log("entro 2.2");
//                    vm.habilitadoCorreoGerenteA = false;
//                }
                
//                vm.desahabilitadoB = true;
//                vm.desahabilitadoFDN = false;
//                vm.Regularizar.validaFDN = true;
//                vm.Regularizar.validaCorreoCDR = true;
//                vm.Regularizar.campoFDN = true;
//                $scope.validaFDN = true;
//            }
//        };

//        function Seleccionar(colocacion) {
//            LimpiarRegularizacion();
//            vm.desahabilitado = false;
//            vm.Regularizar.OperacionVendedor = colocacion;
//            console.log(vm.Regularizar.OperacionVendedor);
//        };

//        function resetAll(currentRow) {
//            setearValores();
//            vm.desahabilitado = false;
//            console.log(currentRow);
//            $.each(vm.Colocaciones, function (index, value) {
//                if (value.reg != currentRow.reg) {
//                    value.seleccionado = false;
//                } else {
//                    value.seleccionado = true;
//                    vm.Regularizar.OperacionVendedor = currentRow;
//                }
//            });
//        };

//        function setearValores() {
//            vm.desahabilitado = true;
//            vm.desahabilitadoA = false;
//            vm.desahabilitadoB = false;
//            vm.desahabilitadoCDR = true;
//            vm.desahabilitadoFDN = true;
//            vm.habilitadoCorreoGerenteA = true;
//            vm.habilitadoCorreoGerenteB = true;
//            vm.mostrarErrorSucursal = false;
//            vm.verificaEstado = false;
//            vm.Regularizar.validaCDR = false;
//            vm.Regularizar.validaFDN = false;
//            vm.Regularizar.campoFDN = false;
//        };

//        function LimpiarBusqueda() {
//            vm.Regularizar.nTipo = '';
//            vm.Regularizar.tablaTipoSeleccionado = null;
//            vm.Regularizar.moduloConsulta = null;
//            vm.Regularizar.cuentaConsulta = null;
//            vm.Regularizar.operacionConsulta = null;
//            vm.Regularizar.subOperacionConsulta = null;
//            vm.Regularizar.tipoConsulta = null;
//        };

//        function LimpiarRegularizacion() {
//            vm.colocacionVendedor = [];
//            vm.Regularizar.sucursal = null;
//            vm.Regularizar.vendedor = null;
//            vm.Regularizar.correoGerenteA = '';
//            vm.Regularizar.correoGerenteB = '';
//            //vm.Regularizar.correoFuncionario = '';
//            vm.Regularizar.observacion = '';
//            vm.Regularizar.colocacionVendedor = [];
//            vm.Regularizar.listColocacionAprobacion = [];
//            vm.Regularizar.listFondoMutuoAprobacion = [];
//            vm.desahabilitado = true;
//            vm.desahabilitadoA = false;
//            vm.desahabilitadoB = false;
//            vm.desahabilitadoCDR = true;
//        };

//        function ObtenerUsuarioTemporal(valor) {
//            var email = valor;
//            var usuario = email.substring(0, email.lastIndexOf("@"));
//            return usuario;
//        };

//        function BuscarOperaciones(valid) {
//            console.log($scope.frmConsultar);
//            console.log($scope.frmConsultar.$valid);
//            console.log(valid);
//            validaCamposSeteo();
//            if ($scope.frmConsultar.$valid) {
//                dataService.postData(apiUrl + '/Operacion/DatosCantidad', vm.Regularizar).then(function (resultCant) {
//                    if (resultCant.statusText == 'OK') {
//                        vm.Regularizar.totalCount = resultCant.data;
//                        if (resultCant.data > 0) {
//                            dataService.postData(apiUrl + '/Operacion/Datos', vm.Regularizar).then(function (result) {
//                                if (result.statusText == 'OK') {
//                                    vm.Colocaciones = result.data;
//                                }
//                            }, function (error) { authenticationService.errorValida(error); });
//                        }
//                    }
//                }, function (error) {
//                    authenticationService.errorValida(error);
//                });
//            } else {
//                toastr.warning('Seleccione un modulo.', 'Regularizar');
//            }
//        };

//        function SolicitarRegularizacion(valido) {
//            console.log($scope.frmSolicitud);
//            console.log($scope.frmSolicitud.$valid);
//            console.log(valido);
//            if (vm.desahabilitadoA || vm.desahabilitadoB) {
//                if ($scope.frmSolicitud.$valid) {
//                    if (vm.Regularizar.OperacionVendedor.tipoRegistro === 1) {
//                        RegularizarColocacion();
//                    } else if (vm.Regularizar.OperacionVendedor.tipoRegistro == 2) {
//                        RegularizarFondoMutuo();
//                    } else if (vm.Regularizar.OperacionVendedor.tipoRegistro == 3) {
//                        dataService.postData(apiUrl + '/Operacion/ObtenerDatosCompraDeuda', vm.Regularizar.OperacionVendedor).then(function (result) {
//                            if (result.statusText == 'OK') {
//                                console.log("Entra a compra");
//                                console.log(result.data);
//                            }
//                        }, function (error) { authenticationService.errorValida(error); });
//                    }
//                    else {
//                        toastr.warning('No existe', 'Regularizar');
//                    }
//                } else {
//                    toastr.error('Ingrese los datos requeridos', 'Regularizar');
//                }
//            } else {
//                toastr.error('Seleccion cualquier opción', 'Regularizar');
//            }
//        };

//        function VerificarGerenteCorreoInicial(valor) {
//            var texto = document.getElementById("txtCorreoGerenteA").value;
//            if (valor && texto.length > 1) {
//                if (vm.Regularizar.OperacionVendedor.tipoRegistro === 1) {
//                    var validarCorreo = { sucursal: vm.Regularizar.OperacionVendedor.sucursalVend, correo: vm.Regularizar.correoGerenteA };
//                } else {
//                    var validarCorreo = { sucursal: vm.Regularizar.OperacionVendedor.sucursalVend, correo: vm.Regularizar.correoGerenteA };
//                }
//                $('#txtCorreoGerenteA').autocomplete({
//                    source: function (request, response) {
//                        $.ajax({
//                            url: apiUrl + '/Certifica/ObtenerTrabajador',
//                            data: validarCorreo,
//                            dataType: 'json',
//                            type: 'POST',
//                            success: function (data) {
//                                response($.map(data, function (item) {
//                                    console.log(item);
//                                    return {
//                                        label: item.correo,
//                                        value: item.firma,
//                                        registro: item.registro,
//                                    }
//                                }));
//                            },
//                            error: function (XMLHttpRequest, textStatus, errorThrown) {
//                                console.log('error', textStatus, errorThrown);
//                                console.log(textStatus);
//                            }
//                        })
//                    },
//                    minLength: 1,
//                    select: function (event, ui) {
//                        console.log(ui);
//                        vm.GerenteA.firma = ui.item.value;
//                        vm.GerenteA.codigo = ui.item.registro;
//                        vm.Regularizar.correoGerenteA = ui.item.label;
//                        $('#txtCorreoGerenteA').val(ui.item.label);
//                        console.log(vm.Regularizar.correoGerenteA);
//                        console.log(vm.GerenteA);
//                        return false;
//                    }
//                });
//            } else {

//            }
//        };

//        function VerificarGerenteCorreoFinal(valor) {
//            var consulta = { sucursal: vm.Regularizar.sucursal, correo: vm.Regularizar.correoGerenteB };
//            var texto = document.getElementById("txtCorreoGerenteB").value;
//            console.log(texto.length);
//            if (valor && texto.length > 1) {
//                $('#txtCorreoGerenteB').autocomplete({
//                    source: function (request, response) {
//                        var autocompleteUrl = apiUrl + '/Certifica/ObtenerTrabajadorFiltro/' + consulta.sucursal + '/' + consulta.correo;
//                        $.ajax({
//                            url: apiUrl + '/Certifica/ObtenerTrabajador',
//                            data: consulta,
//                            dataType: 'json',
//                            type: 'POST',
//                            success: function (data) {
//                                response($.map(data, function (item) {
//                                    console.log(item);
//                                    return {
//                                        label: item.correo,
//                                        value: item.firma,
//                                        registro: item.registro,

//                                    }
//                                }));
//                            },
//                            error: function (XMLHttpRequest, textStatus, errorThrown) {
//                                console.log('error', textStatus, errorThrown);
//                                console.log(textStatus);
//                            }
//                        })
//                    },
//                    minLength: 1,
//                    select: function (event, ui) {
//                        console.log(ui);
//                        vm.GerenteB.firma = ui.item.value;
//                        vm.GerenteB.codigo = ui.item.registro;
//                        vm.Regularizar.correoGerenteB = ui.item.label;
//                        $('#txtCorreoGerenteB').val(ui.item.label);
//                        console.log(vm.Regularizar.correoGerenteB);
//                        console.log(vm.GerenteB);
//                        return false;
//                    }
//                });
//            } else {
//                console.log("no entra")
//            }
//        };

//        function VerificarCorreoCopia(valor) {
//            var texto = document.getElementById("txtCorreoFuncionario").value;
//            var consulta = { correo: vm.Regularizar.correoFuncionario };
//            console.log(texto.length);
//            if (valor && texto.length > 1) {
//                $('#txtCorreoFuncionario').autocomplete({
//                    source: function (request, response) {
//                        $.ajax({
//                            url: apiUrl + '/Certifica/ObtenerInfoTrabajador',
//                            data: consulta,
//                            dataType: 'json',
//                            type: 'POST',
//                            success: function (data) {
//                                response($.map(data, function (item) {
//                                    console.log(item);
//                                    return {
//                                        label: item.correo,
//                                        value: item.firma,
//                                        registro: item.registro,

//                                    }
//                                }));
//                            },
//                            error: function (XMLHttpRequest, textStatus, errorThrown) {
//                                console.log('error', textStatus, errorThrown);
//                                console.log(textStatus);
//                            }
//                        })
//                    },
//                    minLength: 1,
//                    select: function (event, ui) {
//                        console.log(ui);
//                        vm.Funcionario.firma = ui.item.value;
//                        vm.Funcionario.codigo = ui.item.registro;
//                        vm.Regularizar.correoFuncionario = ui.item.label;
//                        $('#txtCorreoFuncionario').val(ui.item.label);
//                        console.log(vm.Regularizar.correoFuncionario);
//                        console.log(vm.Funcionario);
//                        return false;
//                    }
//                });
//            }
//        };

//        function ValidaSucursales() {
//            if (vm.desahabilitadoA) {
//                if (vm.Regularizar.OperacionVendedor.sucursalCol === vm.Regularizar.sucursal) {
//                    toastr.warning('Ingrese una sucursal diferente.', 'Regularizar');
//                    return false;
//                } else {
//                    toastr.success('Correcto.', 'Regularizar');
//                    return true;
//                }
//            } else {
//                return true;
//            }
//        }

//        function ValidaFuncionario() {
//            if (vm.desahabilitadoB) {
//                if (vm.Regularizar.OperacionVendedor.codigoVendedorCol === vm.Regularizar.vendedor) {
//                    toastr.warning('Ingrese un vendedor diferente.', 'Regularizar');
//                    return false;
//                } else {
//                    toastr.success('Correcto.', 'Regularizar');
//                    return true;
//                }
//            } else {
//                return true;
//            }
//        };

//        function SetearColocacionVendedor() {
//            console.log(vm.ColocacionVend);

//            vm.ColocacionVend.empresaVendedorNuevo = vm.ColocacionVend.empresaVendedor;
//            vm.ColocacionVend.codigoVendedorNuevo = (vm.Regularizar.vendedor === "" || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === 0) ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : (vm.Regularizar.vendedor == vm.Regularizar.OperacionVendedor.codigoVendedorCol) ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
//            vm.ColocacionVend.agenciaNueva = (vm.desahabilitadoA == false) ? vm.Regularizar.OperacionVendedor.sucursalOpe : (vm.Regularizar.sucursal === "" || vm.Regularizar.sucursal === null || vm.Regularizar.sucursal === 0) ? vm.Regularizar.OperacionVendedor.sucursalOpe : (vm.Regularizar.sucursal == vm.Regularizar.OperacionVendedor.sucursalOpe) ? vm.Regularizar.OperacionVendedor.sucursalOpe : vm.Regularizar.sucursal;
//            vm.ColocacionVend.empresaVendedorAntes = vm.ColocacionVend.empresaVendedor;
//            vm.ColocacionVend.agenciaAntes = vm.Regularizar.OperacionVendedor.sucursalOpe;
//            vm.ColocacionVend.codigoVendedorAntes = vm.Regularizar.OperacionVendedor.codigoVendedorCol;

//            vm.ColocacionVend.observacion = vm.Regularizar.observacion;
//            vm.ColocacionVend.estadoSolicitud = 'P';
//            vm.ColocacionVend.usuarioSolicitante = localStorageService.get('usuarioToken').firmaUsuario;
//            vm.ColocacionVend.tipoReg = vm.Regularizar.OperacionVendedor.tipoRegistro;
//            if (vm.verificaEstado) {/// solo cdr 
//                console.log("Solo sucursal colocacion");
//                vm.ColocacionVend.bReqAproGenA = (vm.desahabilitadoA) ? true : false;
//                vm.ColocacionVend.bReqAproGenB = (vm.verificaEstado) ? true : false;
//                vm.ColocacionVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
//                vm.ColocacionVend.bReqFDN = (vm.desahabilitadoB) ? true : false;
//                if (vm.ColocacionVend.bReqAproGenA && vm.ColocacionVend.bReqAproGenB) {
//                    vm.ColocacionVend.cantAprobacion = 2;
//                } else {
//                    vm.ColocacionVend.cantAprobacion = 1;
//                }

//                if (vm.ColocacionVend.bReqAproGenA) {
//                    vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 1, tipoAprobacionB: 0 });
//                }
//                else {
//                    console.log("No agrega");
//                }

//                if (vm.ColocacionVend.bReqAproGenB) {
//                    if (vm.desahabilitadoB) {
//                        vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                    } else {
//                        if (vm.ColocacionVend.bReqAproGenB) {
//                            vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                        } else {
//                            vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                        }
//                    }
//                } else {
//                    console.log("No agrega");
//                }

//            } else {
//                console.log("Solo ");
//                //vm.ColocacionVend.bReqAproGenA = (vm.desahabilitadoA) ? true : false;
//                vm.ColocacionVend.bReqAproGenA = (vm.desahabilitadoB) ? true : false;
//                vm.ColocacionVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
//                vm.ColocacionVend.bReqFDN = (vm.desahabilitadoB) ? true : false;
//                if (vm.ColocacionVend.bReqAproGenA && vm.ColocacionVend.bReqAproGenB) {
//                    vm.ColocacionVend.cantAprobacion = 2;
//                } else {
//                    vm.ColocacionVend.cantAprobacion = 1;
//                }
//                if (vm.ColocacionVend.bReqAproGenA) {
//                    vm.Regularizar.listColocacionAprobacion.push({ idColocacion: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 1, tipoAprobacionB: 0 });
//                }
//                else {
//                    console.log("No agrega");
//                }
//                /*
//                if (vm.ColocacionVend.bReqAproGenB) {
//                    vm.Regularizar.listColocacionAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB[0].usuarioISYS.firma, codigo: vm.GerenteB[0].usuarioISYS.codigo, usuario: vm.GerenteB[0].usuarioISYS.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                } else {
//                    console.log("No agrega"); Funcionario
//                }*/
//            }
//            vm.ColocacionVend.usuarioSolicitante = localStorageService.get('usuarioToken').firmaUsuario;
//            vm.ColocacionVend.usuario = localStorageService.get('usuarioToken').codigoUsuario;
//            vm.ColocacionVend.listColocacionAprobacion = vm.Regularizar.listColocacionAprobacion;
//            vm.Regularizar.listColocacionAprobacion.push({ idFondoMutuo: 0, firma: vm.Funcionario.firma, codigo: vm.Funcionario.codigo, usuario: vm.Funcionario.firma, correoUsuario: vm.Regularizar.correoFuncionario, aprobacionRequerida: false, tipoAprobacionA: 0, tipoAprobacionB: 0 });
//            console.log(vm.ColocacionVend);
//        };

//        function SetearFondosMutuos() {
//            console.log(vm.FondoMutuoVend);
//            vm.FondoMutuoVend.agenciaNueva = (vm.desahabilitadoA == false) ? vm.Regularizar.OperacionVendedor.sucursalVend : (vm.Regularizar.sucursal === "" || vm.Regularizar.sucursal === null || vm.Regularizar.sucursal === 0) ? vm.Regularizar.OperacionVendedor.sucursalVend : (vm.Regularizar.sucursal == vm.Regularizar.OperacionVendedor.sucursalVend) ? vm.Regularizar.OperacionVendedor.sucursalVend : vm.Regularizar.sucursal;
//            //vm.FondoMutuoVend.funcionarioNuevo = vm.Regularizar.vendedor;
//            vm.FondoMutuoVend.agenciaAntes = vm.Regularizar.OperacionVendedor.sucursalVend;
//            vm.FondoMutuoVend.funcionarioAntes = vm.Regularizar.OperacionVendedor.codigoVendedorCol;
//            vm.FondoMutuoVend.observacion = vm.Regularizar.observacion;
//            vm.FondoMutuoVend.estadoSolicitud = 'P';
//            vm.FondoMutuoVend.tipoReg = vm.Regularizar.OperacionVendedor.tipoRegistro;
//            vm.FondoMutuoVend.usuarioSolicitante = localStorageService.get('usuarioToken').firmaUsuario;
//            /*Inicio valida solicitud*/
//            if (vm.verificaEstado) {/// solo cdr 
//                console.log("Solo sucursal");
//                vm.FondoMutuoVend.bReqAproGenA = (vm.desahabilitadoA) ? true : false;
//                vm.FondoMutuoVend.bReqAproGenB = (vm.verificaEstado) ? true : false;
//                vm.FondoMutuoVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
//                vm.FondoMutuoVend.bReqFDN = (vm.desahabilitadoB) ? true : false;
//                if (vm.FondoMutuoVend.bReqAproGenA && vm.FondoMutuoVend.bReqAproGenB) {
//                    vm.FondoMutuoVend.cantAprobacion = 2;
//                } else {
//                    vm.FondoMutuoVend.cantAprobacion = 1;
//                }

//                if (vm.FondoMutuoVend.bReqAproGenA) {
//                    vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 1, tipoAprobacionB: 0 });
//                }
//                else {
//                    console.log("No agrega");
//                }
//                if (vm.FondoMutuoVend.bReqAproGenB) {
//                    if (vm.desahabilitadoB) {
//                        vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol) ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : (vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
//                        vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                    } else {
//                        if (vm.FondoMutuoVend.bReqAproGenB) {
//                            vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
//                            vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoA, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                        } else {
//                            vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
//                            vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteB.firma, codigo: vm.GerenteB.codigo, usuario: vm.GerenteB.firma, correoUsuario: vm.Regularizar.correoGerenteB, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 0, tipoAprobacionB: 1 });
//                        } 
//                    }
//                } else {
//                    console.log("No agrega");
//                }
//            } else {
//                console.log("Solo ");

//                vm.FondoMutuoVend.bReqAproGenA = (vm.desahabilitadoB) ? true : false;
//                vm.FondoMutuoVend.bReqCDR = (vm.desahabilitadoA) ? true : false;
//                vm.FondoMutuoVend.bReqFDN = (vm.desahabilitadoB) ? true : false;

//                vm.FondoMutuoVend.funcionarioNuevo = (vm.Regularizar.vendedor === vm.Regularizar.OperacionVendedor.codigoVendedorCol || vm.Regularizar.vendedor === null || vm.Regularizar.vendedor === "") ? vm.Regularizar.OperacionVendedor.codigoVendedorCol : vm.Regularizar.vendedor;
//                if (vm.FondoMutuoVend.bReqAproGenA && vm.FondoMutuoVend.bReqAproGenB) {
//                    vm.FondoMutuoVend.cantAprobacion = 2;
//                } else {
//                    vm.FondoMutuoVend.cantAprobacion = 1;
//                }
//                if (vm.FondoMutuoVend.bReqAproGenA) {
//                    vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.GerenteA.firma, codigo: vm.GerenteA.codigo, usuario: vm.GerenteA.firma, correoUsuario: vm.Regularizar.correoGerenteA, aprobacionRequerida: vm.desahabilitadoB, tipoAprobacionA: 1, tipoAprobacionB: 0 });
//                }
//                else {
//                    console.log("No agrega");
//                }
//            }
//            vm.FondoMutuoVend.listFondoMutuoAprobacion = vm.Regularizar.listFondoMutuoAprobacion;
//            vm.Regularizar.listFondoMutuoAprobacion.push({ idFondoMutuo: 0, firma: vm.Funcionario.firma, codigo: vm.Funcionario.codigo, usuario: vm.Funcionario.firma, correoUsuario: vm.Regularizar.correoFuncionario, aprobacionRequerida: false, tipoAprobacionA: 0, tipoAprobacionB: 0 });
//            console.log(vm.FondoMutuoVend);
//        };

//        function SetearCompraDeuda() {

//        };

//        $('#idSucursal').keyup(function (e) {
//            if (e.keyCode == 13)
//                Buscar(true);
//            else
//                Buscar(true);
//        });

//        function Buscar(force) {
//            var sucursal = $("#idSucursal").val();
//            if (sucursal.length > 0) {
//                if (vm.Regularizar.OperacionVendedor.tipoRegistro == 1) {
//                    if (vm.Regularizar.OperacionVendedor.sucursalOpe != sucursal) {
//                        vm.habilitadoCorreoGerenteB = false;
//                        vm.Regularizar.validaCDR = false;
//                        vm.Regularizar.validaCorreoFDN = true;
//                        vm.verificaEstado = true;
//                    } else {
//                        vm.Regularizar.validaCDR = true;
//                        vm.habilitadoCorreoGerenteB = true;
//                        vm.verificaEstado = false;
//                        toastr.warning('Ingrese una sucursal diferente.', 'Regularizar');
//                    }
//                } else {
//                    if (vm.Regularizar.OperacionVendedor.sucursalVend != sucursal) {
//                        vm.habilitadoCorreoGerenteB = false;
//                        vm.Regularizar.validaCDR = false;
//                        if (vm.desahabilitadoA) {
//                            vm.Regularizar.validaCorreoFDN = true;
//                        } else if (vm.desahabilitadoA) {

//                        } else {
//                            vm.Regularizar.validaCorreoFDN = false;
//                        }
//                        vm.verificaEstado = true;
//                    } else {
//                        vm.Regularizar.validaCDR = true;
//                        vm.habilitadoCorreoGerenteB = true;
//                        vm.verificaEstado = false;
//                        toastr.warning('Ingrese una sucursal diferente.', 'Regularizar');
//                    }
//                }
//            } else {
//                vm.Regularizar.validaCDR = true;
//                vm.habilitadoCorreoGerenteB = true;
//                vm.verificaEstado = false;
//                toastr.error('Ingrese una sucursal.', 'Regularizar');
//            }
//        };

//        $('#idVendedor').keyup(function (e) {
//            if (e.keyCode == 13)
//                BuscarVendedorKeyup(true);
//            else
//                //$(this).data('timer', setTimeout(BuscarVendedorKeyup, 500));
//                BuscarVendedorKeyup(true);
//        });

//        function BuscarVendedorKeyup(force) {
//            var vendedor = $("#idVendedor").val();
//            if (vendedor.length > 0) {
//                if (vm.Regularizar.OperacionVendedor.codigoVendedorCol != vendedor) {
//                    vm.Regularizar.validaFDN = false;
//                    vm.Regularizar.campoFDN = false;
//                    console.log(vm.Regularizar.campoFDN);
//                } else {
//                    vm.Regularizar.validaFDN = true;
//                    vm.Regularizar.campoFDN = true;
//                    console.log(vm.Regularizar.campoFDN);
//                    toastr.warning('Ingrese un vendedor diferente.', 'Regularizar');
//                }
//            } else {
//                vm.Regularizar.validaFDN = true;
//                vm.Regularizar.campoFDN = true;
//                console.log(vm.Regularizar.campoFDN);
//                toastr.error('Ingrese un vendedor.', 'Regularizar');
//            }
//        };

//        $('#idVendedor').blur(function (e) {
//            if (e.keyCode == 13)
//                BuscarVendedorKeyup(true);
//            else {
//                BuscarVendedorKeyup(true);
//            }
//        });

//        function RegularizarColocacion() {

//            var filtrarSucursal = (vm.Regularizar.sucursal == null) ? false : true;
//            if (filtrarSucursal) {
//                dataService.getData(apiUrl + '/Operacion/ObtenerSucursal/' + vm.Regularizar.sucursal).then(function (resultSucursal) {
//                    vm.sucursalList = resultSucursal.data.list;
//                    if (vm.sucursalList.length > 0) {
//                        dataService.postData(apiUrl + '/Operacion/ObtenerDatosColocacion', vm.Regularizar.OperacionVendedor).then(function (result) {
//                            if (result.statusText == 'OK') {
//                                console.log("Entra a colocacion");
//                                console.log(result.data);
//                                vm.ColocacionVend = result.data;
//                                dataService.postData(apiUrl + '/Regularizar/ValidarColocacion', vm.ColocacionVend).then(function (resultValida) {
//                                    console.log(resultValida.data.colocacion);
//                                    if (resultValida.statusText == 'OK' && resultValida.data.colocacion == 0) {
//                                        SetearColocacionVendedor();
//                                        bootbox.confirm("¿Desea continuar?", function (message) {
//                                            if (message) {
//                                                dataService.postData(apiUrl + '/Regularizar/GuardarColocacion', vm.ColocacionVend).then(function (result) {
//                                                    if (result.statusText == 'OK') {
//                                                        toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
//                                                        console.log("RETORNO EL GUARDADO");
//                                                        //LimpiarRegularizacion();
//                                                        $state.go("RegularizacionInterna", {}, { reload: true });
//                                                    }
//                                                }, function (error) { authenticationService.errorValida(error); });
//                                            }
//                                            else {
//                                                vm.Regularizar.listColocacionAprobacion = [];
//                                            }
//                                        });
//                                    } else {
//                                        toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
//                                    }
//                                }, function (errorValida) { authenticationService.errorValida(errorValida); });
//                            }
//                        }, function (error) { authenticationService.errorValida(error); });
//                    } else {
//                        toastr.warning('La sucursal ingresada no existe.', 'Regularizar');
//                    }
//                }, function (errorSucursal) { authenticationService.errorValida(errorSucursal); });
//            } else {
//                dataService.postData(apiUrl + '/Operacion/ObtenerDatosColocacion', vm.Regularizar.OperacionVendedor).then(function (result) {
//                    if (result.statusText == 'OK') {
//                        console.log("Entra a colocacion");
//                        console.log(result.data);
//                        vm.ColocacionVend = result.data;
//                        dataService.postData(apiUrl + '/Regularizar/ValidarColocacion', vm.ColocacionVend).then(function (resultValida) {
//                            if (resultValida.statusText == 'OK' && resultValida.data.colocacion == 0) {
//                                SetearColocacionVendedor();
//                                bootbox.confirm("¿Desea continuar?", function (message) {
//                                    if (message) {
//                                        dataService.postData(apiUrl + '/Regularizar/GuardarColocacion', vm.ColocacionVend).then(function (result) {
//                                            if (result.statusText == 'OK') {
//                                                toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
//                                                console.log("RETORNO EL GUARDADO");
//                                                //LimpiarRegularizacion();
//                                                $state.go("RegularizacionInterna", {}, { reload: true });
//                                            }
//                                        }, function (error) { authenticationService.errorValida(error); });
//                                    } else {
//                                        vm.Regularizar.listColocacionAprobacion = [];
//                                    }
//                                });
//                            } else {
//                                toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
//                            }
//                        }, function (errorValida) { authenticationService.errorValida(errorValida); });
//                    }
//                }, function (error) { authenticationService.errorValida(error); });
//            }
//        };

//        function RegularizarFondoMutuo() {
//            var filtrarSucursal = (vm.Regularizar.sucursal == null) ? false : true;
//            if (filtrarSucursal) {
//                ///verificamos si la sucursal existe
//                dataService.getData(apiUrl + '/Operacion/ObtenerSucursal/' + vm.Regularizar.sucursal).then(function (result) {
//                    vm.sucursalList = result.data.list;
//                    if (vm.sucursalList.length > 0) {
//                        ///Obtener Fondos Mutuos
//                        dataService.postData(apiUrl + '/Operacion/ObtenerDatosFondosMutuos', vm.Regularizar.OperacionVendedor).then(function (result) {
//                            if (result.statusText == 'OK') {
//                                console.log("Entra a fondos");
//                                console.log(result.data);
//                                vm.FondoMutuoVend = result.data;
//                                dataService.postData(apiUrl + '/Regularizar/ValidarFondoMutuo', vm.FondoMutuoVend).then(function (resultValida) {
//                                    console.log(resultValida);
//                                    if (resultValida.statusText == 'OK' && resultValida.data.fondo == 0) {
//                                        SetearFondosMutuos();
//                                        bootbox.confirm("¿Desea continuar?", function (message) {
//                                            if (message) {
//                                                dataService.postData(apiUrl + '/Regularizar/GuardarFondoMutuo', vm.FondoMutuoVend).then(function (resultFondos) {
//                                                    if (resultFondos.statusText == 'OK') {
//                                                        toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
//                                                        console.log("RETORNO EL GUARDADO");
//                                                        //LimpiarRegularizacion();
//                                                        //$state.go('RegularizacionInterna');
//                                                        $state.go("RegularizacionInterna", {}, { reload: true });
//                                                    }
//                                                }, function (errorFondo) { authenticationService.errorValida(errorFondo); });
//                                            } else {
//                                                vm.Regularizar.listFondoMutuoAprobacion = [];
//                                            }
//                                        });
//                                    } else {
//                                        toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
//                                    }
//                                }, function (errorValida) { authenticationService.errorValida(errorValida); });
//                            }
//                        }, function (error) { authenticationService.errorValida(error); });
//                    } else {
//                        //vm.habilitadoCorreoGerenteB = false;
//                        //vm.Regularizar.validaCDR = true;
//                        toastr.warning('La sucursal ingresada no existe.', 'Regularizar');
//                    }
//                }, function (error) { authenticationService.errorValida(error); })
//            }
//            else {
//                ///Obtener Fondos Mutuos
//                dataService.postData(apiUrl + '/Operacion/ObtenerDatosFondosMutuos', vm.Regularizar.OperacionVendedor).then(function (result) {
//                    if (result.statusText == 'OK') {
//                        console.log("Entra a fondos");
//                        console.log(result.data);
//                        vm.FondoMutuoVend = result.data;
//                        dataService.postData(apiUrl + '/Regularizar/ValidarFondoMutuo', vm.FondoMutuoVend).then(function (resultValida) {
//                            console.log(resultValida);
//                            if (resultValida.statusText == 'OK' && resultValida.data.fondo == 0 ) {
//                                SetearFondosMutuos();
//                                bootbox.confirm("¿Desea continuar?", function (message) {
//                                    if (message) {
//                                        dataService.postData(apiUrl + '/Regularizar/GuardarFondoMutuo', vm.FondoMutuoVend).then(function (resultFondos) {
//                                            if (resultFondos.statusText == 'OK') {
//                                                toastr.success('Se grabó correctamente la solicitud de regularización.', 'Regularizar');
//                                                console.log("RETORNO EL GUARDADO");
//                                                //LimpiarRegularizacion();
//                                                //return $state.go('RegularizacionInterna');
//                                                $state.go("RegularizacionInterna", {}, { reload: true });
//                                            }
//                                        }, function (error) { authenticationService.errorValida(error); });
//                                    } else {
//                                        vm.Regularizar.listFondoMutuoAprobacion = [];
//                                    }
//                                });
//                            } else {
//                                toastr.warning('El registro seleccionado se encuentra en estado Pendiente.', 'Regularizar');
//                            }
//                        }, function (errorValida) {
//                            authenticationService.errorValida(errorValida);
//                        });                       
//                    }
//                }, function (error) { authenticationService.errorValida(error); });
//            }
//        };

//        function RegularizarCompraDeuda() {

//        };

//        $scope.SelectedCountry = null;
//        $scope.SelectedCountry = function (selected) {
//            if (selected) {
//                $scope.SelectedCountry = selected.originalObject;
//            }
//        };

//        $('#txtAutocomplete').keyup(function (e) {
//            clearTimeout($.data(this, 'timer'));
//            console.log(e.keyCode);
//            if (e.keyCode == 13)
//                VerificarGerenteCorreoInicial(false);
//            else
//                $(this).data('timer', setTimeout(VerificarGerenteCorreoInicial(true), 500));
//        });

//        $('#txtCorreoGerenteA').keyup(function (e) {
//            clearTimeout($.data(this, 'timer'));
//            console.log(e.keyCode);
//            if (e.keyCode == 13)
//                VerificarGerenteCorreoInicial(false);
//            else
//                $(this).data('timer', setTimeout(VerificarGerenteCorreoInicial(true), 500));
//        });

//        $('#txtCorreoGerenteB').keyup(function (e) {
//            clearTimeout($.data(this, 'timer'));
//            console.log(e.keyCode);
//            if (e.keyCode == 13)
//                VerificarGerenteCorreoFinal(false);
//            else
//                $(this).data('timer', setTimeout(VerificarGerenteCorreoFinal(true), 500));
//        });

//        $('#txtCorreoFuncionario').keyup(function (e) {
//            clearTimeout($.data(this, 'timer'));
//            console.log(e.keyCode);
//            if (e.keyCode == 13)
//                VerificarCorreoCopia(false);
//            else
//                $(this).data('timer', setTimeout(VerificarCorreoCopia(true), 500));
//        });
//    }

//})();