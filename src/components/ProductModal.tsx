import { useEffect, useState } from 'react'
import { fetchProduct, type Product } from '../api/products'

type Props = {
  id: number
  onClose: () => void
}

export default function ProductModal({ id, onClose }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchProduct(id).then(setProduct).catch((e) => setError(e.message)).finally(() => setLoading(false))
  }, [id])

  return (
    <div role="dialog" aria-modal className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Detalle de producto</h2>
          <button className="btn" onClick={onClose}>Cerrar</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}
        {product && (
          <div style={{ display: 'grid', gap: 'var(--space-16)', gridTemplateColumns: '1fr 2fr' }}>
            <img src={product.image} alt={product.title} style={{ width: '100%', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }} />
            <div>
              <h3 style={{ marginTop: 0 }}>{product.title}</h3>
              <p>{product.description}</p>
              <p className="card-price">${product.price.toFixed(2)}</p>
              <div className="rating" aria-label={`Rating: ${product.rating.rate} de 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.round(product.rating.rate) ? '★' : '☆'}</span>
                ))}
              </div>
              <ul>
                <li><strong>Categoría:</strong> {product.category}</li>
                <li><strong>Reseñas:</strong> {product.rating.count}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}