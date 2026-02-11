// Función regular
function verificarParImpar(numero) {
    if (numero % 2 === 0) {
      console.log(numero + " es par");
    } else {
      console.log(numero + " es impar");
    }
  }
  
  // Función flecha 
  const verificarParImparFlecha = (numero) => {
    if (numero % 2 === 0) {
      console.log(numero + " es par");
    } else {
      console.log(numero + " es impar");
    }
  };
  
  // Ejemplo de uso
  verificarParImpar(5);
  verificarParImparFlecha(12);
  