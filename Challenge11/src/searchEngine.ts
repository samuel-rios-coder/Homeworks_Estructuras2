export interface Product {
  name: string;
  popularity: number;
}

// ── Trie ──────────────────────────────────────────────────────────────────────

interface TrieNode {
  children: { [char: string]: TrieNode };
  product: Product | null;
}

function createNode(): TrieNode {
  return { children: {}, product: null };
}

function collectProducts(node: TrieNode, results: Product[]): void {
  if (node.product) results.push(node.product);
  for (const child of Object.values(node.children)) {
    collectProducts(child, results);
  }
}

class Trie {
  root: TrieNode = createNode();

  insert(name: string, popularity: number): void {
    let current = this.root;

    for (const char of name.toLowerCase()) {
      if (!current.children[char]) {
        current.children[char] = createNode();
      }
      current = current.children[char];
    }

    current.product = { name, popularity };
  }

  search(prefix: string): Product[] {
    let current = this.root;

    for (const char of prefix.toLowerCase()) {
      if (!current.children[char]) return [];
      current = current.children[char];
    }

    const results: Product[] = [];
    collectProducts(current, results);
    return results;
  }

  all(): Product[] {
    const results: Product[] = [];
    collectProducts(this.root, results);
    return results;
  }
}

// ── MaxHeap ───────────────────────────────────────────────────────────────────

class MaxHeap {
  private data: Product[] = [];

  insert(product: Product): void {
    this.data.push(product);
    this.bubbleUp(this.data.length - 1);
  }

  extractMax(): Product | undefined {
    if (this.data.length === 0) return undefined;
    if (this.data.length === 1) return this.data.pop();

    const max = this.data[0];
    this.data[0] = this.data.pop()!;
    this.bubbleDown(0);
    return max;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.data[parent].popularity >= this.data[i].popularity) break;
      [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
      i = parent;
    }
  }

  private bubbleDown(i: number): void {
    const n = this.data.length;
    while (true) {
      let largest = i;
      const left  = 2 * i + 1;
      const right = 2 * i + 2;

      if (left  < n && this.data[left].popularity  > this.data[largest].popularity) largest = left;
      if (right < n && this.data[right].popularity > this.data[largest].popularity) largest = right;

      if (largest === i) break;
      [this.data[largest], this.data[i]] = [this.data[i], this.data[largest]];
      i = largest;
    }
  }

  get size() { return this.data.length; }
}

// ── Search Engine ─────────────────────────────────────────────────────────────

export class SearchEngine {
  private trie = new Trie();

  insert(name: string, popularity: number): void {
    this.trie.insert(name, popularity);
  }

  searchTopK(prefix: string, k: number): Product[] {
    const matches = this.trie.search(prefix);

    const heap = new MaxHeap();
    for (const product of matches) {
      heap.insert(product);
    }

    const topK: Product[] = [];
    for (let i = 0; i < k && heap.size > 0; i++) {
      topK.push(heap.extractMax()!);
    }
    return topK;
  }

  all(): Product[] {
    return this.trie.all().sort((a, b) => b.popularity - a.popularity);
  }
}
