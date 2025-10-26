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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Catálogo Entel</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}


