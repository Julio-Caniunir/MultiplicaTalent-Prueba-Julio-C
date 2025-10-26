import type { Product } from '../api/products'

type Props = {
  product: Product
  isSelected?: boolean
  onClick?: () => void
  badge?: 'Nuevo' | 'Oferta'
}

export default function ProductCard({ product, isSelected, onClick, badge }: Props) {
  return (
    <article className="card" aria-label={product.title}>
      {badge && <span className="badge" aria-label={badge}>{badge}</span>}
      <img className="card-media" src={product.image} alt={product.title} loading="lazy" />
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-description">{product.description.slice(0, 100)}...</p>
        <div className="rating" aria-label={`Rating: ${product.rating.rate} de 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < Math.round(product.rating.rate) ? '★' : '☆'}</span>
          ))}
          <span style={{ marginLeft: 'var(--space-4)', fontSize: 'var(--font-xs)', color: 'var(--color-muted)' }}>
            ({product.rating.count})
          </span>
        </div>
        <div className="card-price">${product.price.toFixed(2)}</div>
        <div className="card-actions">
          <button 
            className="btn btn-primary" 
            onClick={onClick}
          >
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  )
}
