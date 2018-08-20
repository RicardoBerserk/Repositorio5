var _Title = 'Scotiabank';
var _Rpt = false;
var _ImgError = '../JsQuery/images/error.gif';
var _ImgOK = '../JsQuery/images/correcto.gif';
var _ImgWarning = '../Content/images/warning.gif';
var _ImgQuestion = '../JsQuery/images/question.gif';
var _DirVirtual = '/WebPIC/';
function fc_MessageBox(msg, tipo) {
    switch (tipo) {
        case 'ok': fc_MessageInfo(msg, _ImgOK);
            break;
        case 'er': fc_MessageInfo(msg, _ImgError);
            break;
        case 'wr': fc_MessageInfo(msg, _ImgWarning);
            break;
        case 'qt': fc_MessageConfirm(msg, _ImgQuestion);
            break;
    }
}

function fc_MessageInfo(Message, Image) {
    if (Image == null) { Image = '../JsQuery/images/question.gif'; }

    $("body").append("<div id='divMessageInfoA' title='" + _Title + "' style='padding: 5px;'></div>");
    $("#divMessageInfoA").html('<br /><table style="width:280px"><tr><td style="width:35px"><img src="' + Image + '" alt=""></td><td aling="left" style="width:245px">' + Message + '</td></tr></table>');
    $("#divMessageInfoA").dialog({
        modal: true,
        resizable: false,
        beforeclose: function (event, ui) {
            $("#divMessageInfoA").remove();
        },
        buttons: {
            "Aceptar": function () {
                $("#divMessageInfoA").remove();
            }
        }
    });
};

function fc_MessageConfirm(Message, Image) {
    if (Image == null) { Image = '../JsQuery/images/correcto.gif'; }
    $("body").append("<div id='divMessageConfirm' title='" + _Title + "'></div>");
    $("#divMessageConfirm").html('<br /><table style="width:280px"><tr><td style="width:35px"><img src="' + Image + '" alt=""></td><td aling="left" style="width:245px"><strong>' + Message + '</strong></td></tr></table>');
    $("#divMessageConfirm").dialog({
        modal: true
   , resizable: false
   , open: function () {
       $(this).parent().find('button:nth-child(2)').focus();
   }
   , beforeclose: function (event, ui) {
       $("#divMessageConfirm").remove();

   }, buttons: {
       "Si": function () {
           _Rpt = true;
           fcConfirmado();
           $("#divMessageConfirm").remove();
       },
       "No": function () {
           _Rpt = false;
           $("#divMessageConfirm").remove();
       }
   }
    });
};


function fcCargando(e) {
    if (e == true) {
        var Image = "<img src='../Content/images/progress.gif' style='float:left' />";
        var Message = "Cargando....";
        $(".ui-dialog-titlebar").css("display", "none");
        $("#dialog-cargando").html('<br /><table style="width:auto"><tr><td style="width:35px">' + Image + '</td><td aling="left" style="width:120px"><strong>' + Message + '</strong></td></tr></table>');
        $("#dialog-cargando").css("height", "79px !important");
        $("#dialog-cargando").dialog({
            modal: true,
            resizable: true,
            overflow: false,
            width: "auto",
            height: 83
        });
    } else {
        $("#dialog-cargando").dialog("close");
    }
}
function fcAbrilModal(e, evt) {
    var alto = $("html").height();
    var ancho = $("html").width();
    var mitad = parseInt(ancho) / 2;
    var anchotabla = $(evt + "> table").width();
    var mitadtabla = parseInt(anchotabla) / 2;
    var mitadleft = parseInt(mitad) / 2;
    if (e == true) {
        $(evt).css({
            "position": "absolute", "width": "100%", "height": alto + "px", "top": "0px", "left": "0px",
            "background": "rgba(0, 0, 0,0.5)", "text-align": "center", "display": "block", "min-height": "760px"
        });
        $(evt + "> table").css({
            "position": "relative", "left": mitad + "px", "margin-left": -mitadtabla + "px"
        });
    } else { $(evt).css("display", "none"); }
}
function fcMaximizar(o) {
    if (o == 1) {
        $(".dv-contenedor").removeClass("dv-contraer");
        $(".dv-contenedor").addClass("dv-expandir");
        $(".dv-opt-max").css("display", "none");
        $(".dv-opt-min").css("display", "block");
    } else if (o == 0) {
        $(".dv-contenedor").removeClass("dv-expandir");
        $(".dv-contenedor").addClass("dv-contraer");
        $(".dv-opt-min").css("display", "none");
        $(".dv-opt-max").css("display", "block");
    }
}
function fcMaximizarSelect(o, e, b, v) {

    if (o == 1) {
        $("." + e).removeClass("dv-contraer");
        $("." + e).addClass("dv-expandir");
        $("." + b).css("display", "none");
        $("." + v).css("display", "block");
    } else if (o == 0) {
        $("." + e).removeClass("dv-expandir");
        $("." + e).addClass("dv-contraer");
        $("." + v).css("display", "none");
        $("." + b).css("display", "block");
    }
}
function fcMaximizarGeneral(o, nc, nb) {

    if (o == 1) {
        $(".c" + nc).removeClass("dv-contraer");
        $(".c" + nc).addClass("dv-expandir");
        $(".max" + nb).css("display", "none");
        $(".min" + nb).css("display", "block");
    } else if (o == 0) {
        $(".c" + nc).removeClass("dv-expandir");
        $(".c" + nc).addClass("dv-contraer");
        $(".min" + nb).css("display", "none");
        $(".max" + nb).css("display", "block");
    }
}
function fc_FormatoFecha(evt, ini) {
    $(evt).css("width", "80px");
    $(evt).datepicker({
        showOn: "button",
        buttonImage: "../Content/images/icono_calendario.gif",
        buttonImageOnly: true,
        buttonText: "Seleccione Fecha",
        dateFormat: "dd/mm/yy"
    });

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + d.getFullYear();

    if (ini == 1) {
        $(evt).val(output);
    }

}

