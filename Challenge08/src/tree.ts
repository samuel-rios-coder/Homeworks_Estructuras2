export type TreeNodeData = {
  value: number
  left: TreeNodeData | null
  right: TreeNodeData | null
}

type D3TreeNode = {
  name: string
  attributes?: {
    side?: string
  }
  children?: D3TreeNode[]
}

class TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export class BinarySearchTree {
  root: TreeNode | null

  constructor() {
    this.root = null
  }

  insert(value: number) {
    const newNode = new TreeNode(value)

    if (!this.root) {
      this.root = newNode
      return
    }

    let current = this.root

    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode
          return
        }

        current = current.left
      } else {
        if (!current.right) {
          current.right = newNode
          return
        }

        current = current.right
      }
    }
  }

  contains(value: number) {
    let current = this.root

    while (current) {
      if (value === current.value) {
        return true
      }

      current = value < current.value ? current.left : current.right
    }

    return false
  }

  inorder() {
    const values: number[] = []

    const traverse = (node: TreeNode | null) => {
      if (!node) {
        return
      }

      traverse(node.left)
      values.push(node.value)
      traverse(node.right)
    }

    traverse(this.root)
    return values
  }

  preorder() {
    const values: number[] = []

    const traverse = (node: TreeNode | null) => {
      if (!node) {
        return
      }

      values.push(node.value)
      traverse(node.left)
      traverse(node.right)
    }

    traverse(this.root)
    return values
  }

  postorder() {
    const values: number[] = []

    const traverse = (node: TreeNode | null) => {
      if (!node) {
        return
      }

      traverse(node.left)
      traverse(node.right)
      values.push(node.value)
    }

    traverse(this.root)
    return values
  }

  toObject(): TreeNodeData | null {
    const convert = (node: TreeNode | null): TreeNodeData | null => {
      if (!node) {
        return null
      }

      return {
        value: node.value,
        left: convert(node.left),
        right: convert(node.right),
      }
    }

    return convert(this.root)
  }
}

export const numbers = [40, 20, 60, 10, 30, 50, 70, 25, 35, 65]

export const bst = new BinarySearchTree()
numbers.forEach((value) => bst.insert(value))

export const inorderValues = bst.inorder()
export const preorderValues = bst.preorder()
export const postorderValues = bst.postorder()

console.log('Numeros insertados:', numbers)
console.log('Inorder:', inorderValues)
console.log('Postorder:', postorderValues)
console.log('Preorder:', preorderValues)

export const treeToD3Data = (node: TreeNodeData | null, side = 'raiz'): D3TreeNode => {
  if (!node) {
    return {
      name: 'vacio',
      attributes: { side },
    }
  }

  const children: D3TreeNode[] = []

  if (node.left) {
    children.push(treeToD3Data(node.left, 'izquierda'))
  }

  if (node.right) {
    children.push(treeToD3Data(node.right, 'derecha'))
  }

  return {
    name: String(node.value),
    attributes: { side },
    children: children.length > 0 ? children : undefined,
  }
}
