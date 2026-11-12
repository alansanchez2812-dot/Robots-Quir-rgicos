document.addEventListener('DOMContentLoaded', () => {
  const selectProcedimiento = document.getElementById('selectProcedimiento');
  const selectRed = document.getElementById('selectRed');
  const rangoDistancia = document.getElementById('rangoDistancia');
  const valorDistancia = document.getElementById('valorDistancia');
  const resultadoLatencia = document.getElementById('resultadoLatencia');
  const resultadoPrecision = document.getElementById('resultadoPrecision');
  const resultadoEstado = document.getElementById('resultadoEstado');
  const detalleProcedimiento = document.getElementById('detalleProcedimiento');

  if (
    !selectProcedimiento ||
    !selectRed ||
    !rangoDistancia ||
    !valorDistancia ||
    !resultadoLatencia ||
    !resultadoPrecision ||
    !resultadoEstado ||
    !detalleProcedimiento
  ) {
    return;
  }

  const perfilesQuirurgicos = {
    neuro: {
      basePrecision: 0.03,
      descripcion: 'Sincronización estereotáctica submilimétrica activa con predicción de trayectoria neural.'
    },
    cardio: {
      basePrecision: 0.05,
      descripcion: 'Compensación automática de movimiento cardíaco y respiratorio mediante visión IA.'
    },
    onco: {
      basePrecision: 0.04,
      descripcion: 'Delimitación de márgenes tumorales en tiempo real con retroalimentación háptica de tejido.'
    }
  };

  function actualizarSimulador() {
    const distanciaKm = Number(rangoDistancia.value);
    const tipoRed = selectRed.value;
    const procedimiento = perfilesQuirurgicos[selectProcedimiento.value] || perfilesQuirurgicos.neuro;

    valorDistancia.textContent = `${distanciaKm.toLocaleString('es-PA')} km`;

    let latenciaBase = 4.0;
    let factorDistancia = 0.01;

    if (tipoRed === 'fibra') {
      latenciaBase = 3.5;
      factorDistancia = 0.011;
    } else if (tipoRed === '5g') {
      latenciaBase = 11.0;
      factorDistancia = 0.014;
    } else if (tipoRed === 'satelite') {
      latenciaBase = 28.0;
      factorDistancia = 0.016;
    }

    const latenciaTotal = (latenciaBase + distanciaKm * factorDistancia).toFixed(1);
    const desviacionResidual = (procedimiento.basePrecision + Number(latenciaTotal) * 0.0004).toFixed(2);

    resultadoLatencia.textContent = `${latenciaTotal} ms`;
    resultadoPrecision.textContent = `${desviacionResidual} mm`;

    if (Number(latenciaTotal) <= 45) {
      resultadoEstado.textContent = 'ÓPTIMO / SEGURO';
      resultadoEstado.className = 'badge bg-success fs-6 mt-1';
    } else if (Number(latenciaTotal) <= 85) {
      resultadoEstado.textContent = 'COMPENSACIÓN IA ACTIVA';
      resultadoEstado.className = 'badge bg-warning text-dark fs-6 mt-1';
    } else {
      resultadoEstado.textContent = 'SOLO SUPERVISIÓN LOCAL';
      resultadoEstado.className = 'badge bg-danger fs-6 mt-1';
    }

    detalleProcedimiento.textContent = procedimiento.descripcion;
  }

  selectProcedimiento.addEventListener('change', actualizarSimulador);
  selectRed.addEventListener('change', actualizarSimulador);
  rangoDistancia.addEventListener('input', actualizarSimulador);

  actualizarSimulador();
});
