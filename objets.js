let stockProductos = [
{id: "auricular-01",categoria:{nombre:"auriculares",id:"auriculares"} , titulo: "auriculares kotion", precio: 30, img: 'imagesProducts/auricularesKotion.jpg'},
{id: "auricular-02",categoria:{nombre:"auriculares",id:"auriculares"} , titulo: "auricularesGreen", precio: 40 , img: 'imagesProducts/auricularGreen.jpg'},
{id: "auricular-03",categoria:{nombre:"auriculares",id:"auriculares"} , titulo: "auriculares logitech", precio: 55 , img: 'imagesProducts/auricularLogitech.jpg'},
{id: "auricular-04",categoria:{nombre:"auriculares",id:"auriculares"} , titulo: "auricularWhite", precio: 23 , img: 'imagesProducts/auricularWhite.jpg'},
{id:"microfono-01",categoria:{nombre:"microfonos",id:"microfonos"}, titulo: "microfono hyperx", precio: 75 , img: 'imagesProducts/microHyperx.jpg'},
{id:"microfono-02",categoria:{nombre:"microfonos",id:"microfonos"}, titulo: "microfono mini black", precio: 45 , img: 'imagesProducts/microMiniBlack.jpg'},
{id:"microfono-03",categoria:{nombre:"microfonos",id:"microfonos"}, titulo: "microfono mini white", precio: 45 , img: 'imagesProducts/microminiwhite.jpg'},
{id:"microfono-04",categoria:{nombre:"microfonos",id:"microfonos"}, titulo: "microfono white", precio: 70  , img: 'imagesProducts/microWhite.jpg'},
{id:"webcams-01",categoria:{nombre:"Webcams",id:"webcams"}, titulo: "webcam asus", precio: 15 , img: 'imagesProducts/webcamasus.jpg'},
{id:"webcams-02",categoria:{nombre:"Webcams",id:"webcams"}, titulo:  "webcam black", precio: 15 , img: 'imagesProducts/webcamblack.jpg'},
{id:"webcams-03",categoria:{nombre:"Webcams",id:"webcams"}, titulo: "webcam genius", precio: 18 , img: 'imagesProducts/webcamgenius.jpg'},
{id:"webcams-04",categoria:{nombre:"Webcams",id:"webcams"}, titulo: "webcam logitech", precio: 28 , img: 'imagesProducts/webcamlogitech.jpg'},
]
fetch("productos.json")
 .then(response => response.json())
 .then(data => {console.log(data)})

const contengoProductos= document.querySelector("#contenedor-productos");
const botonesMenu = document.querySelectorAll(".boton-init")
const titulo = document.querySelector("#title-init")
let agregar = document.querySelectorAll(".producto-agregar")
const number = document.querySelector("#number")
const pokemon = document.querySelector(`#pokeparada`)
 


setTimeout(()=>{
    fetch("https://pokeapi.co/api/v2/pokemon/1 ")
.then(Response => Response.json())
.then(poke => {

    pokemon.innerHTML = `
    <img src=${poke.sprites.front_default} />
    `
})
},1000)


function cargarProductos(elegirProducto){
contengoProductos.innerHTML = "";

elegirProducto.forEach(producto =>{

    const div = document.createElement("div");

    div.classList.add("producto");
    div.innerHTML= `<img class="producto-imagen" src="${producto.img}" alt="${producto.titulo}">
                <div class="product-contain">
                    <h3 class="producto-name">${producto.titulo}</h3>
                    <p class="producto-precio">precio: ${producto.precio} USD</p>
                    <button class="producto-agregar" id="${producto.id}">agregar carrito </button>
                </div>`;
                contengoProductos.append(div);
})
botonesNuevos()
}

cargarProductos(stockProductos);

botonesMenu.forEach(boton =>{
    boton.addEventListener("click",(e) =>{
        botonesMenu.forEach(boton => boton.classList.remove("activo"))
        e.currentTarget.classList.add("activo")

        if(e.currentTarget.id != "todo"){
            const categoria = stockProductos.find(producto => producto.categoria.id === e.currentTarget.id);
            titulo.innerText = categoria.categoria.nombre;
const productosBoton = stockProductos.filter(producto => producto.categoria.id === e.currentTarget.id)

        cargarProductos(productosBoton);
        } else{
            titulo.innerText = "todos los productos"
            cargarProductos(stockProductos)
        }

        
    })
});

function botonesNuevos(){
    agregar = document.querySelectorAll(".producto-agregar");

    agregar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito)
    })
}
let productoCarrito;

let productoEnCarritoLS = localStorage.getItem("productos-en-carro")

if(productoEnCarritoLS){
     productoCarrito = JSON.parce(productoEnCarritoLS);
     actNumber();
}else{
    productoCarrito = [];
}


function agregarCarrito(e){
const idBoton = e.currentTarget.id;

const productoAgregar = stockProductos.find(producto => producto.id === idBoton);


if(productoCarrito.some(producto => producto.id === idBoton)){
    const index = productoCarrito.findIndex( producto => producto.id === idBoton);
    productoCarrito[index].cantidad++

}else {
    productoAgregar.cantidad = 1;
    productoCarrito.push(productoAgregar)
}

actNumber();
localStorage.setItem("producto-en-carro",JSON.stringify(productoCarrito))
}

function actNumber(){
    let numero = productoCarrito.reduce((acc, producto) => acc + producto.cantidad,0) 
number.innerText = numero;
}