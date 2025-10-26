import { type Product } from '../api/products'

type Props = {
  product: Product
  badge?: string
  onViewDetail: (id: number) => void
  view: 'grid' | 'list'
}

export default function ProductCard({ product, badge, onViewDetail, view }: Props) {
  const stars = Math.round(product.rating?.rate ?? 0)
  const short = product.description.length > 140 ? product.description.slice(0, 140) + '…' : product.description

  return (
    <div className={view === 'list' ? 'card list-item' : 'card'}>
      {badge && <span className="badge" aria-label={`Etiqueta: ${badge}`}>{badge}</span>}
      <img className="card-media" src={product.image} alt={product.title} />
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p>{short}</p>
        <div className="rating" aria-label={`Valoración: ${stars} de 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < stars ? '★' : '☆'}</span>
          ))}
        </div>
        <p className="card-price">${product.price.toFixed(2)}</p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={() => onViewDetail(product.id)}>
            Ver detalle
          </button>
        </div>
      </div>
    </div>
  )
}

