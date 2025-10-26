export type Product = {
  id: number
  title: string
  description: string
  price: number
  category: string
  image: string
  rating: { rate: number; count: number }
}

export type Category = string

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products')
  if (!res.ok) throw new Error('No se pudieron cargar los productos')
  return res.json()
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!res.ok) throw new Error('No se pudo cargar el producto')
  return res.json()
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch('https://fakestoreapi.com/products/categories')
  if (!res.ok) throw new Error('No se pudieron cargar las categorías')
  return res.json()
}

export async function fetchProductsByCategory(category: Category): Promise<Product[]> {
  const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
  if (!res.ok) throw new Error('No se pudieron cargar los productos de la categoría')
  return res.json()
}