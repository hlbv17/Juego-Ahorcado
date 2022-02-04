var dibujo = document.querySelector("#dibujo");
var guion = document.querySelector("#palabra");
var listaIntentos = document.querySelector("#errado");
var pincel = dibujo.getContext("2d");
var pincel2 = guion.getContext("2d");
var pincel3 = listaIntentos.getContext("2d"); 
var input = document.querySelector("#letra");
var btnEnviar = document.querySelector("#btn");
var aviso = document.querySelector("#mensaje");
var btnInicio = document.querySelector("#home");
var menu = document.querySelector("#menu");
var juego = document.querySelector("#contenedor-juego");
var agregar = document.querySelector("#contenedor-agregar");
var btnJugar = document.querySelector("#jugar");
var btnAgregar = document.querySelector("#agregar");

var alerta = document.createElement("span");


var div = document.querySelector("#input-letra");

var palabra = document.querySelector("#input-palabra");
var btnEnviarP = document.querySelector("#enviar");
var btnCancelar = document.querySelector("#cancelar");
var resultado = false;

var palabras = ["ORACLE","ALURA","ONOMATOPEYA"];

pincel2.font ="bold 32px Arial";
pincel3.font ="bold 24px Arial";

var rand;
var random;
var numeroLetras;
var intentos = [];
var contadorAcertados = 0;
var contadorErrados = 0;
var y = 30;
var regex =  /^[A-Za-zñÑ]/;

function validarLetra(e){
    var alertaId = document.querySelector("#mensajeError");
    if(alertaId != null){
        alertaId.remove();
    }
    if(resultado == true){
        e.value = e.value.toUpperCase();
        var entrada = document.querySelector("#letra").value;
        if (entrada.value == "") {
            mensajeError("INGRESE UNA LETRA");
            input.value = ""; 
        }else if (!regex.test(entrada)) {
            mensajeError("INGRESE UNA LETRA");
            input.value = ""; 
        }else if(intentos.includes(entrada) == true){
            mensajeError("ESA LETRA YA FUE INGRESADA");
            input.value = ""; 
        }else{
            verificarLetra();
            input.value = ""; 
        } 
    }else{
        e.preventDefault();
    }
    
}

function validarPalabra(){
    var palabra = document.querySelector("#input-palabra").value.toUpperCase();
    if (palabra.length <6 ){ 
		mensajeError('INGRESE UNA PALABRA');
	}else if (palabra.value == "") {
        mensajeError("INGRESE UNA PALABRA");
    }else if (!regex.test(palabra)) {
        mensajeError("INGRESE SOLO LETRAS");
    }else if(palabras.includes(palabra) == true){
        mensajeError("ESA PALABRA YA FUE INGRESADA");
    }else{
        palabras.push(palabra);
        iniciarJuego();
    }
}

function verificarLetra(){
    var entrada = document.querySelector("#letra").value;
    if(random.includes(entrada)){
        intentos.push(entrada);
        llenarPalabra(entrada);
        if(contadorAcertados == numeroLetras){
            mensaje("GANASTE, FELICIDADES!");
        }
        
    }else{
        intentos.push(entrada);
        llenarIntentos(entrada); 
    }
}

function llenarPalabra(entrada){
    if(contadorAcertados <= numeroLetras){
        var separacion = random.split("");
        var x = 20;
        for(var i=0; i<=separacion.length; i++){
            if(entrada == separacion[i]){
                pincel2.fillText(entrada,x,70);
                contadorAcertados ++;
            }
            x += 40;     
        }
    }  
}

function llenarIntentos(entrada){
    if(contadorErrados < 5){
        pincel3.fillText(entrada,80,y); 
        y += 40;
        ahorcado();
    }
}

function ahorcado(){
    contadorErrados ++;
    switch(contadorErrados){
        case 1:
            horca();
            break;
        case 2:
            cabeza();
            break;
        case 3:
            torso();
            break;   
        case 4:
            brazos();
            break;  
        case 5:
            piernas();
            mensaje("FIN DEL JUEGO");
            break;
    }
}

