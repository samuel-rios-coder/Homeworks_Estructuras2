import type { Persona } from './tipos'

// Genera una hora aleatoria dentro de los últimos 30 minutos
export function llegadaAleatoria(): Date {
  const ahora = new Date()
  const desfaseMs = Math.floor(Math.random() * 30 * 60 * 1000)
  return new Date(ahora.getTime() - desfaseMs)
}

// Lista de personas de prueba precargadas en la cola
export const datosPrueba: Persona[] = [
  { id: 1, nombre: 'Ana García',      retiro: 200000, horaLlegada: llegadaAleatoria() },
  { id: 2, nombre: 'Carlos Martínez', retiro: 50000,  horaLlegada: llegadaAleatoria() },
  { id: 3, nombre: 'Lucía Ramírez',   retiro: 300000, horaLlegada: llegadaAleatoria() },
  { id: 4, nombre: 'Jorge López',     retiro: 100000, horaLlegada: llegadaAleatoria() },
  { id: 5, nombre: 'Sofía Herrera',   retiro: 80000,  horaLlegada: llegadaAleatoria() },
]
