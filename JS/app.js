
// Constructor del producto
class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

class Carrito {
  constructor() {
    this.items = [];
  }

  agregarProducto(producto, cantidad) {
    const item = this.items.find(i => i.producto.id === producto.id);
    if (item) {
      item.cantidad += cantidad;
    } else {
      this.items.push({ producto, cantidad });
    }
  }

  mostrarCarrito() {
    if (this.items.length === 0) {
      return "El carrito está vacío.";
    }
    return this.items
      .map(i => `${i.producto.nombre.toUpperCase()} (x${i.cantidad}) - $${i.producto.precio * i.cantidad}`)
      .join("\n");
  }

  eliminarProducto(idProducto) {
    const itemIndex = this.items.findIndex(i => i.producto.id === idProducto);
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
      alert(`Producto con ID ${idProducto} ha sido eliminado del carrito.`);
    } else {
      alert(`Producto con ID ${idProducto} no encontrado.`);
    }
  }
}

// Crear carrito
const carrito = new Carrito();

let continuar = true;
let id = 1;
let total = 0;

while (continuar) {
  const nombre = prompt("Ingrese el nombre del producto:");

  let precio;
  do {
    precio = parseFloat(prompt("Ingrese el precio del producto:"));
    if (isNaN(precio) || precio <= 0) {
      alert("Por favor, ingrese un precio válido mayor que 0.");
    }
  } while (isNaN(precio) || precio <= 0);

  let cantidad;
  do {
    cantidad = parseInt(prompt("Ingrese la cantidad del producto:"), 10);
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Por favor, ingrese una cantidad válida mayor que 0.");
    }
  } while (isNaN(cantidad) || cantidad <= 0);

  const producto = new Producto(id++, nombre, precio);
  carrito.agregarProducto(producto, cantidad);

  total += precio * cantidad;

  continuar = confirm("¿Desea agregar otro producto?");
}

// Mostrar carrito y preguntar si desea eliminar un producto
let eliminar = true;

while (eliminar) {
  const carritoContenido = carrito.mostrarCarrito();
  alert(`Carrito de compras:\n${carritoContenido}\n\nTotal: $${total}`);

  const respuesta = prompt("¿Desea eliminar un producto del carrito? (Escriba el ID del producto o 'no' para cancelar)");

  if (respuesta.toLowerCase() === 'no') {
    eliminar = false;
  } else {
    const idEliminar = parseInt(respuesta, 10);
    carrito.eliminarProducto(idEliminar);

    // Actualizamos total después de eliminar el producto
    total = 0;
    carrito.items.forEach(i => {
      total += i.producto.precio * i.cantidad;
    });
  }
}

// Mostrar el carrito final
alert(`Carrito final:\n${carrito.mostrarCarrito()}\nTotal final: $${total}`);
