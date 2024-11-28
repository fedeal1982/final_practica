const formGasto = document.getElementById('form-gasto');
const formIngreso = document.getElementById('form-ingreso');
const tablaGastos = document.querySelector('#tabla-gastos tbody');
const tablaIngresos = document.querySelector('#tabla-ingresos tbody');
const totalGastoEl = document.getElementById('total-gasto');
const totalIngresoEl = document.getElementById('total-ingreso');
const balanceEl = document.getElementById('balance');

let totalGasto = 0;
let totalIngreso = 0;

function actualizarTotales() {
    totalGastoEl.textContent = totalGasto.toFixed(2);
    totalIngresoEl.textContent = totalIngreso.toFixed(2);
    balanceEl.textContent = (totalIngreso - totalGasto).toFixed(2);
}

function agregarFila(tabla, descripcion, monto, esGasto) {
    const fila = document.createElement('tr');

    // Crear celdas
    const celdaDescripcion = document.createElement('td');
    celdaDescripcion.textContent = descripcion;

    const celdaMonto = document.createElement('td');
    celdaMonto.textContent = `$${monto.toFixed(2)}`;

    const celdaAccion = document.createElement('td');
    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.classList.add('btn-eliminar');
    botonEliminar.addEventListener('click', () => {
        // Restar el monto del total y actualizar
        if (esGasto) {
            totalGasto -= monto;
        } else {
            totalIngreso -= monto;
        }
        fila.remove();
        actualizarTotales();
    });

    // Agregar el botón a la celda de acción
    celdaAccion.appendChild(botonEliminar);

    // Agregar celdas a la fila
    fila.appendChild(celdaDescripcion);
    fila.appendChild(celdaMonto);
    fila.appendChild(celdaAccion);

    // Agregar la fila a la tabla
    tabla.appendChild(fila);
}

formGasto.addEventListener('submit', (e) => {
    e.preventDefault();

    const descripcion = document.getElementById('descripcion-gasto').value.trim();
    const monto = parseFloat(document.getElementById('monto-gasto').value);

    if (descripcion && monto > 0) {
        agregarFila(tablaGastos, descripcion, monto, true);
        totalGasto += monto;
        actualizarTotales();

        // Limpiar el formulario
        formGasto.reset();
    } else {
        alert('Por favor, ingrese una descripción válida y un monto mayor a 0.');
    }
});

formIngreso.addEventListener('submit', (e) => {
    e.preventDefault();

    const descripcion = document.getElementById('descripcion-ingreso').value.trim();
    const monto = parseFloat(document.getElementById('monto-ingreso').value);

    if (descripcion && monto > 0) {
        agregarFila(tablaIngresos, descripcion, monto, false);
        totalIngreso += monto;
        actualizarTotales();

        // Limpiar el formulario
        formIngreso.reset();
    } else {
        alert('Por favor, ingrese una descripción válida y un monto mayor a 0.');
    }
});

