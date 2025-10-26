import { useState } from 'react'

type HeaderProps = {
  onSearch: (q: string) => void
}

export default function Header({ onSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="logo" href="#" aria-label="Inicio" onClick={closeMenu}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="currentColor"/>
            <text x="16" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">E</text>
          </svg>
          <span>Entel</span>
        </a>

        {/* Navegación desktop */}
        <nav className="nav-desktop" aria-label="Principal">
          <a href="#" onClick={closeMenu}>Inicio</a>
          <a href="#" onClick={closeMenu}>Catálogo</a>
          <a href="mailto:soporte@entel.com" onClick={closeMenu} aria-label="Contactar soporte">Ayuda</a>
        </nav>

        {/* Buscador */}
        <div className="search" role="search">
          <input
            type="search"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            onChange={(e) => onSearch(e.target.value)}
          />
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>

        {/* Botón menú móvil */}
        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className={`hamburger ${menuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Menú móvil */}
      <nav className={`nav-mobile ${menuOpen ? 'open' : ''}`} aria-label="Menú móvil">
        <div className="container">
          <div className="nav-mobile-content">
            <a href="#" onClick={closeMenu}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              Inicio
            </a>
            <a href="#" onClick={closeMenu}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              Catálogo
            </a>
            <a href="mailto:soporte@entel.com" onClick={closeMenu} aria-label="Contactar soporte">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <path d="M12 17h.01"/>
              </svg>
              Ayuda
            </a>
          </div>
        </div>
      </nav>

      {/* Overlay para cerrar menú */}
      {menuOpen && <div className="menu-overlay" onClick={closeMenu} />}
    </header>
  )
}