// Nodo para lista doblemente enlazada
class DoublyNode<T> {
  data: T;
  next: DoublyNode<T> | null = null;
  prev: DoublyNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

// Lista doblemente enlazada - para registrar historial de alquileres
export class DoublyLinkedList<T> {
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  private size: number = 0;

  // Agregar un elemento al final
  add(data: T): void {
    const newNode = new DoublyNode(data);
    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Agregar al principio
  addFirst(data: T): void {
    const newNode = new DoublyNode(data);
    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  // Eliminar un elemento
  remove(data: T): boolean {
    if (this.head === null) return false;

    let current: DoublyNode<T> | null = this.head;
    while (current !== null) {
      if (current.data === data) {
        if (current.prev !== null) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }

        if (current.next !== null) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }

        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Obtener todos los elementos en orden
  getAll(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  // Obtener todos en orden inverso
  getAllReverse(): T[] {
    const result: T[] = [];
    let current = this.tail;
    while (current !== null) {
      result.push(current.data);
      current = current.prev;
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
    this.tail = null;
    this.size = 0;
  }
}
