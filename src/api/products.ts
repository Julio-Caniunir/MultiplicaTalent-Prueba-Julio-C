export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: { rate: number; count: number }
}

export type Category = string

const BASE = 'https://fakestoreapi.com'

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`)
  if (!res.ok) throw new Error('Error al obtener productos')
  return res.json()
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`)
  if (!res.ok) throw new Error('Error al obtener producto')
  return res.json()
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/products/categories`)
  if (!res.ok) throw new Error('Error al obtener categorías')
  return res.json()
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE}/products/category/${encodeURIComponent(category)}`)
  if (!res.ok) throw new Error('Error al filtrar por categoría')
  return res.json()
}