
// Constructor del producto
class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

class Carrito {
  // Array vacío para ir llenando el carrito
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
      // Si se encuentra el producto, se elimina
      this.items.splice(itemIndex, 1);
      alert(`Producto con ID ${idProducto} ha sido eliminado del carrito.`);
    } else {
      alert(`Producto con ID ${idProducto} no encontrado.`);
    }
  }

}

// Crear carrito
const carrito = new Carrito();

// Definimos dos variables para poder cargar productos manualmente
let continuar = true;
let id = 1;
let total = 0;


while (continuar) {
  const nombre = prompt("Ingrese el nombre del producto:");
  const precio = parseFloat(prompt("Ingrese el precio del producto:"));
  const cantidad = parseInt(prompt("Ingrese la cantidad del producto:"), 10);

  const producto = new Producto(id++, nombre, precio);
  carrito.agregarProducto(producto, cantidad);

  // Actualizamos el precio
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
    total = 0; // Resetear el total
    carrito.items.forEach(i => {
      total += i.producto.precio * i.cantidad; // Volver a calcular el total
    });
  }
}

// Mostrar el carrito final
alert(`Carrito final:\n${carrito.mostrarCarrito()}\nTotal final: $${total}`);