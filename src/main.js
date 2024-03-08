import { header } from "./componentes/header.js"
import { formulario } from "./componentes/pedidos.js"
import { tablaPedidos } from "./componentes/tablaPedidos.js"
import { home } from "./vistas/home.js"







document.querySelector('header').innerHTML = header.template //inyecto la plantilla header
document.querySelector('main').innerHTML = formulario.template + tablaPedidos.template

formulario.script()
tablaPedidos.script()