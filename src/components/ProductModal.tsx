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
      <div className="modal-professional" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        
        {loading && (
          <div className="modal-loading">
            <div className="loading-spinner"></div>
            <p>Cargando producto...</p>
          </div>
        )}
        
        {error && (
          <div className="modal-error">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <p>{error}</p>
          </div>
        )}

        
        {product && (
          <div className="modal-content">
            
            <div className="modal-image-section">
              <div className="modal-image-container">
                <img src={product.image} alt={product.title} className="modal-image" />
              </div>
            </div>

            
            <div className="modal-info-section">
              <div className="modal-category">
                <span className="category-badge">{product.category}</span>
              </div>
              
              <h1 className="modal-title">{product.title}</h1>
              
              <div className="modal-rating">
                <div className="rating-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < Math.round(product.rating.rate) ? 'star-filled' : 'star-empty'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating.rate} ({product.rating.count} reseñas)
                </span>
              </div>

              <div className="modal-price">
                <span className="price-currency">$</span>
                <span className="price-amount">{product.price.toFixed(2)}</span>
              </div>

              <div className="modal-description">
                <h3>Descripción</h3>
                <p>{product.description}</p>
              </div>

              <div className="modal-actions">
                <button className="btn btn-primary modal-cta">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Agregar al carrito
                </button>
                <button className="btn modal-wishlist">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                  </svg>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

