import { useEffect, useState } from 'react'
import type { Product } from '../api/products'

export interface FilterState {
  category: string
  minPrice: string
  maxPrice: string
  rating: number | null
}

type FiltersProps = {
  products: Product[]
  onFiltersChange: (filters: FilterState) => void
}

export default function Filters({ products, onFiltersChange }: FiltersProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: null
  })

  useEffect(() => {
    // Extraer categorías únicas de los productos
    const uniqueCategories = Array.from(new Set(products.map(product => product.category)))
    setCategories(uniqueCategories)
  }, [products])

  const handleFilterChange = (key: keyof FilterState, value: string | number | null) => {
    const newFilters = {
      ...filters,
      [key]: value
    }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: null
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = filters.category !== '' || 
                          filters.minPrice !== '' || 
                          filters.maxPrice !== '' || 
                          filters.rating !== null

  return (
    <div className="filters">
      {/* Botón toggle para móvil */}
      <button 
        className="filters-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Mostrar filtros"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>
        Filtros
        {hasActiveFilters && <span className="filters-badge">{
          [filters.category !== '', filters.minPrice !== '', filters.maxPrice !== '', filters.rating !== null]
            .filter(Boolean).length
        }</span>}
      </button>

      {/* Panel de filtros */}
      <div className={`filters-panel ${isOpen ? 'open' : ''}`}>
        <div className="filters-header">
          <h3>Filtrar productos</h3>
          <button 
            className="filters-close"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar filtros"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="filters-content">
          {/* Filtro por categoría */}
          <div className="filter-group">
            <label htmlFor="category-filter" className="filter-label">
              Categoría
            </label>
            <select
              id="category-filter"
              className="filter-select"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por precio */}
          <div className="filter-group">
            <label className="filter-label">Rango de precio</label>
            <div className="price-range">
              <div className="price-input-group">
                <label htmlFor="min-price" className="price-label">Mín</label>
                <input
                  id="min-price"
                  type="number"
                  className="filter-input"
                  placeholder="0"
                  min="0"
                  max="999"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
              </div>
              <span className="price-separator">-</span>
              <div className="price-input-group">
                <label htmlFor="max-price" className="price-label">Máx</label>
                <input
                  id="max-price"
                  type="number"
                  className="filter-input"
                  placeholder="1000"
                  min="1"
                  max="1000"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Filtro por rating */}
          <div className="filter-group">
            <label htmlFor="rating-filter" className="filter-label">
              Rating mínimo
            </label>
            <div className="rating-filter">
              {[null, 1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating || 'all'}
                  type="button"
                  className={`rating-button ${filters.rating === rating ? 'active' : ''}`}
                  onClick={() => handleFilterChange('rating', rating)}
                  aria-label={rating === null ? 'Cualquier rating' : `${rating} estrellas o más`}
                >
                  {rating === null ? 'Todos' : (
                    <>
                      {Array.from({ length: rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                      <span className="rating-text">+</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="filters-actions">
            {hasActiveFilters && (
              <button 
                className="btn btn-outline"
                onClick={handleClearFilters}
              >
                Limpiar filtros
              </button>
            )}
            <button 
              className="btn btn-primary filters-apply"
              onClick={() => setIsOpen(false)}
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar en móvil */}
      {isOpen && <div className="filters-overlay" onClick={() => setIsOpen(false)} />}
    </div>
  )
}