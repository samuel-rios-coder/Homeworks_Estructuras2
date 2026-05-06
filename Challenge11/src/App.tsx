import { useState, useRef } from 'react'
import { SearchEngine } from './searchEngine'
import type { Product } from './searchEngine'
import './App.css'

const engine = new SearchEngine()

const INITIAL_PRODUCTS = [
  { name: 'air max', popularity: 90 },
  { name: 'air force', popularity: 95 },
  { name: 'air jordan', popularity: 85 },
  { name: 'adidas boost', popularity: 80 },
]
INITIAL_PRODUCTS.forEach(p => engine.insert(p.name, p.popularity))

export default function App() {
  const [allProducts, setAllProducts] = useState<Product[]>(engine.all())
  const [results, setResults] = useState<Product[]>([])
  const [searched, setSearched] = useState(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const popularityRef = useRef<HTMLInputElement>(null)
  const prefixRef = useRef<HTMLInputElement>(null)
  const kRef = useRef<HTMLInputElement>(null)

  function handleInsert(e: React.FormEvent) {
    e.preventDefault()
    const name = nameRef.current!.value.trim()
    const pop = parseInt(popularityRef.current!.value)
    if (!name || isNaN(pop) || pop < 0 || pop > 100) return
    engine.insert(name, pop)
    setAllProducts(engine.all())
    nameRef.current!.value = ''
    popularityRef.current!.value = ''
    nameRef.current!.focus()
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const prefix = prefixRef.current!.value.trim()
    const k = parseInt(kRef.current!.value)
    if (!prefix || isNaN(k) || k < 1) return
    setResults(engine.searchTopK(prefix, k))
    setSearched(true)
  }

  return (
    <main>
      <header>
        <h1>Motor de Búsqueda Inteligente</h1>
      </header>

      <div className="panels">
        {/* INSERT */}
        <section className="panel">
          <h2>Insertar Producto</h2>
          <form onSubmit={handleInsert} className="form">
            <label>
              <span>Nombre del producto</span>
              <input ref={nameRef} type="text" placeholder="ej. air max" required />
            </label>
            <label>
              <span>Popularidad (0–100)</span>
              <input ref={popularityRef} type="number" min={0} max={100} placeholder="ej. 90" required />
            </label>
            <button type="submit">Insertar</button>
          </form>

          <div className="product-list">
            <h3>Todos los productos <span className="badge">{allProducts.length}</span></h3>
            {allProducts.length === 0
              ? <p className="empty">Aún no hay productos.</p>
              : <ul>
                {allProducts.map(p => (
                  <li key={p.name} className="product-item">
                    <span className="product-name">{p.name}</span>
                    <span className="popularity-bar">
                      <span className="bar-fill" style={{ width: `${p.popularity}%` }} />
                    </span>
                    <span className="popularity-value">{p.popularity}</span>
                  </li>
                ))}
              </ul>
            }
          </div>
        </section>

        {/* SEARCH */}
        <section className="panel">
          <h2>Buscar Top&#8209;K</h2>
          <form onSubmit={handleSearch} className="form">
            <label>
              <span>Prefijo</span>
              <input ref={prefixRef} type="text" placeholder='ej. "air"' required />
            </label>
            <label>
              <span>K (mejores resultados)</span>
              <input ref={kRef} type="number" min={1} defaultValue={2} required />
            </label>
            <button type="submit">Buscar</button>
          </form>

          {searched && (
            <div className="results">
              <h3>Resultados <span className="badge">{results.length}</span></h3>
              {results.length === 0
                ? <p className="empty">Ningún producto coincide con ese prefijo.</p>
                : <ol>
                  {results.map((p, i) => (
                    <li key={p.name} className="result-item">
                      <span className="rank">#{i + 1}</span>
                      <div className="result-info">
                        <span className="product-name">{p.name}</span>
                        <span className="popularity-bar">
                          <span className="bar-fill" style={{ width: `${p.popularity}%` }} />
                        </span>
                      </div>
                      <span className="popularity-value">{p.popularity}</span>
                    </li>
                  ))}
                </ol>
              }
            </div>
          )}

        </section>
      </div>
    </main>
  )
}
