/*
   Laboratorio: Arreglos, Funciones y Objetos
*/

/* PARTE 1: ARREGLOS */

const inventario = ["teclado", "mouse", "monitor", "audífonos"];

// 1.1 a) Obtener el ultimo elemento usando .length
console.log("Último elemento:", inventario[inventario.length - 1]);


function agregarItems(arr, alInicio, alFinal) {
  return [alInicio, ...arr, alFinal];
}

// Prueba de agregarItems
const inventarioActualizado = agregarItems(inventario, "cable HDMI", "webcam");
console.log("Inventario actualizado:", inventarioActualizado);
console.log("Inventario original:", inventario);

const temperaturas = [18, 22, 25, 30, 15, 19, 27];

function aFahrenheit(arr) {
  return arr.map(temperatura => (temperatura * 9 / 5) + 32);
}

function diasCalurosos(arr, umbral) {
  return arr.filter(temperatura => temperatura > umbral);
}

function promedio(arr) {
  const suma = arr.reduce((acumulador, temperatura) => acumulador + temperatura, 0);
  return suma / arr.length;
}

function temperaturaMaxima(arr) {
  return Math.max(...arr);
}

function buscarPrimerMayorA(arr, valor) {
  return arr.find(elemento => elemento > valor);
}

function ordenarDescendente(arr) {
  return [...arr].sort((a, b) => b - a);
}

// Console Log 1
console.log("Temperaturas en Fahrenheit:", aFahrenheit(temperaturas));
console.log("Días calurosos mayores a 20:", diasCalurosos(temperaturas, 20));
console.log("Promedio:", promedio(temperaturas));
console.log("Temperatura máxima:", temperaturaMaxima(temperaturas));
console.log("Primer valor mayor a 23:", buscarPrimerMayorA(temperaturas, 23));
console.log("Orden descendente:", ordenarDescendente(temperaturas));
console.log("Temperaturas originales:", temperaturas);


/* PARTE 2: FUNCIONES */

function procesarLista(arr, accion) {
  const resultado = [];

  for (const elemento of arr) {
    resultado.push(accion(elemento));
  }

  return resultado;
}

// Pruebas de procesarLista
const numeros = [1, 2, 3, 4];
const palabras = ["hola", "javascript", "web"];

console.log("Números duplicados:", procesarLista(numeros, numero => numero * 2));
console.log("Palabras en mayúsculas:", procesarLista(palabras, palabra => palabra.toUpperCase()));

function crearMultiplicador(factor) {
  return numero => numero * factor;
}

const porTres = crearMultiplicador(3);
console.log("10 por 3:", porTres(10));

function dividirSeguro(a, b) {
  if (b === 0) {
    throw new Error("No se puede dividir entre cero");
  }

  return a / b;
}

// Console Log 2
try {
  console.log("División exitosa:", dividirSeguro(10, 2));
} catch (error) {
  console.log("Error:", error.message);
}

try {
  console.log("División entre cero:", dividirSeguro(10, 0));
} catch (error) {
  console.log("Error capturado:", error.message);
}


/* PARTE 3: OBJETOS */

const producto = {
  nombre: "Teclado mecánico",
  precio: 45,
  stock: 12,
  aplicarDescuento(porcentaje) {
    return this.precio - (this.precio * porcentaje / 100);
  },
};

const catalogo = [
  { nombre: "Teclado", precio: 45, categoria: "periféricos", stock: 12 },
  { nombre: "Monitor", precio: 180, categoria: "pantallas", stock: 5 },
  { nombre: "Mouse", precio: 20, categoria: "periféricos", stock: 30 },
  { nombre: "Silla", precio: 150, categoria: "mobiliario", stock: 0 },
];

function productosDisponibles(catalogo) {
  return catalogo.filter(producto => producto.stock > 0);
}

function nombresPorCategoria(catalogo, categoria) {
  return catalogo
    .filter(({ categoria: cat }) => cat === categoria)
    .map(({ nombre }) => nombre);
}

function valorTotalInventario(catalogo) {

  return catalogo.reduce(
    (total, producto) => total + (producto.precio * producto.stock),
    0
  );
}

