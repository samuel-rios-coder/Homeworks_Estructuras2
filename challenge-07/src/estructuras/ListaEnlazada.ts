// Nodo para la lista enlazada simple
export class NodoCancion {
  cancion: string;
  siguiente: NodoCancion | null = null;

  constructor(cancion: string) {
    this.cancion = cancion;
  }
}

// Lista enlazada simple para las canciones
export class ListaEnlazada {
  private inicio: NodoCancion | null = null;
  private actual: NodoCancion | null = null;

  // Agregar una canción al final de la lista
  agregar(cancion: string): void {
    const nuevoNodo = new NodoCancion(cancion);

    if (this.inicio === null) {
      this.inicio = nuevoNodo;
      this.actual = nuevoNodo;
    } else {
      let nodo = this.inicio;
      while (nodo.siguiente !== null) {
        nodo = nodo.siguiente;
      }
      nodo.siguiente = nuevoNodo;
    }
  }

  // Obtener la canción actual
  obtenerActual(): string {
    return this.actual?.cancion || '';
  }

  // Ir a la siguiente canción
  siguiente(): boolean {
    if (this.actual?.siguiente) {
      this.actual = this.actual.siguiente;
      return true;
    }
    return false;
  }

  // Ir a la primera canción
  irAlInicio(): void {
    this.actual = this.inicio;
  }

  // Obtener todas las canciones
  obtenerTodas(): string[] {
    const canciones: string[] = [];
    let nodo = this.inicio;
    while (nodo !== null) {
      canciones.push(nodo.cancion);
      nodo = nodo.siguiente;
    }
    return canciones;
  }

  // Verificar si hay más canciones
  hayMas(): boolean {
    return this.actual?.siguiente !== null;
  }

  // Limpiar la lista
  limpiar(): void {
    this.inicio = null;
    this.actual = null;
  }
}
