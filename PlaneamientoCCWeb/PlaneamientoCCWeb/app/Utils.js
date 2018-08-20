
var URL = {
    BASE: 'http://localhost:8097/Planeamiento/',
    INICIO: 'http://localhost:8097/'
}


function SoloLetrasInputs(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}

function LimpiaInputsSoloLetras() {
    var val = document.getElementById("miInput").value;
    var tam = val.length;
    for (i = 0; i < tam; i++) {
        if (!isNaN(val[i]))
            document.getElementById("miInput").value = '';
    }
}

function SoloNumerosInputs(e) {
    var key = window.Event ? e.which : e.keyCode
    return ((key >= 48 && key <= 57) || (key == 8))
}



var usuarioLocal = {
    usuario: "master",
    pwd:"notiene"
}

/*Modal carga*/
var progress;
var $bar = $('.bar');

//function modalCargaLlamar(texto) {
//    $('body').removeClass('modal-open');
//    $('.modal-backdrop').remove();
//    document.getElementById('modalCargandoTexto').innerHTML = texto;
//    $bar.css('width', '1%')
//    $bar.text('1%');
//    $('#modalCarga').modal({ backdrop: 'static', keyboard: false });
//}

//$('#modalCarga').on('shown.bs.modal', function () {
//    var i = 0;
//    $bar.css('width', '1%')
//    $bar.text('1%');
//    progress = setInterval(function () {
//        if (i == 100) {
//            clearInterval(progress);
//            $('.progress').removeClass('active');
//            $('#modalCarga').modal('hide');
//        } else {
//            i = i + 1;
//            $bar.css('width', i + '%')
//        }
//        $bar.text(i + "%");
//    }, 1000);

//});

//function modalCargaCerrar() {
//    //clearInterval(progress);
//    $bar.css('width', '100%')
//    $bar.text('100%');
//    $('.progress').removeClass('active');
//    $('#modalCarga').modal('hide');
//    $('body').removeClass('modal-open');
//    $('.modal-backdrop').remove();
//}
/*Modal carga*/

//function ocultarModal(val) {
//    $('#' + val).modal('hide');
//    $('body').removeClass('modal-open');
//    $('.modal-backdrop').remove();
//}

//////////////******** fin ********//////////


function modalCargaLlamarError(texto) {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    document.getElementById('modalCargandoTextoError').innerHTML = texto;
    $bar.css('width', '1%')
    $bar.text('1%');
    $('#modalCargaError').modal({ backdrop: 'static', keyboard: false });
}

$('#modalCargaError').on('shown.bs.modal', function () {
    var i = 0;
    $bar.css('width', '1%')
    $bar.text('1%');
    progress = setInterval(function () {
        if (i == 100) {
            clearInterval(progress);
            $('.progress').removeClass('active');
            $('#modalCargaError').modal('hide');
        } else {
            i = i + 1;
            $bar.css('width', i + '%')
        }
        $bar.text(i + "%");
    }, 1000);

});

function modalCargaCerrar() {
    //clearInterval(progress);
    $bar.css('width', '100%')
    $bar.text('100%');
    $('.progress').removeClass('active');
    $('#modalCargaError').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
}
/*Modal carga*/

function ocultarModal(val) {
    $('#' + val).modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
}



