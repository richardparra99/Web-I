const estudiantes = [
    { nombre: "Kellie Shaw", practicos: 60, parcial1: 20, parcial2: 45, proyectoFinal: 40, examenFinal: 60 },
    { nombre: "Gary Brock", practicos: 76, parcial1: 34, parcial2: 44, proyectoFinal: 67, examenFinal: 27 },
    { nombre: "Brittany Krueger", practicos: 88, parcial1: 24, parcial2: 77, proyectoFinal: 71, examenFinal: 26 },
    { nombre: "Denise Hicks", practicos: 38, parcial1: 93, parcial2: 15, proyectoFinal: 34, examenFinal: 26 },
    { nombre: "Shannon Schmitt", practicos: 93, parcial1: 54, parcial2: 44, proyectoFinal: 51, examenFinal: 28 },
    { nombre: "Cassandra Evans", practicos: 69, parcial1: 45, parcial2: 69, proyectoFinal: 54, examenFinal: 24 },
    { nombre: "Holly Padilla", practicos: 52, parcial1: 13, parcial2: 100, proyectoFinal: 69, examenFinal: 76 },
    { nombre: "Michele Davis", practicos: 100, parcial1: 11, parcial2: 34, proyectoFinal: 11, examenFinal: 5 },
    { nombre: "Raymond Farrell", practicos: 1, parcial1: 27, parcial2: 71, proyectoFinal: 26, examenFinal: 40 },
    { nombre: "Corey Wolf", practicos: 55, parcial1: 42, parcial2: 42, proyectoFinal: 21, examenFinal: 2 }
  ];

// Función para calcular el promedio ponderado de cada estudiante
function calcularPromedios(estudiantes) {
    return estudiantes.map(estudiante => {
      const { nombre, practicos, parcial1, parcial2, proyectoFinal, examenFinal } = estudiante;
      
      // Cálculo del promedio ponderado
      const promedio = 
        (practicos * 0.10) +  
        (parcial1 * 0.10) +   
        (parcial2 * 0.15) +   
        (proyectoFinal * 0.40) + 
        (examenFinal * 0.25);
  
      return { nombre, promedio: promedio.toFixed(2) };
    });
  }
  
  // Filtrar estudiantes aprobados
  function mostrarAprobados(estudiantes) {
    const promedios = calcularPromedios(estudiantes);
    const aprobados = promedios.filter(estudiante => estudiante.promedio >= 51);
    
    console.log("Estudiantes Aprobados:");
    aprobados.forEach(estudiante => console.log(estudiante.nombre, "con un promedio de:", estudiante.promedio));
  }
  // Llamar a las funciones
  mostrarAprobados(estudiantes);