import { usuariosServices } from "/servicios/usuarios-servicios.js";


const htmlAmUsuarios = `
<div class="card card-dark card-outline">

	<form  class="needs-validation frmAmUsuario"  enctype="multipart/form-data">
	
		<div class="card-header">
               
			<div class="col-md-8 offset-md-2">	
               
				<!--=====================================
                Nombre
                ======================================-->
				
				<div class="form-group mt-5">
					
					<label>Nombre</label>

					<input 
					type="text" 
					class="form-control"
					pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}"
					onchange="validateJS(event,'text')"
					name="nombre"
                    id="usuarioNombre"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>

				<!--=====================================
                Apellido
                ======================================-->

				<div class="form-group mt-2">
					
					<label>Apellido</label>

					<input 
					type="text" 
					class="form-control"
					onchange="validateJS(event,'text')"
					name="apellido"
                    id="usuarioApellido"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>

				<!--=====================================
                Correo electrónico
                ======================================-->

				<div class="form-group mt-2">
					
					<label>Email</label>

					<input 
					type="email" 
					class="form-control"
					onchange="validateRepeat(event,'email')"
					name="email"
                    id="usuarioEmail"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>


				<!--=====================================
                Contraseña
                ======================================-->

				<div class="form-group mt-2">
					
					<label>Password</label>

					<input 
					type="password" 
					class="form-control"
					onchange="validateJS(event,'pass')"
					name="password"
                    id="usuarioPassword" 
					required
					>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>


				<!--=====================================
                Foto
                ======================================-->

				<div class="form-group mt-2">
					
					<label>Foto</label>
			
					<label for="customFile" class="d-flex justify-content-center">
						
						<figure class="text-center py-3">
							
							<img src="../../img/usuarios/default/anonymous.png" class="img-fluid rounded-circle changePicture" style="width:150px">

						</figure>

					</label>

					<div class="custom-file">
						
						<input 
						type="file" 
						id="customFile" 
						class="custom-file-input"
						accept="image/*"
						onchange="validateImageJS(event,'changePicture')"
						name="picture"
                       	>

						<div class="valid-feedback">Valid.</div>
            			<div class="invalid-feedback">Please fill out this field.</div>

						<label for="customFile" class="custom-file-label">Elegir imágen</label>

					</div>

				</div>

				<!--=====================================
                País
                ======================================-->

             	<div class="form-group mt-2">
					
					<label>País</label>

					

					<select class="form-control select2 changeCountry" name="pais" id="usuarioPais" required>
						
						<option value>Seleccionar país</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Chile">Chile</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Perú">Perú</option>
                        <option value="Uruguay">Chile</option>

					</select>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>  

				<!--=====================================
                Ciudad
                ======================================-->

                <div class="form-group mt-2">
					
					<label>Ciudad</label>

					<input 
					type="text" 
					class="form-control"
					onchange="validateJS(event,'text')"
					name="ciudad"
                    id="usuarioCiudad"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>

				<!--=====================================
                Dirección
                ======================================-->

                <div class="form-group mt-2">
					
					<label>Dirección</label>

					<input 
					type="text" 
					class="form-control"
					onchange="validateJS(event,'regex')"
					name="direccion"
                    id="usuarioDireccion"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>

				<!--=====================================
                Teléfono
                ======================================-->

                <div class="form-group mt-2 mb-5">
					
					<label>Teléfono</label>

					<div class="input-group">

						<div class="input-group-append">
							<span class="input-group-text dialCode">+54</span>
						</div>

						<input 
						type="text" 
						class="form-control"
						onchange="validateJS(event,'phone')"
						name="telefono"
                        id="usuarioTelefono"
						required>

					</div>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>

			
			</div>
		

		</div>

		<div class="card-footer">
			
			<div class="col-md-8 offset-md-2">
	
				<div class="form-group mt-3">

					<a href="#/usuarios" class="btn btn-light border text-left">Cancelar</a>
					
					<button type="submit" class="btn bg-dark float-right">Guardar</button>

				</div>

			</div>

		</div>


	</form>


</div> `;
var formulario='';
var txtNombre='';
var txtApellido='';
var txtCorreo='';
var txtPass='';
var fileAvatar='';
var selPais='';
var txtCiudad='';
var txtDireccion='';
var txtTelefono='';
var idUsuario;

export async function newRegister(){
    let d = document;
    
    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Usuario';
	d.querySelector('.contenidoTituloSec').innerHTML += 'Agregar';
   
    crearFormulario();

    formulario = d.querySelector(".frmAmUsuario")
    formulario.addEventListener("submit", guardar);
}

export async function editRegister(id){
    let d = document;
    idUsuario = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Usuario';
    d.querySelector('.contenidoTituloSec').innerHTML += 'Editar';
    crearFormulario();

    formulario = d.querySelector(".frmAmUsuario")
    formulario.addEventListener("submit", modificar);
    let usuario =  await usuariosServices.listar(id);

    
    txtNombre.value= usuario.nombre;
    txtApellido.value= usuario.apellido;
    txtCorreo.value= usuario.correo;
    txtPass.value= usuario.password;
    if (usuario.avatar.length > 0 )
        fileAvatar.src= usuario.avatar;
    selPais.value= usuario.pais;
    txtCiudad.value= usuario.ciudad;
    txtDireccion.value= usuario.direccion;
    txtTelefono.value= usuario.telefono;
}

function crearFormulario(){
    let d = document;
    d.querySelector('.rutaMenu').innerHTML = "Usuarios";
    d.querySelector('.rutaMenu').setAttribute('href',"#/usuarios");

    let cP =d.getElementById('contenidoPrincipal');
    cP.innerHTML =  htmlAmUsuarios;
    
    var script = document.createElement( "script" );
    script.type = "text/javascript";
    script.src = '../controladores/validaciones.js';
    cP.appendChild(script);
    
    txtNombre= d.getElementById('usuarioNombre');
    txtApellido= d.getElementById('usuarioApellido');
    txtCorreo= d.getElementById('usuarioEmail');
    txtPass= d.getElementById('usuarioPassword');
    fileAvatar= d.querySelector('.changePicture');
    selPais= d.getElementById('usuarioPais');
    txtCiudad= d.getElementById('usuarioCiudad');
    txtDireccion= d.getElementById('usuarioDireccion');
    txtTelefono= d.getElementById('usuarioTelefono');

}

function guardar(e) {
   
    e.preventDefault();
   
    var pais = selPais.options[selPais.selectedIndex];
    usuariosServices.crear(txtApellido.value, txtNombre.value, txtCorreo.value, txtPass.value, fileAvatar.src , 
        pais.value, txtCiudad.value, txtDireccion.value, txtTelefono.value)
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/usuarios";

        })
        .catch(error => console.log(error))        

}    

function modificar(e) {
   
    e.preventDefault();
   
    var pais = selPais.options[selPais.selectedIndex];
    usuariosServices.editar(idUsuario, txtApellido.value, txtNombre.value, txtCorreo.value, txtPass.value, fileAvatar.src , 
        pais.value, txtCiudad.value, txtDireccion.value, txtTelefono.value)
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/usuarios";

        })
        .catch(error => console.log(error))        

}   