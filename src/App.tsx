import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import Filters from './components/Filters'
import { fetchProducts, type Product } from './api/products'
import './App.css'

export interface FilterState {
  category: string
  minPrice: string
  maxPrice: string
  rating: number | null
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [query, setQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: null
  })

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Filtrar por categoría
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      )
    }

    // Filtrar por precio
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice)
      filtered = filtered.filter(product => product.price >= minPrice)
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice)
      filtered = filtered.filter(product => product.price <= maxPrice)
    }

    // Filtrar por rating
    if (filters.rating !== null) {
      filtered = filtered.filter(product => product.rating.rate >= filters.rating!)
    }

    setFilteredProducts(filtered)
  }, [products, filters])

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const searchFiltered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return filteredProducts
    return filteredProducts.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )
  }, [filteredProducts, query])

  if (loading) {
    return (
      <div className="app">
        <Header onSearch={setQuery} />
        <main className="main">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Cargando productos...
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <Header onSearch={setQuery} />
      <main className="main">
        <div className="container">
          <Filters 
            products={products}
            onFiltersChange={handleFiltersChange}
          />
          <div className="grid">
            {searchFiltered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
          {searchFiltered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-muted)' }}>
              No se encontraron productos que coincidan con los filtros seleccionados.
            </div>
          )}
        </div>
      </main>
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