var DatePicker_Opciones_Default = { fl_changeMonth: !1, fl_changeYear: !1, minDate: "", maxDate: "", fl_enabled_textbox: !0 };
function fc_FormatoCalendarFecha(e, t, r, o) {

    e.indexOf("#") < 0 && (e = "#" + e), $.datepicker.regional.es = {
        closeText: "Cerrar",
        prevText: "Previo",
        nextText: "Próximo",
        currentText: "Hoy",
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        monthStatus: "Ver otro mes",
        yearStatus: "Ver otro año",
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        initStatus: "Selecciona la fecha",
        isRTL: !1
    }, $.datepicker.setDefaults($.datepicker.regional.es);
    var a = e;
    $(a).width(80), $(a).attr("maxlength", "10"), 0 == DatePicker_Opciones_Default.fl_enabled_textbox && $(a).prop("disabled", !0), $(a).datepicker({
        showButtonPanel: !0,
        dateFormat: "dd/mm/yy",
        showOn: "button",
        buttonImage: getAbsolutePath() + "Content/images/icono_calendario.gif",
        buttonImageOnly: true,
        buttonText: "Click para mostrar el Calendario",
        changeMonth: t.fl_changeMonth,
        changeYear: t.fl_changeYear,
        minDate: t.minDate,
        maxDate: t.maxDate,
        changeMonth: true,
        numberOfMonths: 2,
        onClose: function (e) {
            "" != r && null != r && void 0 != r && $("#" + o).datepicker("option", "MIN" == r ? "minDate" : "maxDate", e)
        }
    })
}

