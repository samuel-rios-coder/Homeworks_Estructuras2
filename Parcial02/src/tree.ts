import type { NodeType, TreeNode } from './types'

const STORAGE_KEY = 'parcial02-tree-db'

const createId = () => crypto.randomUUID()

export const createRootTree = (): TreeNode => ({
  id: createId(),
  nombre: 'Mi unidad',
  tipo: 'carpeta',
  creadorCorreo: 'sistema@gmail.com',
  fechaCreacion: new Date().toISOString(),
  hijos: [],
})

export const createNode = (
  nombre: string,
  tipo: NodeType,
  creadorCorreo: string,
): TreeNode => ({
  id: createId(),
  nombre,
  tipo,
  creadorCorreo,
  fechaCreacion: new Date().toISOString(),
  hijos: tipo === 'carpeta' ? [] : [],
})

export const loadTreeFromStorage = (): TreeNode => {
  const rawTree = localStorage.getItem(STORAGE_KEY)

  if (!rawTree) {
    const tree = createRootTree()
    saveTreeToStorage(tree)
    return tree
  }

  return JSON.parse(rawTree) as TreeNode
}

export const saveTreeToStorage = (tree: TreeNode) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tree))
}

export const resetTreeStorage = (): TreeNode => {
  const newTree = createRootTree()
  saveTreeToStorage(newTree)
  return newTree
}

export const findNodeById = (
  node: TreeNode,
  id: string,
): TreeNode | undefined => {
  if (node.id === id) {
    return node
  }

  for (const child of node.hijos) {
    const found = findNodeById(child, id)
    if (found) {
      return found
    }
  }

  return undefined
}

export const addChildToFolder = (
  node: TreeNode,
  parentId: string,
  newChild: TreeNode,
): TreeNode => {
  if (node.id === parentId) {
    if (node.tipo === 'archivo') {
      throw new Error('No se pueden agregar hijos a un archivo.')
    }

    return {
      ...node,
      hijos: [...node.hijos, newChild],
    }
  }

  return {
    ...node,
    hijos: node.hijos.map((child) => addChildToFolder(child, parentId, newChild)),
  }
}

export const countNodes = (node: TreeNode): number =>
  1 + node.hijos.reduce((total, child) => total + countNodes(child), 0)

export const countByType = (node: TreeNode, tipo: NodeType): number => {
  const current = node.tipo === tipo ? 1 : 0
  return current + node.hijos.reduce((total, child) => total + countByType(child, tipo), 0)
}
