import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useAuth } from './auth-context'
import { registeredUsers } from './mockUsers'
import {
  addChildToFolder,
  countByType,
  countNodes,
  createNode,
  findNodeById,
  loadTreeFromStorage,
  resetTreeStorage,
  saveTreeToStorage,
} from './tree'
import type { NodeType, TreeNode } from './types'

interface TreeItemProps {
  node: TreeNode
  selectedId: string
  onSelect: (id: string) => void
}

function TreeItem({ node, selectedId, onSelect }: TreeItemProps) {
  const isSelected = node.id === selectedId

  return (
    <li className="tree-item">
      <button
        type="button"
        className={`tree-node ${isSelected ? 'selected' : ''}`}
        onClick={() => onSelect(node.id)}
      >
        <span className="tree-node__icon" aria-hidden="true">
          {node.tipo === 'carpeta' ? '[C]' : '[A]'}
        </span>
        <span>
          {node.nombre}
          <small>{node.tipo}</small>
        </span>
      </button>

      {node.hijos.length > 0 && (
        <ul className="tree-children">
          {node.hijos.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function App() {
  const { user, login, logout, isRegisteredEmail } = useAuth()
  const [tree, setTree] = useState<TreeNode>(() => loadTreeFromStorage())
  const [selectedId, setSelectedId] = useState<string>(tree.id)
  const [correo, setCorreo] = useState('ana@gmail.com')
  const [clave, setClave] = useState('123456')
  const [nombreNodo, setNombreNodo] = useState('')
  const [tipoNodo, setTipoNodo] = useState<NodeType>('carpeta')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    saveTreeToStorage(tree)
  }, [tree])

  const selectedNode = useMemo(
    () => findNodeById(tree, selectedId) ?? tree,
    [selectedId, tree],
  )

  const totalCarpetas = useMemo(
    () => Math.max(countByType(tree, 'carpeta') - 1, 0),
    [tree],
  )
  const totalArchivos = useMemo(() => countByType(tree, 'archivo'), [tree])
  const totalElementos = useMemo(() => countNodes(tree) - 1, [tree])

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = login(correo, clave)
    setMensaje(result.mensaje)
  }

  const handleCreateNode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanName = nombreNodo.trim()

    if (!user) {
      setMensaje('Debes iniciar sesion para crear carpetas o archivos.')
      return
    }

    if (!isRegisteredEmail(user.correo)) {
      setMensaje('El usuario autenticado no esta registrado para crear elementos.')
      return
    }

    if (!cleanName) {
      setMensaje('Escribe un nombre valido para el nuevo elemento.')
      return
    }

    if (selectedNode.tipo === 'archivo') {
      setMensaje('Selecciona una carpeta porque un archivo no puede tener hijos.')
      return
    }

    const duplicated = selectedNode.hijos.some(
      (child) => child.nombre.toLowerCase() === cleanName.toLowerCase(),
    )

    if (duplicated) {
      setMensaje('Ya existe un elemento con ese nombre en la carpeta seleccionada.')
      return
    }

    try {
      const newNode = createNode(cleanName, tipoNodo, user.correo)
      const updatedTree = addChildToFolder(tree, selectedNode.id, newNode)

      setTree(updatedTree)
      setNombreNodo('')
      setMensaje(
        `${tipoNodo === 'carpeta' ? 'Carpeta' : 'Archivo'} creado por ${user.correo}.`,
      )
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : 'Ocurrio un error al crear el elemento.',
      )
    }
  }

  const handleResetTree = () => {
    const newTree = resetTreeStorage()
    setTree(newTree)
    setSelectedId(newTree.id)
    setMensaje('El arbol fue reiniciado.')
  }

  return (
    <main className="layout">
      <section className="hero-panel">
        <h1>Sistema de carpetas y archivos</h1>
        <p>Parcial 2</p>
      </section>

      <section className="content-grid">
        <section className="panel">
          <div className="panel-header">
            <h2>Autenticacion</h2>
            {user && (
              <button type="button" className="secondary-button" onClick={logout}>
                Cerrar sesion
              </button>
            )}
          </div>

          {user ? (
            <div className="user-box">
              <p>
                <strong>Usuario:</strong> {user.nombre}
              </p>
              <p>
                <strong>Correo:</strong> {user.correo}
              </p>
              <p>Este correo se guarda como creador del elemento.</p>
            </div>
          ) : (
            <form className="form-card" onSubmit={handleLogin}>
              <label>
                Correo
                <input
                  type="email"
                  value={correo}
                  onChange={(event) => setCorreo(event.target.value)}
                />
              </label>

              <label>
                Clave
                <input
                  type="password"
                  value={clave}
                  onChange={(event) => setClave(event.target.value)}
                />
              </label>

              <button type="submit" className="primary-button">
                Iniciar sesion
              </button>

              <div className="helper-box">
                <strong>Usuarios de prueba</strong>
                <ul>
                  {registeredUsers.map((registeredUser) => (
                    <li key={registeredUser.correo}>
                      {registeredUser.correo} / {registeredUser.clave}
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          )}
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Crear elemento</h2>
            <span>Carpeta actual: {selectedNode.nombre}</span>
          </div>

          <form className="form-card" onSubmit={handleCreateNode}>
            <label>
              Nombre
              <input
                type="text"
                value={nombreNodo}
                onChange={(event) => setNombreNodo(event.target.value)}
              />
            </label>

            <label>
              Tipo
              <select
                value={tipoNodo}
                onChange={(event) => setTipoNodo(event.target.value as NodeType)}
              >
                <option value="carpeta">Carpeta</option>
                <option value="archivo">Archivo</option>
              </select>
            </label>

            <button type="submit" className="primary-button">
              Guardar
            </button>
          </form>

          {mensaje && (
            <div className="status-box" role="status">
              {mensaje}
            </div>
          )}
        </section>
      </section>

      <section className="summary-grid">
        <div className="summary-card">
          <strong>{totalCarpetas}</strong>
          <span>Carpetas</span>
        </div>
        <div className="summary-card">
          <strong>{totalArchivos}</strong>
          <span>Archivos</span>
        </div>
        <div className="summary-card">
          <strong>{totalElementos}</strong>
          <span>Total</span>
        </div>
      </section>

      <section className="workspace-grid">
        <section className="panel">
          <div className="panel-header">
            <h2>Arbol visual</h2>
            <button type="button" className="secondary-button" onClick={handleResetTree}>
              Reiniciar arbol
            </button>
          </div>

          <ul className="tree-root">
            <TreeItem node={tree} selectedId={selectedId} onSelect={setSelectedId} />
          </ul>
        </section>

        <section className="panel details-panel">
          <h2>Detalle del nodo</h2>

          <dl className="details-list">
            <div>
              <dt>Nombre</dt>
              <dd>{selectedNode.nombre}</dd>
            </div>
            <div>
              <dt>Tipo</dt>
              <dd>{selectedNode.tipo}</dd>
            </div>
            <div>
              <dt>Creador</dt>
              <dd>{selectedNode.creadorCorreo}</dd>
            </div>
            <div>
              <dt>Fecha</dt>
              <dd>{new Date(selectedNode.fechaCreacion).toLocaleString('es-CO')}</dd>
            </div>
            <div>
              <dt>Hijos</dt>
              <dd>{selectedNode.hijos.length}</dd>
            </div>
          </dl>
        </section>
      </section>
    </main>
  )
}

export default App
