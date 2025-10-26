import { useEffect, useState } from 'react'
import { fetchProducts, type Product } from './api/products'
import ProductModal from './components/ProductModal'

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container">
      <header className="header">
        <div className="header-inner">
          <a className="logo" href="#">Entel Catalog</a>
          <div className="search" role="search">
            <input aria-label="Buscar" placeholder="Busca productos" />
          </div>
        </div>
      </header>

      <main>
        <h1>Productos</h1>
        {loading && <p>Cargando...</p>}
        {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}

        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {products.map((p) => (
            <div key={p.id} className="card">
              <img className="card-media" src={p.image} alt={p.title} />
              <div className="card-body">
                <h3 className="card-title">{p.title}</h3>
                <p className="card-price">${p.price.toFixed(2)}</p>
                <div className="card-actions">
                  <button className="btn btn-primary" onClick={() => setSelectedId(p.id)}>Ver detalle</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedId !== null && (
        <ProductModal id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  )
}
