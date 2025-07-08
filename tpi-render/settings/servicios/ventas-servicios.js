const url = "http://127.0.0.1:8000/ventas";


async function listar(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl,{
        method: 'GET',
        headers: {
            "accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token') 
        }
    })
    .then(respuesta => respuesta.json());
}

async function crear(idUsuario, emailUsuario, idProducto, nombreProducto, cantidad, fecha, despachado) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuario: idUsuario, 
            emailUsuario: emailUsuario, 
            idProducto: idProducto, 
            nombreProducto: nombreProducto, 
            cantidad: cantidad, 
            fecha: fecha, 
            despachado: despachado
        })
    })
    .then(respuesta => respuesta.json());
}

async function editar(id,  despachado) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            despachado: despachado
        })
    })
    .then(respuesta => respuesta.json());
}

async function listarVentasDespachadas(despachadas) {
    const newUrl= new URL(url + "/");
    newUrl.searchParams.append('despachado', despachadas);
    return await fetch(newUrl)
        .then(respuesta => respuesta.json());
 
}

async function borrar(id){
  
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE'
       })
       .then(respuesta => respuesta.json());
}


export const ventasServices = {
    listar,
    crear,
    editar,
    borrar,
    listarVentasDespachadas
}