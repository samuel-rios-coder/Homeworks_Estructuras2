// Nodo para lista simplemente enlazada
class Node<T> {
  data: T;
  next: Node<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

// Lista simplemente enlazada - para gestionar vehículos disponibles
export class SinglyLinkedList<T> {
  private head: Node<T> | null = null;
  private size: number = 0;

  // Agregar un elemento al final
  add(data: T): void {
    const newNode = new Node(data);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Insertar al principio
  addFirst(data: T): void {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Eliminar un elemento
  remove(data: T): boolean {
    if (this.head === null) return false;

    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next !== null) {
      if (current.next.data === data) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Obtener todos los elementos
  getAll(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  // Obtener el primer elemento
  getFirst(): T | null {
    return this.head?.data ?? null;
  }

  // Obtener tamaño
  getSize(): number {
    return this.size;
  }

  // Limpiar la lista
  clear(): void {
    this.head = null;
    this.size = 0;
  }
}
