// Max Heap implementado sobre un array
// el elemento con más reproducciones siempre queda en la posición 0

import type { Song } from './Trie';

export class MaxHeap {
  private heap: Song[] = [];

  insertar(song: Song): void {
    this.heap.push(song);
    this.subir(this.heap.length - 1);
  }

  // compara el nodo con su padre y sube mientras tenga más plays
  private subir(i: number): void {
    while (i > 0) {
      const padre = Math.floor((i - 1) / 2);
      if (this.heap[padre].plays >= this.heap[i].plays) break;
      [this.heap[padre], this.heap[i]] = [this.heap[i], this.heap[padre]];
      i = padre;
    }
  }

  // devuelve el top N sin modificar el heap original, trabaja sobre una copia
  top(n: number): Song[] {
    const copia = [...this.heap];
    const resultado: Song[] = [];

    for (let k = 0; k < n && copia.length > 0; k++) {
      resultado.push(copia[0]);
      const ultimo = copia.pop()!;
      if (copia.length === 0) break;

      // mueve el último elemento a la raíz y lo baja hasta su posición correcta
      copia[0] = ultimo;
      let i = 0;
      while (true) {
        let mayor = i;
        const izq = 2 * i + 1;
        const der = 2 * i + 2;
        if (izq < copia.length && copia[izq].plays > copia[mayor].plays) mayor = izq;
        if (der < copia.length && copia[der].plays > copia[mayor].plays) mayor = der;
        if (mayor === i) break;
        [copia[i], copia[mayor]] = [copia[mayor], copia[i]];
        i = mayor;
      }
    }
    return resultado;
  }

  tamaño(): number {
    return this.heap.length;
  }
}
