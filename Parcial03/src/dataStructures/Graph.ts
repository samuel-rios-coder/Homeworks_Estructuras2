// Grafo no dirigido con lista de adyacencia
// cada canción guarda un Set con los IDs de sus vecinas

import type { Song } from './Trie';

export class Grafo {
  private adyacencia = new Map<string, Set<string>>();
  private canciones  = new Map<string, Song>();

  agregarCancion(song: Song): void {
    if (!this.adyacencia.has(song.id)) {
      this.adyacencia.set(song.id, new Set());
      this.canciones.set(song.id, song);
    }
  }

  // agrega la arista en ambas direcciones para mantener la relación bidireccional
  conectar(id1: string, id2: string): void {
    this.adyacencia.get(id1)?.add(id2);
    this.adyacencia.get(id2)?.add(id1);
  }

  // retorna los IDs de los vecinos directos del nodo dado
  relacionados(id: string): string[] {
    return Array.from(this.adyacencia.get(id) ?? []);
  }

  cantidadConexiones(id: string): number {
    return this.adyacencia.get(id)?.size ?? 0;
  }
}
