let productoEnCarrito = localStorage.getItem("producto-en-carro");
productoEnCarrito = JSON.parse(productoEnCarrito);
console.log(productoEnCarrito)
const shopProducto = document.querySelector("#carritoProducto")
const carroVacio = document.querySelector("#carrito-vacio")
const carroBotones= document.querySelector("#carritoBotones")
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-botones-eliminar")
const total = document.querySelector("#total")

function cargaDeProducto(){
if(productoEnCarrito && productoEnCarrito.length > 0){

    

     carroVacio.classList.add("disabled")
     shopProducto.classList.remove("disabled")
     carroBotones.classList.remove("disabled")

shopProducto.innerHTML = ""

    productoEnCarrito.forEach(producto =>{
        
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML= `
        <img class="carrito-producto-imagen" src="${producto.img}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small>titulo</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <small>precio</small>
                        <p>${producto.precio} USD</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>subtotal</small>
                        <p>${producto.precio * producto.cantidad}</p>
                    </div>
                    <button id="${producto.id}" class="carrito-producto-eliminar" ><i class="bi bi-trash"></i></button>`

                    shopProducto.append(div)
    })

} else {
carroVacio.classList.remove("disabled")
     shopProducto.classList.add("disabled")
     carroBotones.classList.add("disabled")
}
botonesEliminar()
miTotal()
}
cargaDeProducto()


function botonesEliminar(){
    botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarCarrito)
    })
}
function eliminarCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productoEnCarrito.findIndex(producto => producto.id === idBoton)
    productoEnCarrito.splice(index,1)
    cargaDeProducto()

    localStorage.setItem("producto-en-carro", JSON.stringify(productoEnCarrito));
    
}

botonVaciar.addEventListener("click",vacio)
function vacio() {

productoEnCarrito.length = 0;
 localStorage.setItem("producto-en-carro", JSON.stringify(productoEnCarrito));
 cargaDeProducto()

}

function miTotal(){
    const elTotal = productoEnCarrito.reduce((acc,producto) => acc + (producto.precio * producto.cantidad),0)
total.innerText = ` $ ${elTotal} USD`
}