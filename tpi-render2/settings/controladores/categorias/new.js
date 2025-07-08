import { categoriasServices } from "/servicios/categorias-servicios.js";


const htmlAmCategorias = `
<div class="card card-dark card-outline">

	<form  class="needs-validation frmAmCategoria"  enctype="multipart/form-data">
	
		<div class="card-header">
               
			<div class="col-md-8 offset-md-2">	
               
				<!--=====================================
                Descripcion
                ======================================-->
				
				<div class="form-group mt-5">
					
					<label>Categoría</label>

					<input 
					type="text" 
					class="form-control"
					onchange="validateJS(event,'t&n')"
					name="descripcion"
                    id="categoriaDescripcion"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>

				

			
			</div>
		

		</div>

		<div class="card-footer">
			
			<div class="col-md-8 offset-md-2">
	
				<div class="form-group mt-3">

					<a href="#/categorias" class="btn btn-light border text-left">Cancelar</a>
					
					<button type="submit" class="btn bg-dark float-right">Guardar</button>

				</div>

			</div>

		</div>


	</form>


</div> `;
var formulario='';
var txtDescripcion='';

var idCategoria;

export async function newRegister(){
    let d = document;
    
    d.querySelectorAll('.contenidoTitulo').innerHTML = 'Agregar Categoria';
    d.querySelector('.contenidoTituloSec').innerHTML += 'Agregar';
   
    crearFormulario();

    formulario = d.querySelector(".frmAmCategoria")
    formulario.addEventListener("submit", guardar);
}

export async function editRegister(id){
    let d = document;
    idCategoria = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Categoria';
    d.querySelector('.contenidoTituloSec').innerHTML += 'Editar';
    crearFormulario();

    formulario = d.querySelector(".frmAmCategoria")
    formulario.addEventListener("submit", modificar);
    let categoria =  await categoriasServices.listar(id);

    
    txtDescripcion.value= categoria.descripcion;
   
}

function crearFormulario(){
    let d = document;
    d.querySelector('.rutaMenu').innerHTML = "Categorias";
    d.querySelector('.rutaMenu').setAttribute('href',"#/categorias");

    let cP =d.getElementById('contenidoPrincipal');
    cP.innerHTML =  htmlAmCategorias;
    
    var script = document.createElement( "script" );
    script.type = "text/javascript";
    script.src = '../controladores/validaciones.js';
    cP.appendChild(script);
    
    txtDescripcion= d.getElementById('categoriaDescripcion');
    

}

function guardar(e) {
   
    e.preventDefault();
       
    categoriasServices.crear(txtDescripcion.value)
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/categorias";

        })
        .catch(error => console.log(error))        

}    

function modificar(e) {
   
    e.preventDefault();
   
    
    categoriasServices.editar(idCategoria, txtDescripcion.value )
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/categorias";

        })
        .catch(error => console.log(error))        

}   