function productoMasCaro(catalogo) {
  // se busca el producto más caro usando reduce
  return catalogo.reduce((masCaro, productoActual) => {
    if (productoActual.precio > masCaro.precio) {
      return productoActual;
    }

    return masCaro;
  });
}

// Console Log
console.log("Precio con 20% de descuento:", producto.aplicarDescuento(20));
console.log("Precio original:", producto.precio);
console.log("Productos disponibles:", productosDisponibles(catalogo));
console.log("Periféricos:", nombresPorCategoria(catalogo, "periféricos"));
console.log("Valor total del inventario:", valorTotalInventario(catalogo));
console.log("Producto más caro:", productoMasCaro(catalogo));


/* PARTE 4: RETO INTEGRADOR */

const ventas = [
  { producto: "Teclado", cantidad: 3, precioUnitario: 45 },
  { producto: "Monitor", cantidad: 1, precioUnitario: 180 },
  { producto: "Mouse", cantidad: 5, precioUnitario: 20 },
  { producto: "Teclado", cantidad: 2, precioUnitario: 45 },
  { producto: "Silla", cantidad: 1, precioUnitario: 150 },
];

// Reporte
function generarReporte(ventas) {

  const totalVendido = ventas.reduce(
    (total, venta) => total + (venta.cantidad * venta.precioUnitario),
    0
  );

  const agrupadoPorProducto = ventas.reduce((acumulador, venta) => {
    if (!acumulador[venta.producto]) {
      acumulador[venta.producto] = {
        producto: venta.producto,
        cantidadTotal: 0,
        ingresoTotal: 0,
      };
    }

    acumulador[venta.producto].cantidadTotal += venta.cantidad;
    acumulador[venta.producto].ingresoTotal += venta.cantidad * venta.precioUnitario;

    return acumulador;
  }, {});

  const resumenPorProducto = Object.values(agrupadoPorProducto);

  const resumenOrdenado = [...resumenPorProducto].sort(
    (a, b) => b.cantidadTotal - a.cantidadTotal
  );

  const productoTopVentas = resumenOrdenado[0].producto;

  return {
    totalVendido: totalVendido,
    numeroTransacciones: ventas.length,
    productoTopVentas: productoTopVentas,
    resumenPorProducto: resumenPorProducto,
  };
}


console.log(JSON.stringify(generarReporte(ventas), null, 2));


/*
   PREGUNTAS DE CIERRE 
*/
/*
1. ¿Qué diferencia hay entre map y forEach? ¿Cuándo usarías cada uno?

map recorre un arreglo y devuelve un nuevo arreglo con el resultado de aplicar
una función a cada elemento. Lo usaría cuando necesito transformar datos, por
ejemplo convertir una lista de temperaturas de Celsius a Fahrenheit.

forEach también se recorre los elementos, pero se usa más cuando se quiere ejecutar
una acción con cada elemento y no necesita crear otro arreglo. Por ejemplo,
mostrar cada elemento con console.log.


2. ¿Por qué reduce se considera el método "más general" entre los métodos de arreglos vistos?

Porque reduce recorre todo el arreglo y va guardando el resultado en un
acumulador. Ese acumulador puede terminar siendo un número, un objeto o incluso
otro arreglo. Por eso sirve para sumar valores, calcular totales y también
agrupar información, como se hizo en el reporte de ventas.


3. Da un ejemplo real (fuera de este laboratorio) donde modelarías datos como un arreglo de objetos?

Un ejemplo sería una lista de estudiantes de una universidad. Cada estudiante
podría ser un objeto con propiedades como nombre, cédula, carrera y promedio,
y todos los estudiantes estarían guardados dentro de un arreglo.


4. ¿Qué ventaja tiene evitar mutar arreglos y objetos directamente?

La ventaja es que los datos originales se mantienen sin cambios. Así es más
fácil saber qué valor tenía la información antes de una operación y se evitan
cambios inesperados en otras partes del programa. Por ejemplo, al ordenar un
arreglo puedo hacer primero una copia con [...arr] y ordenar esa copia.
*/
