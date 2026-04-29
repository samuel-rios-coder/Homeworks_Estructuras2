import { useMemo, useState } from 'react'
import { Graph } from 'react-d3-graph'
import './App.css'

type City = {
  id: string
  name: string
}

type Person = {
  id: string
  name: string
  age: number
  cityId: string
}

type Friendship = {
  source: string
  target: string
}

const initialCities: City[] = [
  { id: 'bogota', name: 'Bogotá' },
  { id: 'medellin', name: 'Medellín' },
  { id: 'cali', name: 'Cali' },
]

const initialPeople: Person[] = [
  { id: 'ana', name: 'Ana', age: 21, cityId: 'bogota' },
  { id: 'luis', name: 'Luis', age: 24, cityId: 'bogota' },
  { id: 'maria', name: 'María', age: 20, cityId: 'medellin' },
  { id: 'carlos', name: 'Carlos', age: 25, cityId: 'cali' },
]

const initialFriendships: Friendship[] = [
  { source: 'ana', target: 'luis' },
  { source: 'ana', target: 'maria' },
  { source: 'maria', target: 'carlos' },
]

const graphConfig = {
  automaticRearrangeAfterDropNode: true,
  collapsible: false,
  directed: false,
  height: 460,
  highlightDegree: 1,
  linkHighlightBehavior: true,
  maxZoom: 4,
  minZoom: 0.4,
  nodeHighlightBehavior: true,
  panAndZoom: true,
  staticGraph: false,
  width: 760,
  d3: {
    gravity: -340,
    linkLength: 130,
  },
  node: {
    color: '#64748b',
    fontColor: '#111827',
    fontSize: 12,
    highlightFontSize: 13,
    highlightStrokeColor: '#111827',
    labelProperty: 'name',
    size: 520,
    strokeColor: '#ffffff',
    strokeWidth: 2,
    symbolType: 'circle',
  },
  link: {
    color: '#94a3b8',
    highlightColor: '#2563eb',
    renderLabel: false,
    strokeWidth: 2,
  },
}

function createId(text: string, total: number) {
  const slug = text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  return `${slug || 'item'}-${total + 1}`
}

