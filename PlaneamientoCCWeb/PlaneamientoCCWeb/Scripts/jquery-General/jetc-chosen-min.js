function fc_Chosen_etc(c,html) {

    var control = document.getElementById(c);
    control.className = "chosen-etc";
    control.innerHTML = "<div id='dv_" + c + "' >";
    var controldiv = document.getElementById('dv_' + c);

    controldiv.innerHTML = html; 
}

function fc_Chosen_etc_json(c, tx, a) {

    var control = document.getElementById(c);
    control.className = "chosen-etc";
    control.innerHTML = "<div id='dv_" + c + "' >";
    var controldiv = document.getElementById('dv_' + c);

    controldiv.innerHTML = "<input type='hidden' id='hdbusqueda_ul" + c + "' value=''>";
    controldiv.innerHTML += "<input type='text' placeholder='" + tx + "' id='tbbusqueda_ul" + c + "' onclick=javascript:document.getElementById('ul" + c + "').style.display='block' onfocus=javascript:document.getElementById('ul" + c + "').style.display='block'  onblure=javascript:document.getElementById('ul" + c + "').style.display='none'  onkeyup='fc_busqueda_etc(this,event)'>";
    controldiv.innerHTML += "<ul id='ul" + c + "' style='display:none' >";
    var controlul = document.getElementById('ul' + c);
    var len = a.length;

    controlul.innerHTML += "<li onkeypress=fc_seleccion_etc(event,this,'')  onclick=javascript:document.getElementById('ul" + c + "').style.display='none';document.getElementById('tbbusqueda_ul" + c + "').value='" + tx + "';document.getElementById('hdbusqueda_ul" + c + "').value='' id='ul_" + c + "_00' value=''>" + tx + "</li>";

    for (var i = 0; i < len; i++) {
        var value = a[i].valor;
        var display = a[i].descripcion;
        controlul.innerHTML += "<li onkeypress=fc_seleccion_etc(event,this,'" + value + "')  onclick=javascript:document.getElementById('ul" + c + "').style.display='none';document.getElementById('tbbusqueda_ul" + c + "').value='" + display + "';document.getElementById('hdbusqueda_ul" + c + "').value='" + value + "' id='ul_" + c + "_" + value + "' value='" + value + "'>" + display + "</li>";
    }

}

function chosenEtcValue(c) {
    var dato = document.getElementById('hdbusqueda_ul' + c).value;
    if (dato != undefined) {
        return dato;
    } else {
        alert('Error Chosen ETC:555');
        return 0;
    }

}
function fc_seleccion_etc(e, t, v) {
    if (ev.keyCode == 13) {
        var control = t.id.toString().split('_')[1];
        var display = t.innerText;
        document.getElementById('tbbusqueda_ul' + control).value = display;
        document.getElementById('hdbusqueda_ul' + control).value = v
    }
}

function fc_busqueda_etc(e, ev) {
    var cbo = e.id.toString().split('_')[1];
    if (ev.keyCode == 40) {
        var controlul = document.getElementById(cbo);
        var child = controlul.childNodes[0];
        child.focus();
    }
    else if (ev.keyCode == 13) {
        var input = e.value.toUpperCase();
        var List = document.querySelector("#" + cbo);
        document.getElementById('hdbusqueda_' + cbo).value = '';

        for (var p = 0; p <= List.children.length - 1; p++) {
            var datali = List.children[p].innerText.toString().toUpperCase();
            var idli = List.children[p].id;
            if (datali.indexOf(input) >= 0) {
                document.getElementById('tbbusqueda_' + cbo).value = document.getElementById(idli).innerText;
                document.getElementById('hdbusqueda_' + cbo).value = document.getElementById(idli).value;
                document.getElementById(cbo).style.display = 'none';
                return;
            } else {
                document.getElementById(idli).style.display = "none";
            }
        }

    }
    else {

        var attr = document.getElementById(cbo).style.display;
        if (attr != 'block') {
            document.getElementById(cbo).style.display = 'block';
        }
        var input = e.value.toUpperCase();
        var List = document.querySelector("#" + cbo);

        for (var p = 0; p <= List.children.length - 1; p++) {
            var datali = List.children[p].innerText.toString().toUpperCase();
            var idli = List.children[p].id;
            if (datali.indexOf(input) >= 0) {
                document.getElementById(idli).style.display = "block";
            } else {
                document.getElementById(idli).style.display = "none";
            }
        }

    }
}