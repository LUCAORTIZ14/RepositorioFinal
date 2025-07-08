import { usuariosServices } from "../../servicios/usuarios-servicios.js";
import { newRegister } from "./new.js";
import { editRegister } from "./new.js";

var dtable;


const htmlUsuarios = 
`<div class="card">
   <div class="card-header">
   
   <h3 class="card-title"> 
       <a class="btn bg-dark btn-sm btnAgregarUsuario" href="#/newUsuario">Agregar Usuario</a>
   </h3>

   </div>

   <!-- /.card-header -->
   <div class="card-body">            
   <table id="usuariosTable" class="table table-bordered table-striped tableUsuario" width="100%">
       <thead>
           <tr>
           <th># </th>
           <th>Apellido</th>
           <th>Nombre</th>
           <th>Correo</th>
           <th>Ciudad</th>
           <th>Acciones</th>
           </tr>
       </thead>
   
   </table>
   </div>
   <!-- /.card-body -->
</div> `; 

export async function Usuarios(){
    let d = document;
    const spinner = document.getElementById("spinner");
    let res='';
    d.querySelector('.contenidoTitulo').innerHTML = 'Usuarios';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Usuarios";
    d.querySelector('.rutaMenu').setAttribute('href',"#/usuarios");
    let cP =d.getElementById('contenidoPrincipal');
    
    //Muestro spinner
    spinner.classList.add ( "d-flex"); 
    res = await usuariosServices.listar();
    res.forEach(element => {
      element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarUsuario'  href='#/editUsuario' data-idUsuario='"+ element.id +"'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarUsuario'href='#/delUsuario' data-idUsuario='"+ element.id +"'><i class='fas fa-trash'></i></a></div>";
      
    });  
     
    cP.innerHTML =  htmlUsuarios;
 
    llenarTabla(res);

  

    let btnAgregar = d.querySelector(".btnAgregarUsuario");
    

    btnAgregar.addEventListener("click", agregar);
   
    //Oculto spinner  
    spinner.classList.replace("d-flex", "d-none");   

}

function enlazarEventos( oSettings){
    let d = document;
    let btnEditar = d.querySelectorAll(".btnEditarUsuario");
    let btnBorrar = d.querySelectorAll(".btnBorrarUsuario");
    for(let i=0 ; i< btnEditar.length ; i++){
        btnEditar[i].addEventListener("click", editar);
        btnBorrar[i].addEventListener("click", borrar);
    } 

}


function agregar(){
    newRegister();

}
function editar(){
   let id = this.getAttribute('data-idUsuario') ;
   editRegister(id);
    
}

async function borrar(){
    let id = this.getAttribute('data-idUsuario') ;
    let borrar=0;
  await Swal.fire({
        title: 'Está seguro que desea eliminar el registro?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `Cancelar`,
  
        focusDeny: true
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
           borrar = 1;
        } else if (result.isDenied) {
           borrar = 0 ;
           Swal.fire('Se canceló la eliminación', '', 'info');
        }
      })
      if (borrar === 1)
            await usuariosServices.borrar(id); 
      window.location.href = "#/usuarios";  
}

function llenarTabla(res){ 
   

  dtable =  new DataTable('#usuariosTable', {
        responsive:true,
        data : res,
        columns: [
            { data: 'id' },    
            { data: 'apellido' },
            { data: 'nombre' },
            { data: 'correo' },
            { data: 'ciudad' },
            { data: 'action', "orderable":false }
            
        ],
        fnDrawCallback: function ( oSettings) {
            enlazarEventos( oSettings); },
        deferRender: true,
        retrive: true,
        processing: true,
        language: {
            sProcessing:     "Procesando...",
            sLengthMenu:     "Mostrar _MENU_ registros",
            sZeroRecords:    "No se encontraron resultados",
            sEmptyTable:     "Ningún dato disponible en esta tabla",
            sInfo:           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            sInfoEmpty:      "Mostrando registros del 0 al 0 de un total de 0",
            sInfoFiltered:   "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix:    "",
            sSearch:         "Buscar:",
            sUrl:            "",
            sInfoThousands:  ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst:    "Primero",
                sLast:     "Último",
                sNext:     "Siguiente",
                sPrevious: "Anterior"
            },
            oAria: {
                sSortAscending:  ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente"
            }
                            
        }                           
    });

} 
  