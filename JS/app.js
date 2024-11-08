let carga = parseFloat(prompt("Ingresar monto"));
let contador = 0;
let cargaTotal = 0;

while (carga !== 0) {

    let monto = parseFloat(carga);

    switch (monto) {
        case 1000:
            alert("Se cargaron $1000");
            contador++;
            cargaTotal += 1000;
            break;
        case 2000:
            alert("Se cargaron $2000");
            contador++;
            cargaTotal += 2000;;
            break;

        case 3000:
            alert("Se cargaron $3000");
            cargaTotal += 3000;
            contador++;
            break;
        case 5000:
            alert("Se cargaron $5000");
            cargaTotal += 5000;
            contador++;
            break;

        default:
            alert("No podemos cargar ese monto");
            break;
    }

    carga = prompt("Ingresar monto");

    if (contador === 3) {
        alert("Ha alcanzado el límite de cargas");
        break;
    }
}

alert(`Su carga total es de: $ ${cargaTotal}`);