function App() {
  const [cities, setCities] = useState(initialCities)
  const [people, setPeople] = useState(initialPeople)
  const [friendships, setFriendships] = useState(initialFriendships)

  const [selectedCityId, setSelectedCityId] = useState(initialCities[0].id)
  const [cityName, setCityName] = useState('')
  const [personName, setPersonName] = useState('')
  const [personAge, setPersonAge] = useState('18')
  const [personCityId, setPersonCityId] = useState(initialCities[0].id)
  const [friendA, setFriendA] = useState(initialPeople[0].id)
  const [friendB, setFriendB] = useState(initialPeople[1].id)

  const selectedCity = cities.find((city) => city.id === selectedCityId)
  const graphIsEmpty = cities.length === 0 && people.length === 0

  const peopleInSelectedCity = people.filter(
    (person) => person.cityId === selectedCityId,
  )

  const graphData = useMemo(
    () => ({
      nodes: [
        ...cities.map((city) => ({
          id: city.id,
          name: city.name,
          color: '#0ea5a8',
          fontSize: 13,
          size: 780,
          strokeColor: '#0f766e',
          symbolType: 'square',
        })),
        ...people.map((person) => ({
          id: person.id,
          name: `${person.name} (${person.age})`,
          color: '#84cc16',
          size: 540,
          strokeColor: '#4d7c0f',
          symbolType: 'circle',
        })),
      ],
      links: [
        ...people.map((person) => ({
          source: person.id,
          target: person.cityId,
          color: '#0ea5a8',
        })),
        ...friendships.map((friendship) => ({
          ...friendship,
          color: '#8b5cf6',
        })),
      ],
    }),
    [cities, friendships, people],
  )

  function addCity() {
    const name = cityName.trim()

    if (name === '') {
      return
    }

    const city = {
      id: createId(name, cities.length),
      name,
    }

    setCities([...cities, city])
    setSelectedCityId(city.id)
    setPersonCityId(city.id)
    setCityName('')
  }

  function addPerson() {
    const name = personName.trim()
    const age = Number(personAge)

    if (name === '' || Number.isNaN(age) || age <= 0 || personCityId === '') {
      return
    }

    const person = {
      id: createId(name, people.length),
      name,
      age,
      cityId: personCityId,
    }

    setPeople([...people, person])
    setSelectedCityId(person.cityId)
    setPersonName('')
    setPersonAge('18')

    if (people.length === 0) {
      setFriendA(person.id)
      setFriendB(person.id)
    }

    if (people.length === 1) {
      setFriendB(person.id)
    }
  }

  function addFriendship() {
    const samePerson = friendA === friendB
    const alreadyExists = friendships.some(
      (friendship) =>
        (friendship.source === friendA && friendship.target === friendB) ||
        (friendship.source === friendB && friendship.target === friendA),
    )

    if (samePerson || alreadyExists) {
      return
    }

    setFriendships([...friendships, { source: friendA, target: friendB }])
  }

  function clearGraph() {
    setCities([])
    setPeople([])
    setFriendships([])
    setSelectedCityId('')
    setPersonCityId('')
    setFriendA('')
    setFriendB('')
  }

  function selectNode(nodeId: string) {
    const city = cities.find((currentCity) => currentCity.id === nodeId)
    const person = people.find((currentPerson) => currentPerson.id === nodeId)

    if (city) {
      setSelectedCityId(city.id)
    }

    if (person) {
      setSelectedCityId(person.cityId)
    }
  }

  return (
    <main className="app">
      <header className="top-bar">
        <div>
          <p className="eyebrow"></p>
          <h1>Grafo de amigos y ciudades</h1>
        </div>
        <div className="header-actions">
          <div className="stats">
            <span>{people.length} personas</span>
            <span>{cities.length} ciudades</span>
          </div>
          <button
            className="danger-button"
            type="button"
            onClick={clearGraph}
            disabled={graphIsEmpty}
          >
            Borrar grafo
          </button>
        </div>
      </header>

      <section className="workspace">
        <div className="panel controls">
          <form
            className="form-block"
            onSubmit={(event) => {
              event.preventDefault()
              addCity()
            }}
          >
            <h2>Ciudad</h2>
            <label htmlFor="cityName">Nombre</label>
            <div className="inline-form">
              <input
                id="cityName"
                type="text"
                value={cityName}
                onChange={(event) => setCityName(event.target.value)}
                placeholder="Barranquilla"
              />
              <button type="submit">Agregar</button>
            </div>
          </form>

          <form
            className="form-block"
            onSubmit={(event) => {
              event.preventDefault()
              addPerson()
            }}
          >
            <h2>Persona</h2>
            <label htmlFor="personName">Nombre</label>
            <input
              id="personName"
              type="text"
              value={personName}
              onChange={(event) => setPersonName(event.target.value)}
              placeholder="Sofia"
            />

            <div className="form-grid">
              <div>
                <label htmlFor="personAge">Edad</label>
                <input
                  id="personAge"
                  type="number"
                  min="1"
                  value={personAge}
                  onChange={(event) => setPersonAge(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="personCity">Ciudad</label>
                <select
                  id="personCity"
                  value={personCityId}
                  onChange={(event) => setPersonCityId(event.target.value)}
                  disabled={cities.length === 0}
                >
                  {cities.length === 0 ? (
                    <option value="">Sin ciudades</option>
                  ) : (
                    cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <button type="submit" disabled={cities.length === 0}>
              Agregar persona
            </button>
          </form>

          <form
            className="form-block"
            onSubmit={(event) => {
              event.preventDefault()
              addFriendship()
            }}
          >
            <h2>Amistad</h2>
            <div className="form-grid">
              <div>
                <label htmlFor="friendA">Persona 1</label>
                <select
                  id="friendA"
                  value={friendA}
                  onChange={(event) => setFriendA(event.target.value)}
                  disabled={people.length < 2}
                >
                  {people.length === 0 ? (
                    <option value="">Sin personas</option>
                  ) : (
                    people.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div>
                <label htmlFor="friendB">Persona 2</label>
                <select
                  id="friendB"
                  value={friendB}
                  onChange={(event) => setFriendB(event.target.value)}
                  disabled={people.length < 2}
                >
                  {people.length === 0 ? (
                    <option value="">Sin personas</option>
                  ) : (
                    people.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <button type="submit" disabled={people.length < 2}>
              Conectar
            </button>
          </form>
        </div>

        <section className="panel graph-panel" aria-label="Grafo">
          {graphIsEmpty ? (
            <div className="empty-graph">Grafo vacio</div>
          ) : (
            <Graph
              id="friends-cities-graph"
              data={graphData}
              config={graphConfig}
              onClickNode={selectNode}
            />
          )}
        </section>

        <aside className="panel city-list">
          <h2>Personas en ciudad</h2>
          <label htmlFor="selectedCity">Ciudad</label>
          <select
            id="selectedCity"
            value={selectedCityId}
            onChange={(event) => setSelectedCityId(event.target.value)}
            disabled={cities.length === 0}
          >
            {cities.length === 0 ? (
              <option value="">Sin ciudades</option>
            ) : (
              cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))
            )}
          </select>

          <div className="list-header">
            <strong>{selectedCity?.name ?? 'Sin ciudad'}</strong>
            <span>{peopleInSelectedCity.length}</span>
          </div>

          <ul className="people-list">
            {peopleInSelectedCity.map((person) => (
              <li key={person.id}>
                <span>{person.name}</span>
                <small>{person.age} años</small>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  )
}

export default App
