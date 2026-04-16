export type NodeType = 'carpeta' | 'archivo'

export interface TreeNode {
  id: string
  nombre: string
  tipo: NodeType
  creadorCorreo: string
  fechaCreacion: string
  hijos: TreeNode[]
}

export interface AuthUser {
  nombre: string
  correo: string
}

export interface RegisteredUser extends AuthUser {
  clave: string
}
