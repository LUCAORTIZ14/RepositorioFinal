import { productosServices } from "../../servicios/productos-servicios.js";
import { newRegister } from "./new.js";
import { editRegister } from "./new.js";



const htmlProductos = 
`<div class="card">
   <div class="card-header">
   
   <h3 class="card-title"> 
       <a class="btn bg-dark btn-sm btnAgregarProducto" href="#/newProducto">Agregar Producto</a>
   </h3>

   </div>

   <!-- /.card-header -->
   <div class="card-body">            
   <table id="productosTable" class="table table-bordered table-striped tableProducto" width="100%">
       <thead>
           <tr>
           <th># </th>
           <th>Nombre</th>
           <th>Precio</th>
           <th>Categoria</th>
           <th>Acciones</th>
           </tr>
       </thead>
   
   </table>
   </div>
   <!-- /.card-body -->
</div> `; 

export async function Productos(){
    let d = document
    const spinner = document.getElementById("spinner");
    let res='';
    d.querySelector('.contenidoTitulo').innerHTML = 'Productos';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Productos";
    d.querySelector('.rutaMenu').setAttribute('href',"#/productos");
    let cP =d.getElementById('contenidoPrincipal');

    //Muestro spinner
    spinner.classList.add ( "d-flex"); 
    res = await productosServices.listar();
    res.forEach(element => {
      element.categoria = element.categoria.descripcion;  
      element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarProducto'  href='#/editProducto' data-idProducto='"+ element.id +"'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarProducto'href='#/delProducto' data-idProducto='"+ element.id +"'><i class='fas fa-trash'></i></a></div>";
    });  
     
    cP.innerHTML =  htmlProductos;
 
    llenarTabla(res);

    let btnAgregar = d.querySelector(".btnAgregarProducto");
   
    btnAgregar.addEventListener("click", agregar);

    //Oculto spinner  
    spinner.classList.replace("d-flex", "d-none");    
   

}

function enlazarEventos( oSettings){
    let d = document;
    let btnEditar = d.querySelectorAll(".btnEditarProducto");
    let btnBorrar = d.querySelectorAll(".btnBorrarProducto");

    for(let i=0 ; i< btnEditar.length ; i++){
        btnEditar[i].addEventListener("click", editar);
        btnBorrar[i].addEventListener("click", borrar);
    }    

}

function agregar(){
    newRegister();

}
function editar(){
   let id = this.getAttribute('data-idProducto') ;
   editRegister(id);
    
}

async function borrar(){
    let id = this.getAttribute('data-idProducto') ;
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
            await productosServices.borrar(id); 
      window.location.href = "#/productos";  
}

function llenarTabla(res){ 
   

    new DataTable('#productosTable', {
        responsive:true,
        data : res,
        columns: [
            { data: 'id' },    
            { data: 'nombre' },
            { data: 'precio' },
            { data: 'categoria' },
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
  