import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import { fetchCategories, fetchProducts, fetchProductsByCategory, type Category, type Product } from './api/products'

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | 'todos'>('todos')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [visibleCount, setVisibleCount] = useState(12)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [offersOnly, setOffersOnly] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([prods, cats]) => { setProducts(prods); setCategories(cats) })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setVisibleCount(12)
    if (selectedCategory === 'todos') {
      fetchProducts().then(setProducts).catch((e) => setError(e.message))
    } else {
      fetchProductsByCategory(selectedCategory).then(setProducts).catch((e) => setError(e.message))
    }
  }, [selectedCategory])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let base = products

    if (q) {
      base = base.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }

    if (offersOnly) {
      base = base.filter(p => p.price < 20)
    }

    return base
  }, [products, search, offersOnly])

  const visible = filtered.slice(0, visibleCount)

  const handleClickOffers = () => {
    
    setSelectedCategory('todos')
    setOffersOnly(true)
    const main = document.querySelector('main')
    main?.scrollIntoView({ behavior: 'smooth' })
  }

  const clearOffers = () => setOffersOnly(false)

  return (
    <div>
      <Header searchQuery={search} onSearchChange={setSearch} onClickOffers={handleClickOffers} />

      <main className="container">
        <h1>Productos</h1>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}

        <div className="controls">
          <select className="select" aria-label="Filtrar por categoría" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as Category | 'todos')}>
            <option value="todos">Todas</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="toggle-group" role="group" aria-label="Vista">
            <button className="btn" aria-pressed={view === 'grid'} onClick={() => setView('grid')}>Grilla</button>
            <button className="btn" aria-pressed={view === 'list'} onClick={() => setView('list')}>Lista</button>
          </div>

          <span style={{ color: 'var(--color-muted)' }}>{filtered.length} resultados</span>

          {offersOnly && (
            <button className="btn" onClick={clearOffers} title="Quitar filtro de ofertas" style={{ marginLeft: 'var(--space-8)' }}>
              Quitar ofertas
            </button>
          )}
        </div>

        <section className={view === 'grid' ? 'grid' : 'list'}>
          {visible.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              view={view}
              badge={p.price < 20 ? 'Oferta' : (p.id > 18 ? 'Nuevo' : undefined)}
              onViewDetail={(id) => setSelectedId(id)}
            />
          ))}
        </section>

        {visible.length < filtered.length && (
          <button className="btn btn-primary load-more" onClick={() => setVisibleCount((c) => c + 12)}>Cargar más</button>
        )}
      </main>

      {selectedId !== null && (
        <ProductModal id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  )
}


