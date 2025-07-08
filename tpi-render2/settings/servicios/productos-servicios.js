const url = "http://127.0.0.1:8000/productos";


async function listar(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl,{
        headers: {
            "accept": "application/json",
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token') 
        }
    })
    .then(respuesta => respuesta.json());
}

async function crear(nombre, descripcion, foto, precio, idCategoria, categoria) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            descripcion: descripcion,
            foto: foto,
            precio: precio,
            idCategoria: idCategoria,
            categoria: categoria
        })
    })
    .then(respuesta => respuesta.json());
}

async function editar(id, nombre, descripcion, foto, precio, idCategoria, categoria) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            descripcion: descripcion,
            foto: foto,
            precio: precio,
            idCategoria: idCategoria,
            categoria: categoria
        })
    })
    .then(respuesta => respuesta.json());
}

async function borrar(id){
  
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE'
       })
       .then(respuesta => respuesta.json());
}

async function listarPorCategoria(idCategoria) {
    const newUrl= new URL(url + '/' );
    newUrl.searchParams.append('idCategoria', idCategoria);
    return await fetch(newUrl)
        .then(respuesta => respuesta.json());
 
}
export const productosServices = {
    listar,
    crear,
    editar,
    borrar,
    listarPorCategoria
}