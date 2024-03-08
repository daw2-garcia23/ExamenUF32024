import { bd } from "../bd.js";


export const  formulario = {
    template: `
    <div class="container mt-3 p-5 border shadow-lg ">
    <h1 class="text-center mb-5 ">----- Vista usuario -----</h1>
    <div class="row">
      
      <div class="col-6">
        <h3>Grupo</h3>
        <label for="nombreGrupo" class="label-control">Nombre del grupo:</label>
        <input id="nombreGrupo" type="text" class="form-control mt-2" placeholder ="Borrachos de DAW2">
        <label for="numeroMesa" class="label-control">Mesa numero</label>
        <input id="numeroMesa" type="number" class="form-control mt-2" placeholder ="0">
      
        <h3 class="mt-5">Haz tu pedido</h3>
        <div class="d-flex gap-3 ">
        
          <select id="cervezas" class="form-control">

    
          </select>
        
          <input id="cantidad" type="number" value="0" class="form-control">
        </div>
        <button id="pedido" type="submit" class="btn btn-success mt-4 w-100">¡Enviar pedido!</button>
      </div>
      <div class="col-6 border ">
        <div class="p-3 d-flex">

          <div id="muestraCerveza">

          </div>
          

        </div>
      </div>
     
    </div>
    

  </div>
              `,
    

    script: ()=>{
        let html='';
        bd.forEach(element => {
        html += `<option value="`+ element.id +`">`+ element.nombre +`</option>`  //para cada cerveza del array genero una etiqueta option
        console.log('hola desde el option')
        })
        document.querySelector('#cervezas').innerHTML = html //inyecto las opciones dentro del select

        
        // genero una carta inicial que corresponde al primer item del array cervezas
        let descripcion  = ` <div class="pb-5">
                                <h3 id="nombre" class="pb-3">`+ bd[0].nombre +`</h3>
                                <p id="descripcion">`+ bd[0].descripcion +`</p>
                            </div>
                            <img src="`+ bd[0].imagen +`" class="card-img-bottom w-25 img-fluid" alt="">
                            `
        document.querySelector('#muestraCerveza').innerHTML = descripcion //inyecto en el div que se situa a la derecha la carta
        
        const selectElement = document.querySelector('#cervezas');  
        selectElement.addEventListener('change', (event) => { // Detecto el cambio en el select y genero la carta que pintaré dependiendo de qué opción elijo
        console.log('cerveza cambiada')
        let numero = parseInt(event.target.value); // Convertir a número entero y lo meto en una variable para saber donde estoy del select, y lo parsea a numero entero porq me daba error y asi me funciona
        let seleccion = bd.find(cerveza => cerveza.id === numero); //array function para buscar por el id de la cerveza
        if (seleccion) { //condicion qu inyectamos la descripicon de la cerveza
            descripcion = ` <div class="pb-5">
                                <h3 id="nombre" class="pb-3">${seleccion.nombre}</h3> 
                                <p id="descripcion">${seleccion.descripcion}</p>
                            </div>
                            <img src="${seleccion.imagen}" class="card-img-bottom w-25 img-fluid" alt="">
                            `;
            document.querySelector('#muestraCerveza').innerHTML = descripcion; //inyectamos la descripcion en el div muestraCerveza
        } else {
            console.error('la cerveza no se encuentra');
        }
    });
    }

}