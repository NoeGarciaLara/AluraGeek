import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");

export default function crearCard(id, nombre, precio, urlImagen){
    const producto = document.createElement("card");
    producto.className = "producto__item";
    producto.innerHTML=`<card>
                            <img src="${urlImagen}" class="producto">
                            <div class="datos__producto">
                                <h2>${nombre}</h2>
                                <div class="precio">
                                    <h3>${precio}</h3>
                                    <img src="/assets/🦆 icon _trash 2_.png" class="eliminar__producto">
                                </div>
                            </div> 
                        </card>`;

                        const botonBorrar = producto.querySelector(".eliminar__producto");
                        botonBorrar.addEventListener("click", () => {
                            conexionAPI.borrarProducto(id)
                                .then(() => {
                                    producto.remove();
                                })
                                .catch(error => console.log(error));
                            });
    return producto;
}

async function listarProductos() {
    try {
        const listAPI = await conexionAPI.listarProductos();
        if (listAPI.length == 0) {
            lista.innerHTML = `<img class="no__producto" src="./assets/no_productos.jpg" alt="No se han agregado productos">
            <h4 class="no__productos__mensaje">No se han agregado productos</h4>`;
        }else{
            
        listAPI.forEach(producto => lista.appendChild(crearCard(producto.id, producto.nombre, producto.precio, producto.urlImagen)));
        }
    } catch (error) {
        lista.innerHTML = `<h2>Ha ocurrido un problema con la conexion :( </h2>`;
    }
}

listarProductos();