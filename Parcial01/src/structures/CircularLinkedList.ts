// Nodo para lista circular enlazada
class CircularNode<T> {
  data: T;
  next: CircularNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

// Lista circular enlazada - para rotar vehículos destacados
export class CircularLinkedList<T> {
  private head: CircularNode<T> | null = null;
  private size: number = 0;
  private current: CircularNode<T> | null = null;

  // Agregar un elemento
  add(data: T): void {
    const newNode = new CircularNode(data);
    if (this.head === null) {
      this.head = newNode;
      newNode.next = newNode;
      this.current = this.head;
    } else {
      let temp = this.head;
      while (temp.next !== this.head) {
        temp = temp.next!;
      }
      temp.next = newNode;
      newNode.next = this.head;
    }
    this.size++;
  }

  // Eliminar un elemento
  remove(data: T): boolean {
    if (this.head === null) return false;

    if (this.head.data === data) {
      if (this.size === 1) {
        this.head = null;
        this.current = null;
      } else {
        let temp = this.head;
        while (temp.next !== this.head) {
          temp = temp.next!;
        }
        temp.next = this.head.next;
        this.head = this.head.next;
        if (this.current === temp.next) {
          this.current = this.head;
        }
      }
      this.size--;
      return true;
    }

    let current = this.head;
    for (let i = 0; i < this.size - 1; i++) {
      if (current.next!.data === data) {
        current.next = current.next!.next;
        if (this.current === current.next) {
          this.current = this.head;
        }
        this.size--;
        return true;
      }
      current = current.next!;
    }
    return false;
  }

  // Avanzar al siguiente elemento
  next(): T | null {
    if (this.current === null) return null;
    this.current = this.current.next;
    return this.current?.data ?? null;
  }

  // Obtener elemento actual
  getCurrent(): T | null {
    return this.current?.data ?? null;
  }

  // Reiniciar al principio
  reset(): void {
    this.current = this.head;
  }

  // Obtener todos los elementos
  getAll(): T[] {
    if (this.head === null) return [];
    const result: T[] = [];
    let temp = this.head;
    for (let i = 0; i < this.size; i++) {
      result.push(temp.data);
      temp = temp.next!;
    }
    return result;
  }

  // Obtener tamaño
  getSize(): number {
    return this.size;
  }

  // Limpiar la lista
  clear(): void {
    this.head = null;
    this.current = null;
    this.size = 0;
  }

  // Verificar si está vacía
  isEmpty(): boolean {
    return this.size === 0;
  }
}
