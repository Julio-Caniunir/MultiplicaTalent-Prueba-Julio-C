import { useEffect } from 'react'
import type { Product } from '../api/products'

type Props = {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: Props) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !product) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{product.title}</h2>
          <button 
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div className="modal-body">
          <div className="modal-image-container">
            <img 
              className="modal-image" 
              src={product.image} 
              alt={product.title}
            />
          </div>
          
          <div className="modal-details">
            <div className="modal-category">
              <span className="category-badge">{product.category}</span>
            </div>
            
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
              <span className="price-label">Precio:</span>
              <span className="price-value">${product.price.toFixed(2)}</span>
            </div>
            
            <div className="modal-description">
              <h3>Descripción</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={onClose}>
                Cerrar
              </button>
              <button className="btn btn-primary">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
