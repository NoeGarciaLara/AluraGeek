async function listarProductos(){
    const conexion = await fetch("http://localhost:3000/productos");

    const conexionConvertida = conexion.json();

    return conexionConvertida;
}

async function enviarProducto(nombre, precio, urlImagen) {
    const conexion = await fetch ("http://localhost:3000/productos",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            nombre:nombre,
            precio:`$${precio}.00`,
            urlImagen:urlImagen
        })
    })
    const conexionConvertida = conexion.json();

    if(!conexion.ok){
        throw new Error ("Ha ocurrido un error al actualizar el producto");
    }

    return conexionConvertida;
}

export const conexionAPI = {
    listarProductos, enviarProducto
}