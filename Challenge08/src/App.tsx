import { useEffect, useState } from 'react'
import Tree from 'react-d3-tree'
import './App.css'
import {
  bst,
  inorderValues,
  numbers,
  postorderValues,
  preorderValues,
  treeToD3Data,
} from './tree'

const treeData = treeToD3Data(bst.toObject())

function App() {
  const [searchValue, setSearchValue] = useState('25')
  const [treeWidth, setTreeWidth] = useState(900)

  useEffect(() => {
    const updateTreeWidth = () => {
      const width = window.innerWidth < 960 ? window.innerWidth - 48 : 900
      setTreeWidth(Math.max(width, 280))
    }

    updateTreeWidth()
    window.addEventListener('resize', updateTreeWidth)

    return () => window.removeEventListener('resize', updateTreeWidth)
  }, [])

  const parsedValue = Number(searchValue)
  const hasValidNumber = searchValue.trim() !== '' && !Number.isNaN(parsedValue)
  const exists = hasValidNumber ? bst.contains(parsedValue) : false

  return (
    <main className="page">
      <section className="section">
        <h1>Arbol binario de busqueda</h1>
      </section>

      <section className="section">
        <h2>Numeros insertados</h2>
        <p>{numbers.join(', ')}</p>
      </section>

      <section className="section">
        <h2>Recorridos</h2>
        <p><strong>Inorder:</strong> {inorderValues.join(' - ')}</p>
        <p><strong>Postorder:</strong> {postorderValues.join(' - ')}</p>
        <p><strong>Preorder:</strong> {preorderValues.join(' - ')}</p>
      </section>

      <section className="section">
        <h2>Buscar un valor</h2>
        <input
          className="search-input"
          type="number"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Escribe un numero"
        />

        {!hasValidNumber && <p className="search-result">Ingresa un numero valido.</p>}
        {hasValidNumber && (
          <p className={`search-result ${exists ? 'found' : 'not-found'}`}>
            {exists
              ? `${parsedValue} si esta dentro del arbol.`
              : `${parsedValue} no esta dentro del arbol.`}
          </p>
        )}
      </section>

      <section className="tree-card">
        <h2>Arbol visual</h2>
        <div
          className="tree-wrapper"
          style={{ width: `${treeWidth}px`, height: '420px' }}
        >
          <Tree
            data={treeData}
            orientation="vertical"
            pathFunc="step"
            translate={{ x: treeWidth / 2, y: 70 }}
            separation={{ siblings: 1.5, nonSiblings: 1.8 }}
            zoomable
            collapsible={false}
            rootNodeClassName="tree-node-root"
            branchNodeClassName="tree-node-branch"
            leafNodeClassName="tree-node-leaf"
          />
        </div>
      </section>
    </main>
  )
}

export default App
