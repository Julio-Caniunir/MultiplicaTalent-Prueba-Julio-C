import { useState } from 'react'

type Props = {
  searchQuery: string
  onSearchChange: (value: string) => void
  onClickOffers: () => void
}

export default function Header({ searchQuery, onSearchChange, onClickOffers }: Props) {
  const [open, setOpen] = useState(false)

  const handleNavClick = (section: string) => {
    if (section === 'contacto') {
      alert('Contacto: info@entel.com | Tel: +56 2 2360 0123')
    }
    setOpen(false)
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="logo" href="#" onClick={() => window.location.reload()}>
          Catálogo Entel
        </a>

        <button 
          aria-label="Abrir menú" 
          className="btn mobile-menu-btn" 
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <nav className="nav" aria-label="Principal">
          <a href="#" onClick={() => window.location.reload()}>Inicio</a>
          <a href="#" onClick={() => { onClickOffers(); setOpen(false) }}>Ofertas</a>
          <a href="#" onClick={() => handleNavClick('contacto')}>Contacto</a>
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
        <div className="container">
          <nav className="mobile-nav" aria-label="Principal móvil" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', paddingBottom: 'var(--space-16)' }}>
            <a href="#" onClick={() => { window.location.reload(); setOpen(false) }}>Inicio</a>
            <a href="#" onClick={() => { onClickOffers(); setOpen(false) }}>Ofertas</a>
            <a href="#" onClick={() => handleNavClick('contacto')}>Contacto</a>
          </nav>
        </div>
      )}
    </header>
  )
}