import { useState, useRef, useEffect, useMemo } from 'react';
import { Trie, type Song } from './dataStructures/Trie';
import { MaxHeap } from './dataStructures/MaxHeap';
import { Grafo } from './dataStructures/Graph';
import './App.scss';

const CANCIONES: Song[] = [
  { id: '1',  title: 'Hawái',        artist: 'Maluma',           genre: 'Reggaetón',   plays: 2_800_000 },
  { id: '2',  title: 'Despacito',    artist: 'Luis Fonsi',       genre: 'Pop Latino',  plays: 4_200_000 },
  { id: '3',  title: 'Tusa',         artist: 'KAROL G',          genre: 'Reggaetón',   plays: 3_100_000 },
  { id: '4',  title: 'Bailando',     artist: 'Enrique Iglesias', genre: 'Pop Latino',  plays: 2_600_000 },
  { id: '5',  title: 'La Bicicleta', artist: 'Carlos Vives',     genre: 'Vallenato',   plays: 1_900_000 },
  { id: '6',  title: 'Mi Gente',     artist: 'J Balvin',         genre: 'Urbano',      plays: 3_400_000 },
  { id: '7',  title: 'Con Calma',    artist: 'Daddy Yankee',     genre: 'Reggaetón',   plays: 2_200_000 },
  { id: '8',  title: 'Telepatía',    artist: 'Kali Uchis',       genre: 'R&B Latino',  plays: 1_700_000 },
  { id: '9',  title: 'DÁKITI',       artist: 'Bad Bunny',        genre: 'Trap Latino', plays: 2_900_000 },
  { id: '10', title: 'Pepas',        artist: 'Farruko',          genre: 'Dance',       plays: 2_100_000 },
];

// géneros que se consideran compatibles entre sí
// cuando se inserta una canción, el grafo la conecta automáticamente
// con cualquier canción existente cuyo género esté en esta lista
const COMPATIBLES: Record<string, string[]> = {
  'reggaetón':         ['reggaetón', 'urbano', 'trap latino', 'dance'],
  'trap latino':       ['trap latino', 'reggaetón', 'urbano', 'corridos tumbados'],
  'urbano':            ['urbano', 'reggaetón', 'trap latino', 'dance'],
  'pop latino':        ['pop latino', 'vallenato', 'r&b latino'],
  'vallenato':         ['vallenato', 'pop latino'],
  'r&b latino':        ['r&b latino', 'pop latino'],
  'dance':             ['dance', 'urbano', 'reggaetón'],
  'corridos tumbados': ['corridos tumbados', 'trap latino', 'regional mexicano', 'corridos'],
  'regional mexicano': ['regional mexicano', 'corridos tumbados', 'corridos'],
  'corridos':          ['corridos', 'corridos tumbados', 'regional mexicano'],
};

// normaliza a minúsculas y verifica si dos géneros son compatibles
// si el género no está en el mapa, solo conecta con el mismo género exacto
function sonCompatibles(g1: string, g2: string): boolean {
  const n = (g: string) => g.toLowerCase().trim();
  const lista = COMPATIBLES[n(g1)] ?? [n(g1)];
  return lista.includes(n(g2));
}

