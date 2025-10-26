export type Product = {
  id: number
  title: string
  description: string
  price: number
  category: string
  image: string
  rating: { rate: number; count: number }
}

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
