import { useState } from 'react'
import type { Persona } from './tipos'
import { datosPrueba } from './datos'
import { formatearCOP, formatearHora, ordenarPorLlegada } from './utils'

let siguienteId = datosPrueba.length + 1

export default function App() {
  const [cola, setCola] = useState<Persona[]>(ordenarPorLlegada(datosPrueba))
  const [nombre, setNombre] = useState('')
  const [retiro, setRetiro] = useState('')
  const [error, setError] = useState('')

  function agregarPersona(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim()) { setError('Por favor ingresa un nombre.'); return }
    const monto = parseFloat(retiro)
    if (isNaN(monto) || monto <= 0) { setError('Ingresa un monto de retiro válido.'); return }

    const nuevaPersona: Persona = {
      id: siguienteId++,
      nombre: nombre.trim(),
      retiro: monto,
      horaLlegada: new Date(),
    }

    setCola(prev => ordenarPorLlegada([...prev, nuevaPersona]))
    setNombre('')
    setRetiro('')
    setError('')
  }

  return (
    <div className="container">
      <header>
        <h1>Cola del Cajero Automático</h1>
      </header>

      {/* Formulario */}
      <section className="form-section">
        <h2>Agregar Persona a la Cola</h2>
        <form onSubmit={agregarPersona} className="form">
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="retiro">Monto de Retiro (COP)</label>
            <input
              id="retiro"
              type="number"
              placeholder="ej. 200000"
              min="1"
              value={retiro}
              onChange={e => setRetiro(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Agregar a la Cola</button>
        </form>
      </section>

      {/* Cola */}
      <section className="queue-section">
        <h2>Cola Actual <span className="badge">{cola.length}</span></h2>
        {cola.length === 0 ? (
          <p className="empty">La cola está vacía.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Retiro</th>
                <th>Hora de Llegada</th>
              </tr>
            </thead>
            <tbody>
              {cola.map((persona, indice) => (
                <tr key={persona.id} className={indice === 0 ? 'first' : ''}>
                  <td>{indice + 1}</td>
                  <td>{persona.nombre}</td>
                  <td>{formatearCOP(persona.retiro)}</td>
                  <td>{formatearHora(persona.horaLlegada)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}