function fc_FormatoCalendarFecha_Por_Meses(e, t, r, o) {
    e.indexOf("#") < 0 && (e = "#" + e), $.datepicker.regional.es = {
        closeText: "Cerrar",
        prevText: "Previo",
        nextText: "Próximo",
        currentText: "Hoy",
        monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        monthStatus: "Ver otro mes",
        yearStatus: "Ver otro año",
        dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"],
        dayNamesMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        dateFormat: "dd/mm/yy",
        firstDay: 0,
        initStatus: "Selecciona la fecha",
        isRTL: !1
    }, $.datepicker.setDefaults($.datepicker.regional.es);
    var a = e;
    $(a).width(80), $(a).attr("maxlength", "10"), 0 == DatePicker_Opciones_Default.fl_enabled_textbox && $(a).prop("disabled", !0), $(a).datepicker({
        showButtonPanel: !0,
        dateFormat: "dd/mm/yy",
        showOn: "button",
        buttonImage: getAbsolutePath() + "Content/images/icono_calendario.gif",
        buttonImageOnly: true,
        buttonText: "Click para mostrar el Calendario",
        changeMonth: t.fl_changeMonth,
        changeYear: t.fl_changeYear,
        minDate: t.minDate,
        maxDate: t.maxDate,
        changeMonth: true,
        numberOfMonths: 2,
        onClose: function (e) {
            "" != r && null != r && void 0 != r && $("#" + o).datepicker("option", "MIN" == r ? "minDate" : "maxDate", e)
        }
    })
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function fc_Solonumeros(evt) {
    if (event.which != 13) {

        if (event.shiftKey) {
            event.preventDefault();
        }

        if (event.keyCode == 46 || event.keyCode == 8) {
        }
        else {
            if (event.keyCode < 95) {
                if (event.keyCode < 48 || event.keyCode > 57) {
                    event.preventDefault();
                }
            }
            else {
                if (event.keyCode < 96 || event.keyCode > 105) {
                    event.preventDefault();
                }
            }
        }

    }
}

function fc_Solodecimales(event) {
    if (event.which != 13) {

        if (event.shiftKey) {
            event.preventDefault();
        }

        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) {
        }
        else {
            if (event.keyCode < 95) {
                if (event.keyCode < 48 || event.keyCode > 57) {
                    event.preventDefault();
                }
            }
            else {
                if (event.keyCode < 96 || event.keyCode > 105) {
                    event.preventDefault();
                }
            }
        }

    }
}
function fc_CerrarModal_Form(m) {
    if (m.indexOf("#") >= 0) {
        $(m).dialog("close");
    } else {
        $("#" + m).dialog("close");
    }
}
function fc_AbrirModal_Form(m, c, o, w, a, v) {
    $(".ui-dialog-titlebar").css("display", "block");
    $("#" + m).css('zIndex', 9999);
    $("#" + m).dialog({
        resizable: false,
        height: a,
        width: w,
        modal: true,
        buttons: {
            Aceptar: function () {
                try {
                    if (o == "g") {
                        angular.element($("#" + c)).scope().Guardar();
                    } else if (o == "a") {
                        angular.element($("#" + c)).scope().Actualizar();
                    } else if (o == "m") {
                        angular.element($("#" + c)).scope().Masivo();
                    }
                } catch (e) {
                    alert(e.message);
                }
                if (v != "open") {
                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
                angular.element($("#" + c)).scope().Cancelar();
            }
        }

    });
    try {
        angular.element($("#" + c)).scope().Permisos();
    }
    catch (e) { }
}

function fc_AbrirModal_FormAsignacion(m, c, o, w, a, v) {
    $(".ui-dialog-titlebar").css("display", "block");
    $("#" + m).css('zIndex', 9999);
    $("#" + m).dialog({
        resizable: false,
        height: a,
        width: w,
        modal: true,
        buttons: {
            Distribuir: function () {
                try {
                    angular.element($("#" + c)).scope().Generar();
                } catch (e) {
                    alert(e.message);
                }
            },
            Aceptar: function () {
                try {
                    if (o == "m") {
                        angular.element($("#" + c)).scope().Masivo();
                    }
                } catch (e) {
                    alert(e.message);
                }
                if (v != "open") {
                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
                angular.element($("#" + c)).scope().Cancelar();
            }
        }
    });
    try {
        angular.element($("#" + c)).scope().Permisos();
    }
    catch (e) { }
}

function fc_AbrirModal_FormSimple(m, w, a) {
    $(".ui-dialog-titlebar").css("display", "block");

    $("#" + m).dialog({
        resizable: false,
        height: a,
        width: w,
        modal: true
    });
}
function fc_CallService(strParametros, strUrlServicio, fn_callback) {

    $.ajax({
        type: "POST",
        data: strParametros,
        dataType: 'json',
        url: strUrlServicio,
        contentType: 'application/json; charset=utf-8',
        async: true,
        beforeSend: function () {
            fcCargando(true);
        },
        success: function (data, textStatus) {
            if (textStatus == "success") {
                if (typeof data === "object")
                    fn_callback(data);
                else fn_callback(JSON.parse(data));
            }
            else alert("ERROR SUCCESS: " + JSON.parse(jsondata.responseText).Message);
        },
        complete: function () {
            fcCargando(false);
        },
        error: function (request, textStatus, error) {
            fc_errorAjax(request, textStatus, error);
            fcCargando(false);
        }
    });
}
function fc_errorAjax(request, textStatus, error) {
    if (request.status == 401) {
        alert('Acceso no Autorizado: ' + error);
        location.reload();
    }
    else if (request.status == 0) {
        fc_Alert("Error de conexión con el sistema.\nVerificar red y volver a intentarlo.");
    }
    else {
        var indexIni = request.responseText.indexOf('<title>') + 7
        var indexFin = request.responseText.indexOf('</title>') - indexIni;
        var err = (request.responseText.substr(indexIni, indexFin));
        if (err == '') {
            try {
                err = jQuery.parseJSON(request.responseText).Message;
            } catch (ex) { }
        }
        alert("Error: (" + request.status + "): " + err);
    }
}

function fc_ValidateEmail(Email) {
    re = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
    if (!re.exec(Email)) {
        return false;
    } else {
        return true;
    }
};

function ObtenerFechaActual() {
    var fecha1 = new Date();
    var dia = fecha1.getDate().toString();
    dia = dia.length > 1 ? dia : '0' + dia;
    var mes = (1 + fecha1.getMonth()).toString();
    mes = mes.length > 1 ? mes : '0' + mes;
    var anio = fecha1.getFullYear();
    return dia + "/" + mes + "/" + anio;
}
function ObtenerFechaInicial() {
    var fecha1 = new Date();
    var dia = fecha1.getDate().toString();
    dia = dia.length > 1 ? dia : '0' + dia;
    var mes = (1 + fecha1.getMonth()).toString();
    mes = mes.length > 1 ? mes : '0' + mes;
    var anio = fecha1.getFullYear();
    return '01' + "/" + mes + "/" + anio;
}

function disabledBack() {
    window.location.hash = "no-back-button";
    window.location.hash = "Again-No-back-button"
    window.onhashchange = function () { window.location.hash = ""; }
}