function base(){
    pincel.beginPath();
    pincel.strokeStyle = "black";
    pincel.lineWidth = "4";
    pincel.moveTo(15,180);
    pincel.lineTo(120,180);
    pincel.stroke();
    pincel.closePath();
}

function horca(){
    pincel.beginPath();
    pincel.strokeStyle = "black";
    pincel.lineWidth = "4";
    pincel.moveTo(65,180);
    pincel.lineTo(65,15);

    pincel.moveTo(63,15);
    pincel.lineTo(180,15);

    pincel.moveTo(180,13);
    pincel.lineTo(180,30);
    pincel.stroke();
    pincel.closePath();
}

function cabeza(){
    pincel.beginPath();
    pincel.arc(180,50,20,0,2*Math.PI);
    pincel.stroke();
    pincel.closePath();
}

function torso(){
    pincel.beginPath();
    pincel.strokeStyle = "black";
    pincel.lineWidth = "4";
    pincel.moveTo(180,70);
    pincel.lineTo(180,120);
    pincel.stroke();
    pincel.closePath();
}

function brazos(){
    pincel.beginPath();
    pincel.moveTo(150,100);
    pincel.lineTo(180,75);
    pincel.lineTo(210,100);
    pincel.stroke();
    pincel.closePath();
}

function piernas(){
    pincel.beginPath();
    pincel.moveTo(160,150);
    pincel.lineTo(180,120);
    pincel.lineTo(200,150);
    pincel.stroke();
    pincel.closePath();
}

function guiones(){
    rand = Math.floor(Math.random() * palabras.length);
    random = palabras[rand];
    numeroLetras = random.length;
    contadorAcertados = 0;
    contadorErrados = 0
    intentos = []
    y = 30;
    var x1=20;
    var x2=45;
    for(var i = 0 ; i<numeroLetras; i++){
        pincel2.beginPath();
        pincel2.lineCap="round";
        pincel2.strokeStyle = "black";
        pincel2.lineWidth = "5";
        pincel2.moveTo(x1,80);
        pincel2.lineTo(x2,80);
        pincel2.stroke();
        pincel2.closePath(); 
        x1+=40;
        x2+=40;
    }   
}

function mensaje(cadena){
    var aviso = document.querySelector("#mensaje");
    var texto = document.querySelector("#mensaje p");
    input.style.display = "none";
    aviso.style.display = "flex";
    texto.textContent = cadena;
    switch (cadena){
        case "GANASTE, FELICIDADES!":
            aviso.style.background = "green";
            break;
        case "FIN DEL JUEGO":
            aviso.style.background = "red";
            break;    
    }
    
}

function mensajeError(cadena){
    div.appendChild(alerta);
    alerta.textContent = cadena;
    alerta.style.color = "red";
    alerta.style.width = "80%";
    alerta.style.textAlign = "center";
    alerta.setAttribute("id", "mensajeError");
}


function inicio(){
    menu.style.display = "flex";
    juego.style.display = "none";
    agregar.style.display = "none";
}

function limpiar(){
    pincel.clearRect(0, 0, dibujo.width, dibujo.height);
    pincel2.clearRect(0, 0, guion.width, guion.height);
    pincel3.clearRect(0, 0, listaIntentos.width, listaIntentos.height);
}

function mostrarContenedorJuego(){
    menu.style.display = "none";
    input.style.display = "flex";
    aviso.style.display = "none";
    agregar.style.display = "none";
    juego.style.display = "flex";
    juego.scrollIntoView();
    input.focus();
}

function mostrarContenedorAgregar(){
    menu.style.display = "none";
    juego.style.display = "none";
    agregar.style.display = "flex";
    agregar.scrollIntoView();
    palabra.focus();
}

function iniciarJuego(){
    limpiar();
    mostrarContenedorJuego();
    rand = Math.floor(Math.random() * palabras.length);
    random = palabras[rand];
    numeroLetras = random.length;
    guiones(numeroLetras);
    base();
    resultado = true;
}

function detenerJuego(){

}

inicio();

btnInicio.onclick = inicio;

btnJugar.onclick = iniciarJuego;

btnAgregar.onclick = mostrarContenedorAgregar;

btnEnviarP.onclick = validarPalabra;

btnCancelar.onclick = inicio;




