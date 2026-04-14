import { useState, type ReactNode } from 'react'
import './App.css'

type MenuNode = {
  title: string
  link: string
  component: ReactNode
  children?: MenuNode[]
}

function HomeComponent() {
  return (
    <section className="content-card">
      <span className="eyebrow">Inicio</span>
      <h1>Menu N-ario en React</h1>
    </section>
  )
}

function UsersComponent() {
  return (
    <section className="content-card">
      <span className="eyebrow">Usuarios</span>
      <h1>Gestion de usuarios</h1>
    </section>
  )
}

function ReportsComponent() {
  return (
    <section className="content-card">
      <span className="eyebrow">Reportes</span>
      <h1>Panel de reportes</h1>
    </section>
  )
}

function SalesComponent() {
  return (
    <section className="content-card">
      <span className="eyebrow">Ventas</span>
      <h1>Reporte de ventas</h1>
    </section>
  )
}

function InventoryComponent() {
  return (
    <section className="content-card">
      <span className="eyebrow">Inventario</span>
      <h1>Estado del inventario</h1>
    </section>
  )
}

function SettingsComponent() {
  return (
    <section className="content-card">
      <span className="eyebrow">Configuracion</span>
      <h1>Ajustes del sistema</h1>
    </section>
  )
}

const menuTree: MenuNode[] = [
  {
    title: 'Inicio',
    link: '/inicio',
    component: <HomeComponent />,
  },
  {
    title: 'Administracion',
    link: '/administracion',
    component: <UsersComponent />,
    children: [
      {
        title: 'Usuarios',
        link: '/administracion/usuarios',
        component: <UsersComponent />,
      },
      {
        title: 'Reportes',
        link: '/administracion/reportes',
        component: <ReportsComponent />,
        children: [
          {
            title: 'Ventas',
            link: '/administracion/reportes/ventas',
            component: <SalesComponent />,
          },
          {
            title: 'Inventario',
            link: '/administracion/reportes/inventario',
            component: <InventoryComponent />,
          },
        ],
      },
    ],
  },
  {
    title: 'Configuracion',
    link: '/configuracion',
    component: <SettingsComponent />,
    children: [
      {
        title: 'Perfil',
        link: '/configuracion/perfil',
        component: <SettingsComponent />,
      },
      {
        title: 'Seguridad',
        link: '/configuracion/seguridad',
        component: <SettingsComponent />,
      },
    ],
  },
]

function findNodeByLink(nodes: MenuNode[], link: string): MenuNode | null {
  for (const node of nodes) {
    if (node.link === link) {
      return node
    }

    if (node.children) {
      const found = findNodeByLink(node.children, link)
      if (found) {
        return found
      }
    }
  }

  return null
}

type SidebarItemProps = {
  node: MenuNode
  level?: number
  activeLink: string
  onSelect: (link: string) => void
  expandedLinks: string[]
  onToggle: (link: string) => void
}

function SidebarItem({
  node,
  level = 0,
  activeLink,
  onSelect,
  expandedLinks,
  onToggle,
}: SidebarItemProps) {
  const isActive = activeLink === node.link
  const children = node.children ?? []
  const hasChildren = children.length > 0
  const isExpanded = expandedLinks.includes(node.link)

  return (
    <li>
      <div
        className={`menu-row ${isActive ? 'active' : ''}`}
        style={{ paddingLeft: `${12 + level * 18}px` }}
      >
        {hasChildren ? (
          <button
            className={`arrow-button ${isExpanded ? 'expanded' : ''}`}
            onClick={() => onToggle(node.link)}
            type="button"
            aria-label={isExpanded ? 'Cerrar submenu' : 'Abrir submenu'}
          >
            {'>'}
          </button>
        ) : (
          <span className="arrow-placeholder" />
        )}

        <button
          className="menu-button"
          onClick={() => onSelect(node.link)}
          type="button"
        >
          <span>{node.title}</span>
          <small>{node.link}</small>
        </button>
      </div>

      {hasChildren && isExpanded && (
        <ul className="submenu-list">
          {children.map((child) => (
            <SidebarItem
              key={child.link}
              node={child}
              level={level + 1}
              activeLink={activeLink}
              onSelect={onSelect}
              expandedLinks={expandedLinks}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function App() {
  const [activeLink, setActiveLink] = useState('/inicio')
  const [expandedLinks, setExpandedLinks] = useState<string[]>([
    '/administracion',
    '/administracion/reportes',
    '/configuracion',
  ])

  const selectedNode = findNodeByLink(menuTree, activeLink) ?? menuTree[0]

  function toggleExpanded(link: string) {
    setExpandedLinks((currentLinks) =>
      currentLinks.includes(link)
        ? currentLinks.filter((currentLink) => currentLink !== link)
        : [...currentLinks, link],
    )
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <p className="sidebar-label">Challenge 09</p>
        </div>

        <ul className="menu-list">
          {menuTree.map((node) => (
            <SidebarItem
              key={node.link}
              node={node}
              activeLink={activeLink}
              onSelect={setActiveLink}
              expandedLinks={expandedLinks}
              onToggle={toggleExpanded}
            />
          ))}
        </ul>
      </aside>

      <section className="content-panel">
        <div className="content-summary">
          <span className="eyebrow">Nodo seleccionado</span>
          <h3>{selectedNode.title}</h3>
          <p>
            Link: <code>{selectedNode.link}</code>
          </p>
        </div>
        {selectedNode.component}
      </section>
    </main>
  )
}

export default App
