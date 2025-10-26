import { useState } from 'react'

type HeaderProps = {
  onSearch: (q: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="logo" href="#" aria-label="Inicio">Entel</a>

        <nav className="nav" aria-label="Principal">
          <a href="#">Inicio</a>
          <a href="#">Catálogo</a>
          <a href="#">Ayuda</a>
        </nav>

        <button
          className="btn"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>

        <div className="search" role="search">
          <input
            type="search"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      {menuOpen && (
        <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-16)' }}>
            <a href="#">Inicio</a>
            <a href="#">Catálogo</a>
            <a href="#">Ayuda</a>
          </div>
        </div>
      )}
    </header>
  )
}