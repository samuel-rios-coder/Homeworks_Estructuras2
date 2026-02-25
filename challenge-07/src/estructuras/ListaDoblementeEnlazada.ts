// Nodo para la lista doblemente enlazada
export class NodoPagina {
  pagina: string;
  siguiente: NodoPagina | null = null;
  anterior: NodoPagina | null = null;

  constructor(pagina: string) {
    this.pagina = pagina;
  }
}

// Lista doblemente enlazada para el historial de páginas
export class ListaDoblementeEnlazada {
  private inicio: NodoPagina | null = null;
  private actual: NodoPagina | null = null;

  // Agregar una página al historial
  agregar(pagina: string): void {
    const nuevoNodo = new NodoPagina(pagina);

    if (this.inicio === null) {
      this.inicio = nuevoNodo;
      this.actual = nuevoNodo;
    } else {
      let nodo = this.inicio;
      while (nodo.siguiente !== null) {
        nodo = nodo.siguiente;
      }
      nodo.siguiente = nuevoNodo;
      nuevoNodo.anterior = nodo;
      this.actual = nuevoNodo;
    }
  }

  // Obtener la página actual
  obtenerActual(): string {
    return this.actual?.pagina || '';
  }

  // Ir a la página anterior (atrás)
  irAtras(): boolean {
    if (this.actual?.anterior) {
      this.actual = this.actual.anterior;
      return true;
    }
    return false;
  }

  // Ir a la página siguiente (adelante)
  irAdelante(): boolean {
    if (this.actual?.siguiente) {
      this.actual = this.actual.siguiente;
      return true;
    }
    return false;
  }

  // Verificar si hay página anterior
  hayAtras(): boolean {
    return this.actual?.anterior !== null;
  }

  // Verificar si hay página siguiente
  hayAdelante(): boolean {
    return this.actual?.siguiente !== null;
  }

  // Obtener todo el historial
  obtenerHistorial(): string[] {
    const historial: string[] = [];
    let nodo = this.inicio;
    while (nodo !== null) {
      historial.push(nodo.pagina);
      nodo = nodo.siguiente;
    }
    return historial;
  }

  // Limpiar el historial
  limpiar(): void {
    this.inicio = null;
    this.actual = null;
  }
}
