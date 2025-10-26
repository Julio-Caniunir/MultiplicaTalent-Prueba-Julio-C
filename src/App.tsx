import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import { fetchProducts, type Product } from './api/products'
import './App.css'

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true
    fetchProducts().then((data) => {
      if (mounted) setProducts(data)
    }).catch(console.error)
    return () => { mounted = false }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(p => (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ))
  }, [products, query])

  return (
    <>
      <Header onSearch={setQuery} />
      <main className="container" style={{ paddingTop: 'var(--space-16)' }}>
        <h1>Catálogo</h1>
        <p>Resultados: {filtered.length}</p>
        {/* Grid y componentes se añadirán en siguientes ramas */}
      </main>
    </>
  )
}
