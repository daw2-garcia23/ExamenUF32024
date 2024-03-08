import { bd } from "../bd.js"
import { formulario } from "./pedidos.js";

export const tablaPedidos = {
    template: `<div id="tablaPedidos" class="container mt-5 mb-5 p-5 border shadow-lg ">
    <div class="row">
      <h1 class="text-center mb-5 ">----- Vista camareros -----</h1>
    <h3>Pedidos</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Grupo</th>
          <th>Mesa</th>
          <th>Cerveza</th>
          <th>Cantidad</th>
          <th>Estado</th>
        </tr>        
      </thead>
      <tbody id="cervecitas">
        <tr>
          <td>1</td>
          <td>Borrachos de DAW2</td>
          <td>1</td>
          <td>Estrella Galicia</td>
          <td>3</td>
          <td>
            <div class="d-flex gap-2">
              <button class="btnEliminarPendientes pendiente btn btn-outline-warning w-100 btn-sm">Pedido pendiente...</button>
              <button class="pedido eliminar btn btn-outline-danger w-100 btn-sm"> 🗑 Borrar pedido</button>
            </div>
            
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Cabezones contentos</td>
          <td>1</td>
          <td>Estrella DAM</td>
          <td>2</td>
          <td>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-success w-100 btn-sm">¡Pedido servido!</button>
              <button class="eliminar btn btn-outline-danger w-100 btn-sm"> 🗑 Borrar pedido</button>
            </div>       
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    
  </div>
            `,
    script: () => {

        let pedidos= [] //creo mi array para los pedidos
        let sumarid = 2; // para inyectar los ids
                
        document.querySelector('#pedido').addEventListener('click', () => {
        const nombreGrupo = document.querySelector('#nombreGrupo').value; //recojo valores
        const numeroMesa = document.querySelector('#numeroMesa').value;
        const cantidad = document.querySelector('#cantidad').value;
            
                   
        const seleccionar = document.querySelector('#cervezas'); //selecciono el id cervezas
        const cervezaSeleccionadaId = parseInt(seleccionar.value); //aqui recojere que cerveza es
        const cervezaSeleccionada = bd.find(cerveza => cerveza.id === cervezaSeleccionadaId); //busco en el arrat la cerveza seleccionada
        const nombreCerveza = cervezaSeleccionada.nombre //REcjo el nombre de la cerveza
            
        let tr = document.createElement('tr'); // Creo el elemento tr con el createElemento
        tr.setAttribute("id", sumarid++); // añado un atributo id al tr y luego aumentamos en 1 para llevar un orden en los ids
        const inyectarTabla = `
            <tr>
                <td>${sumarid}</td>
                <td>${nombreGrupo}</td>
                <td>${numeroMesa}</td>
                <td>${nombreCerveza}</td>
                <td>${cantidad}</td>
                <td><button class="btnEliminarPendientes eliminar pendiente btn btn-outline-warning w-100 btn-sm">Pedido pendiente...</button></td>
                <td><button class="btn eliminar btn-outline-danger w-100 btn-sm"> 🗑 Borrar pedido</button></td>
            </tr>`;
            
        // Insertar(sumo porque si no se me borraria todo) la fila en la tabla
        document.querySelector('tbody').innerHTML += inyectarTabla;
        
        //subo los pedidos al array generado
        pedidos.push({
            id: sumarid,
            grupo: nombreGrupo,
            mesa: numeroMesa,
            cerveza: nombreCerveza,
            cantidad: cantidad,
            estado: "Pedido pendiente"
        });
        console.log('array de pedidos',pedidos)
        });
        document.addEventListener('click', (event) => { //añado el evento click a los botones con clase pendiente
            if (event.target.classList.contains('pendiente')) { //vemos todos los elementos con clase pendiente
                const button = event.target; //recojo donde he hecho click 
                button.classList.remove('pendiente'); //borramos la clase pendiente
                button.classList.remove('btn-outline-warning'); //borramos el color del boton
                button.classList.add('btn-outline-success'); //añadimos la clase de bootstrap para el boton verde
                button.classList.add('pedido'); //añadimos la clase pedido
                button.innerHTML = '¡Pedido servido!' //inyectamos
            }
        });


        //Eliminar pedidos
         document.querySelector('#cervecitas').addEventListener('click', (event) => {
            console.log('eliminando el pedido');
            // Este evento se activa cuando se hace clic en cualquier parte del tbody
            const boton = event.target.closest('.eliminar'); 
            
            if (boton) {
                const fila = boton.closest('tr'); // Encuentra el tr proximo del btn
        
                if (fila) {
                    fila.remove(); // Elimina la fila
                    console.log('pedidos borrados',pedido)
                }
            }
        });
    }
}
            
