import { FC, useEffect, useState } from 'react'
import Loader from '@/components/common/Loader'
import Container from '@/components/common/Container'
import Fab from '@/components/common/Fab'
import Navbar from '@/components/home/Navbar'
import ProductCard from '@/components/ProductCard'
import { useRouter } from 'next/router'
import ProductService, { ProductProps } from '@/services/product.service'
import CategoryService, { CategoryProps } from '@/services/category.service'
import Head from 'next/head'

const Home: FC = () => {

  let [cachedProducts, setCachedProducts] = useState<ProductProps[]>([])
  const [products, setProducts] = useState<ProductProps[]>()
  const [categories, setCategories] = useState<CategoryProps[]>()
  const [isLoading, setLoading] = useState(false)

  const router = useRouter()

  const handleApi = async () => {
    setLoading(true)
    const [productsData, categoriesData] = await Promise.all([
      ProductService.instance.listAllProducts(),
      CategoryService.instance.listAllCategories()
    ])
    setCachedProducts(productsData)
    setProducts(productsData)
    setCategories(categoriesData)
    setLoading(false)
  }

  const onCategoryChange = (categoryName: string) => {
    if (!products) return
    if (categoryName === '') {
      setProducts(cachedProducts)
      return
    }
    setProducts(cachedProducts.filter(product => product.category === categoryName));
  }

  const onSearch = (value: string) => {
    if (value.length) {
      setProducts(cachedProducts.filter(product => product.name.toLowerCase().includes(value)));
      return
    }
    setProducts(cachedProducts)
  }

  useEffect(() => {
    handleApi()
  }, [router])

  return (
    <Container>
      <>
        <Head>
          <title>Products - UPayments</title>
        </Head>
        <Fab href='/create' />
        {isLoading && (
          <Loader />
        )}
        {!isLoading && (
          <>
            <Navbar
              onSearch={onSearch}
              onChange={onCategoryChange}
              items={categories?.map(category => {
                return {
                  label: category.name,
                  value: category.name
                }
              })} />
            <main data-testid="main" className='container product flex gap-10 justify-center flex-wrap'>
              {products?.map(product => {
                return <ProductCard product={product} key={product.id} />
              })}
            </main>
          </>
        )}
      </>
    </Container>
  )
}

export default Home
