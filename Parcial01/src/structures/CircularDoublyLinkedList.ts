// Nodo para lista circular doblemente enlazada
class CircularDoublyNode<T> {
  data: T;
  next: CircularDoublyNode<T> | null = null;
  prev: CircularDoublyNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

// Lista circular doblemente enlazada - para administrar inversionistas activos
export class CircularDoublyLinkedList<T> {
  private head: CircularDoublyNode<T> | null = null;
  private size: number = 0;

  // Agregar un elemento
  add(data: T): void {
    const newNode = new CircularDoublyNode(data);
    if (this.head === null) {
      this.head = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      const tail = this.head.prev!;
      tail.next = newNode;
      newNode.prev = tail;
      newNode.next = this.head;
      this.head.prev = newNode;
    }
    this.size++;
  }

  // Insertar al principio
  addFirst(data: T): void {
    const newNode = new CircularDoublyNode(data);
    if (this.head === null) {
      this.head = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      const tail = this.head.prev!;
      tail.next = newNode;
      newNode.prev = tail;
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  // Eliminar un elemento
  remove(data: T): boolean {
    if (this.head === null) return false;

    if (this.size === 1 && this.head.data === data) {
      this.head = null;
      this.size = 0;
      return true;
    }

    let current = this.head;
    for (let i = 0; i < this.size; i++) {
      if (current.data === data) {
        if (current === this.head) {
          this.head = this.head.next;
        }
        const prevNode = current.prev!;
        const nextNode = current.next!;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        this.size--;
        return true;
      }
      current = current.next!;
    }
    return false;
  }

  // Obtener todos los elementos
  getAll(): T[] {
    if (this.head === null) return [];
    const result: T[] = [];
    let current = this.head;
    for (let i = 0; i < this.size; i++) {
      result.push(current.data);
      current = current.next!;
    }
    return result;
  }

  // Obtener en orden inverso
  getAllReverse(): T[] {
    if (this.head === null) return [];
    const result: T[] = [];
    let current = this.head.prev!;
    for (let i = 0; i < this.size; i++) {
      result.push(current.data);
      current = current.prev!;
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
    this.size = 0;
  }

  // Verificar si está vacía
  isEmpty(): boolean {
    return this.size === 0;
  }
}
