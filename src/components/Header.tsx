import { useState } from 'react'

type Props = {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export default function Header({ searchQuery, onSearchChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="logo" href="#">Entel Catalog</a>

        <button aria-label="Abrir menú" className="btn" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <nav className="nav" aria-label="Principal">
          <a href="#">Inicio</a>
          <a href="#">Ofertas</a>
          <a href="#">Contacto</a>
        </nav>

        <div className="search" role="search">
          <input
            aria-label="Buscar productos"
            placeholder="Busca por título, descripción o categoría"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {open && (
        <div className="container" style={{ paddingBottom: 'var(--space-16)' }}>
          <nav aria-label="Principal móvil">
            <a href="#" style={{ marginRight: 'var(--space-16)' }}>Inicio</a>
            <a href="#" style={{ marginRight: 'var(--space-16)' }}>Ofertas</a>
            <a href="#">Contacto</a>
          </nav>
        </div>
      )}
    </header>
  )
}