// convierte números grandes a formato legible: 2400000 → "2.4M"
function formatear(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export default function App() {
  const [canciones, setCanciones] = useState<Song[]>(CANCIONES);

  // --- Trie ---
  // useRef para que el trie no se recree en cada render
  const trie = useRef(new Trie());
  const [query, setQuery]             = useState('');
  const [sugerencias, setSugerencias] = useState<Song[]>([]);
  const [exacta, setExacta]           = useState<Song | null | 'idle'>('idle');
  const [dropdown, setDropdown]       = useState(false);

  const [verForm, setVerForm] = useState(false);
  const [titulo, setTitulo]   = useState('');
  const [artista, setArtista] = useState('');
  const [genero, setGenero]   = useState('');

  // --- Grafo ---
  const grafo = useRef(new Grafo());
  const [seleccionada, setSeleccionada] = useState('1');

  // carga inicial: inserta todas las canciones y conecta las que tienen géneros compatibles
  useEffect(() => {
    CANCIONES.forEach(c => {
      trie.current.insertar(c);
      grafo.current.agregarCancion(c);
    });
    // compara cada par una sola vez (i < j evita duplicados y autoconexiones)
    for (let i = 0; i < CANCIONES.length; i++) {
      for (let j = i + 1; j < CANCIONES.length; j++) {
        if (sonCompatibles(CANCIONES[i].genre, CANCIONES[j].genre)) {
          grafo.current.conectar(CANCIONES[i].id, CANCIONES[j].id);
        }
      }
    }
  }, []);

  // --- Max Heap ---
  // se reconstruye cada vez que cambian las reproducciones de alguna canción
  const top5 = useMemo(() => {
    const heap = new MaxHeap();
    canciones.forEach(c => heap.insertar(c));
    return heap.top(5);
  }, [canciones]);

  // el máximo se usa para calcular el ancho relativo de cada barra
  const maxPlays = useMemo(
    () => Math.max(...canciones.map(c => c.plays)),
    [canciones]
  );

  // --- handlers del buscador ---
  function buscar(valor: string) {
    setQuery(valor);
    if (!valor.trim()) {
      setSugerencias([]);
      setDropdown(false);
      setExacta('idle');
      return;
    }
    // el trie devuelve objetos desactualizados, los sincronizo con el estado actual
    const raw = trie.current.sugerencias(valor);
    setSugerencias(raw.map(r => canciones.find(c => c.id === r.id) ?? r));
    setDropdown(true);

    const res = trie.current.buscar(valor);
    setExacta(res ? (canciones.find(c => c.id === res.id) ?? res) : null);
  }

  function elegir(cancion: Song) {
    setQuery(cancion.title);
    setSugerencias([]);
    setDropdown(false);
    setExacta(cancion);
  }

  function agregarCancion() {
    if (!titulo.trim() || !artista.trim()) return;
    const nueva: Song = {
      id: String(Date.now()),
      title: titulo.trim(),
      artist: artista.trim(),
      genre: genero.trim() || 'Otro',
      plays: Math.floor(Math.random() * 500_000) + 50_000,
    };
    trie.current.insertar(nueva);
    grafo.current.agregarCancion(nueva);
    // conecta la nueva canción con todas las existentes que tengan género compatible
    canciones.forEach(c => {
      if (sonCompatibles(nueva.genre, c.genre)) {
        grafo.current.conectar(nueva.id, c.id);
      }
    });
    setCanciones(prev => [...prev, nueva]);
    setTitulo(''); setArtista(''); setGenero('');
    setVerForm(false);
  }

  // al actualizar el estado, el useMemo del heap se recalcula automáticamente
  function sumarPlay(id: string) {
    setCanciones(prev =>
      prev.map(c => c.id === id ? { ...c, plays: c.plays + 50_000 } : c)
    );
  }

  // --- datos del grafo ---
  const cancionActual   = canciones.find(c => c.id === seleccionada)!;
  const idsRelacionados = grafo.current.relacionados(seleccionada);
  // mapea los IDs de vecinos a objetos Song con datos actualizados
  const relacionadas    = idsRelacionados
    .map(id => canciones.find(c => c.id === id))
    .filter(Boolean) as Song[];

  // coordenadas para los nodos del grafo SVG
  const SVG_W    = 280;
  const CX       = SVG_W / 2;
  const CY       = SVG_W / 2;
  const RADIO    = relacionadas.length > 5 ? 100 : 88;
  const R_CENTRO = 30;
  const R_NODO   = 24;
  const cortar   = (s: string, n: number) => s.length > n ? s.slice(0, n - 1) + '…' : s;

  const nodosGrafo = relacionadas.map((c, i) => {
    const angulo = (2 * Math.PI * i) / relacionadas.length - Math.PI / 2;
    return { ...c, x: CX + RADIO * Math.cos(angulo), y: CY + RADIO * Math.sin(angulo) };
  });

  return (
    <div className="app">

      <header className="header">
        <div className="header__logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#5b6cf9">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span className="header__logo-name">SpotiMusic</span>
        </div>
        <div className="header__badge">Parcial 03</div>
      </header>

      <main className="main">

        {/* panel 1: buscador con trie */}
        <div className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Buscador Predictivo</h2>
          </div>

          <div className="search__wrap">
            <span className="search__icon">⌕</span>
            <input
              className="search__input"
              type="text"
              placeholder="Escribe el título de una canción..."
              value={query}
              onChange={e => buscar(e.target.value)}
              onFocus={() => query && setDropdown(true)}
              onBlur={() => setTimeout(() => setDropdown(false), 150)}
            />
          </div>

          {dropdown && (
            <div className="search__dropdown">
              {sugerencias.length > 0
                ? sugerencias.map(c => (
                    <div key={c.id} className="search__dropdown-item" onMouseDown={() => elegir(c)}>
                      <span className="search__dropdown-item-dot" />
                      <div>
                        <div className="search__dropdown-item-title">{c.title}</div>
                        <div className="search__dropdown-item-artist">{c.artist}</div>
                      </div>
                      <span className="tag">{c.genre}</span>
                    </div>
                  ))
                : <div className="search__dropdown-empty">Sin resultados para "{query}"</div>
              }
            </div>
          )}

          {exacta !== 'idle' && (
            <div className={`search__result search__result--${exacta ? 'found' : 'miss'}`}>
              {exacta ? (
                <>
                  <span>✓</span>
                  <div>
                    <div className="search__result-name">{exacta.title}</div>
                    <div className="search__result-meta">{exacta.artist} · {formatear(exacta.plays)} plays</div>
                  </div>
                </>
              ) : (
                <>
                  <span>✗</span>
                  <span>No se encontró una coincidencia exacta</span>
                </>
              )}
            </div>
          )}

          <button className="btn btn--ghost btn--sm" onClick={() => setVerForm(v => !v)}>
            {verForm ? '− Cancelar' : '+ Insertar canción'}
          </button>

          {verForm && (
            <div className="add-form">
              <input className="add-form__field" placeholder="Título *" value={titulo} onChange={e => setTitulo(e.target.value)} />
              <input className="add-form__field" placeholder="Artista *" value={artista} onChange={e => setArtista(e.target.value)} />
              <input className="add-form__field" placeholder="Género" value={genero} onChange={e => setGenero(e.target.value)} />
              <div className="add-form__actions">
                <button className="btn btn--primary btn--sm" onClick={agregarCancion}>Insertar</button>
              </div>
            </div>
          )}
        </div>

        {/* panel 2: ranking con max heap */}
        <div className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Top Canciones</h2>
          </div>

          <div className="rankings__list">
            {top5.map((c, i) => (
              <div key={c.id} className="rankings__item">
                <div className={`rankings__rank rankings__rank--${i + 1}`}>{i + 1}</div>
                <div className="rankings__info">
                  <div className="rankings__info-title">{c.title}</div>
                  <div className="rankings__info-artist">{c.artist}</div>
                </div>
                <div className="rankings__bar">
                  <div className="rankings__bar-fill" style={{ width: `${(c.plays / maxPlays) * 100}%` }} />
                </div>
                <div className="rankings__plays">{formatear(c.plays)}</div>
                <button className="rankings__add-btn" onClick={() => sumarPlay(c.id)}>+50K</button>
              </div>
            ))}
          </div>
        </div>

        {/* panel 3: recomendaciones con grafo */}
        <div className="panel">
          <div className="panel__head">
            <h2 className="panel__title">Recomendaciones</h2>
          </div>

          <div className="graph__select">
            <select value={seleccionada} onChange={e => setSeleccionada(e.target.value)}>
              {canciones.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>

          {/* visualización SVG del grafo */}
          <svg viewBox={`0 0 ${SVG_W} ${SVG_W}`} className="graph__svg">
            {/* aristas desde el centro hacia cada nodo relacionado */}
            {nodosGrafo.map(n => (
              <line key={n.id} x1={CX} y1={CY} x2={n.x} y2={n.y} className="graph__svg-edge" />
            ))}

            {/* nodos relacionados, clickeables para navegar el grafo */}
            {nodosGrafo.map(n => (
              <g key={n.id} className="graph__svg-nodo" onClick={() => setSeleccionada(n.id)}>
                <circle cx={n.x} cy={n.y} r={R_NODO} />
                <text x={n.x} y={n.y - 4} className="graph__svg-titulo">{cortar(n.title, 10)}</text>
                <text x={n.x} y={n.y + 7} className="graph__svg-genero">{cortar(n.genre, 13)}</text>
              </g>
            ))}

            {/* nodo central: canción seleccionada */}
            <g className="graph__svg-centro">
              <circle cx={CX} cy={CY} r={R_CENTRO} />
              <text x={CX} y={CY - 5} className="graph__svg-titulo">{cortar(cancionActual.title, 10)}</text>
              <text x={CX} y={CY + 8} className="graph__svg-genero">{cortar(cancionActual.genre, 13)}</text>
            </g>
          </svg>

          {relacionadas.length > 0 ? (
            <div className="graph__related">
              <div className="graph__related-label">Canciones relacionadas</div>
              {relacionadas.map(c => (
                <div key={c.id} className="graph__related-item" onClick={() => setSeleccionada(c.id)}>
                  <div className="graph__related-item-bar" />
                  <div className="graph__related-item-info">
                    <div className="graph__related-item-info-title">{c.title}</div>
                    <div className="graph__related-item-info-artist">{c.artist}</div>
                  </div>
                  <span className="tag tag--accent">{c.genre}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="graph__empty">Esta canción no tiene relacionadas</div>
          )}
        </div>

      </main>
    </div>
  );
}
