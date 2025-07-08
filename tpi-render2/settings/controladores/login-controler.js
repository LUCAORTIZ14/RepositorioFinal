var inputEmail=null;
var inputPassword=null;
var frmLogin=null;

import { usuariosServices } from "/servicios/usuarios-servicios.js";


/* document.addEventListener('DOMContentLoaded', () => {
     
    frmLogin = frmLogin = document.getElementById('frmLogin');
    inputEmail = document.getElementById('loginEmail');
  
    inputPassword = document.getElementById('loginPassword');
    
    const btnLogin = document.getElementById('iniciar-sesion');
  
    inputEmail.addEventListener('blur', validarForm);
    inputPassword.addEventListener('blur', validarForm);

    btnLogin.addEventListener('click', usuarioExiste);

    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', logout);

    if (getUsuarioAutenticado()){
        frmLogin.outerHTML= '';
        
    }else{
        document.getElementById("sitio").classList.add('d-none');
    }
   
}) */

export function setLogin (){
    frmLogin = frmLogin = document.getElementById('frmLogin'); 
    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', logout);
    
    if (getUsuarioAutenticado()){
        if (frmLogin)
            frmLogin.outerHTML= '';
        
    }else{
        document.getElementById("sitio").classList.add('d-none');
        
        inputEmail = document.getElementById('loginEmail');
  
        inputPassword = document.getElementById('loginPassword');
        
        const btnLogin = document.getElementById('iniciar-sesion');
    
        inputEmail.addEventListener('blur', validarForm);
        inputPassword.addEventListener('blur', validarForm);

        btnLogin.addEventListener('click', usuarioExiste);

       
    }
   
}

async function usuarioExiste() {

    let existeUsuario;
    let usuarioActivo;
    let usuarioFoto;
    let usuarioId;
    const spinner = document.querySelector('#spinner');

    /* await usuariosServices.listar( )
        .then(respuesta => {
            respuesta.forEach(usuario => {
                
                if (usuario.correo === inputEmail.value && usuario.password === inputPassword.value) {
                    usuarioId = usuario.id;
                    usuarioActivo = usuario.nombre + ' ' + usuario.apellido;
                    usuarioFoto = usuario.avatar;
                    return existeUsuario = true;
                } else {
                    return;
                }
            });
        })
        .catch(error => console.log(error)); */
    await usuariosServices.login(inputEmail.value, inputPassword.value) 
        .then(respuesta =>{
            if (respuesta.accesoOk == true){
                existeUsuario = true
                let cad=  respuesta.token
                localStorage.setItem('token', cad)
                usuarioId = respuesta.usuario.id
                usuarioActivo = respuesta.usuario.nombre + ' ' + respuesta.usuario.apellido
                usuarioFoto = respuesta.usuario.avatar
            }
             
            else{
              existeUsuario = false  
            }   
        })
    if (!existeUsuario) {
        mostrarMensaje('Email o contraseña incorrecto, intenta nuevamente');
    } else {
        //ocultar login
        frmLogin.outerHTML= '';
        document.getElementById("sitio").classList.remove('d-none');
       
        //guardar en sessionStorage
        sessionStorage.setItem('usuarioId', usuarioId);
        sessionStorage.setItem('usuarioActivo', usuarioActivo);
        sessionStorage.setItem('usuarioFoto', usuarioFoto);

        setUsuarioAutenticado(true); 
        window.location.href = "#/home" ;
    }
}




function validarForm(e) {

    return true;
  
}

function mostrarMensaje(msj) {
    alert(msj);
}


function setUsuarioAutenticado(booleano) {

    sessionStorage.setItem('autenticado', booleano);
   

}
function getUsuarioAutenticado() {

    return (sessionStorage.getItem('autenticado') === "true") ;


}

function logout(){
    setUsuarioAutenticado(false);
    window.location.replace("index.html")
}
