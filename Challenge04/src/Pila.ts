// Clase genérica para implementar una Pila (Stack)
export class Pila<T> {
  private elementos: T[] = [];

  // Agregar un elemento al tope de la pila
  apilar(elemento: T): void {
    this.elementos.push(elemento);
  }

  // Remover y retornar el elemento del tope
  desapilar(): T | undefined {
    return this.elementos.pop();
  }

  // Obtener el elemento del tope sin removerlo
  cima(): T | undefined {
    return this.elementos[this.elementos.length - 1];
  }

  // Verificar si la pila está vacía
  estaVacia(): boolean {
    return this.elementos.length === 0;
  }

  // Obtener el tamaño de la pila
  tamaño(): number {
    return this.elementos.length;
  }

  // Obtener todos los elementos
  obtenerElementos(): T[] {
    return [...this.elementos];
  }

  // Vaciar la pila
  vaciar(): void {
    this.elementos = [];
  }
}
