/*=============================================
Función para validar data repetida
=============================================*/
 function validateRepeat(event, type){

    // event.target.value = "";
    // event.target.parentNode.classList.add('was-validated'); 
    //  event.target.parentNode.querySelector(".invalid-feedback").innerHTML = "Email repetido";
  
  
  }
  
  
  /*=============================================
  Función para validar formulario
  =============================================*/
  function validateJS(event, type){
  
    var pattern;
  
    if(type == "text") pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}$/;
  
    if(type == "t&n") pattern = /^[A-Za-z0-9]{1,}$/;
  
    if(type == "email") pattern = /^[.a-zA-Z0-9_]+([.][.a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/;
  
    if(type == "pass") pattern = /^[#\\=\\$\\;\\*\\_\\?\\¿\\!\\¡\\:\\.\\,\\0-9a-zA-Z]{1,}$/;
  
    if(type == "regex") pattern = /^[-\\(\\)\\=\\%\\&\\$\\;\\_\\*\\"\\#\\?\\¿\\!\\¡\\:\\,\\.\\0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{1,}$/;
  
    if(type == "phone") pattern = /^[-\\(\\)\\0-9 ]{1,}$/;
  
    
    if(!pattern.test(event.target.value)){
  
     event.target.parentNode.classList.add('was-validated'); 
     event.target.parentNode.querySelector(".invalid-feedback").innerHTML = "Campo no válido";
     
    }
  
  }
  
  /*=============================================
  Validamos imagen
  =============================================*/
  
  function validateImageJS(event, input){
    
    var image = event.target.files[0];
  
    if(image["type"] !== "image/png" && image["type"] !== "image/jpeg" && image["type"] !== "image/gif"  ){
  
      alert( "La imagen dede ser JPG, PNG o GIF.");
  
      return;
  
    }
  
    else if(image["size"] > 30000){
  
      alert( "La imagen no puede pesar mas de 30KB");
  
      return;
  
    }else{
  
      var data = new FileReader();
      data.readAsDataURL(image);
  
      data.onload = function () {
        if (data.readyState === 2) {
          let contenido = data.result;
          document.querySelector ('.'+ input).setAttribute("src", contenido);
        }
  
      }
  
    }
  
  }
  
  /*=============================================
  Función para recordar credenciales de ingreso
  =============================================*/
  
  function rememberMe(event){
    
    if(event.target.checked){
  
      localStorage.setItem("emailRemember", $('[name="loginEmail"]').val());
      localStorage.setItem("checkRemember", true);
  
    }else{
  
      localStorage.removeItem("emailRemember");
      localStorage.removeItem("checkRemember");
  
    }
  
  }
  
  /*=============================================
  Capturar el email para login desde el LocalStorage
  =============================================*/
  
  $(document).ready(function(){
  
    if(localStorage.getItem("emailRemember") != null){
  
       $('[name="loginEmail"]').val(localStorage.getItem("emailRemember"));
    }
  
    if(localStorage.getItem("checkRemember") != null && localStorage.getItem("checkRemember")){
  
      $('#remember').attr("checked",true);
  
    }
  
  })
  