// Trie: árbol donde cada nodo representa una letra
// permite buscar canciones por prefijo en O(m) donde m es la longitud del prefijo

export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  plays: number;
}

class Nodo {
  hijos = new Map<string, Nodo>();
  esFin = false;       // indica que aquí termina el título de una canción
  cancion?: Song;      // guarda la canción completa en el nodo final
}

export class Trie {
  private raiz = new Nodo();

  // recorre el título letra por letra y crea nodos donde no existen
  insertar(song: Song): void {
    let nodo = this.raiz;
    for (const letra of song.title.toLowerCase()) {
      if (!nodo.hijos.has(letra)) {
        nodo.hijos.set(letra, new Nodo());
      }
      nodo = nodo.hijos.get(letra)!;
    }
    nodo.esFin = true;
    nodo.cancion = song;
  }

  // devuelve la canción solo si el título coincide exactamente hasta el nodo final
  buscar(titulo: string): Song | null {
    let nodo = this.raiz;
    for (const letra of titulo.toLowerCase()) {
      if (!nodo.hijos.has(letra)) return null;
      nodo = nodo.hijos.get(letra)!;
    }
    return nodo.esFin ? nodo.cancion! : null;
  }

  // llega al nodo del prefijo y luego recolecta todas las canciones en esa rama
  sugerencias(prefijo: string): Song[] {
    if (!prefijo.trim()) return [];
    let nodo = this.raiz;
    for (const letra of prefijo.toLowerCase()) {
      if (!nodo.hijos.has(letra)) return [];
      nodo = nodo.hijos.get(letra)!;
    }
    const resultados: Song[] = [];
    this.recolectar(nodo, resultados);
    return resultados.slice(0, 6);
  }

  // desciende recursivamente por todos los hijos juntando canciones completas
  private recolectar(nodo: Nodo, lista: Song[]): void {
    if (nodo.esFin && nodo.cancion) lista.push(nodo.cancion);
    for (const hijo of nodo.hijos.values()) {
      this.recolectar(hijo, lista);
    }
  }
}
