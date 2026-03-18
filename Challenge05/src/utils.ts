// Formatea un número como pesos colombianos (ej: $ 200.000)
export function formatearCOP(monto: number): string {
  return monto.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  })
}

// Formatea una fecha como hora legible (ej: 11:08:27)
export function formatearHora(fecha: Date): string {
  return fecha.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

// Ordena un arreglo de personas por hora de llegada (más temprano primero)
export function ordenarPorLlegada<T extends { horaLlegada: Date }>(lista: T[]): T[] {
  return [...lista].sort((a, b) => a.horaLlegada.getTime() - b.horaLlegada.getTime())
}
