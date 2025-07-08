import { setLogin } from "../controladores/login-controler.js";
import { Router } from "../controladores/router.js";


export function App(){
    setLogin();
    mostrarUsuarioActivo();
    Router();
    
}

function mostrarUsuarioActivo(){
    //Leer datos de usuario activo desde sessionStorage (se guardan en el funcion usuarioExiste)
    let usuarioId = sessionStorage.getItem("usuarioId");
    let usuarioActivo = sessionStorage.getItem("usuarioActivo");
    let usuarioFoto = sessionStorage.getItem("usuarioFoto");
    
    document.querySelector(".usuarioActivo").innerHTML = usuarioActivo;
    document.querySelector(".usuarioActivo").setAttribute("data-idUsuario", usuarioId);
    document.querySelector(".usuarioActivoFoto").setAttribute("src", usuarioFoto );
}