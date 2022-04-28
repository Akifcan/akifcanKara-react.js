import { FC, useEffect, useState } from 'react'
import Divider from '@/components/common/Divider'
import Container from '@/components/common/Container'
import { ProductImage } from '@/components/ProductCard'
import { useRouter } from 'next/router'
import ProductService, { ProductProps } from '@/services/product.service'
import Loader from '@/components/common/Loader'
import Head from 'next/head'


const ProductDetail: FC = () => {

    const router = useRouter()
    const [product, setProduct] = useState<ProductProps>()

    const singleProduct = async () => {
        setProduct(await ProductService.instance.listProduct(router.query.slug as string))
    }

    useEffect(() => {
        if (!router.query.slug) return
        singleProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router])

    return <Container>
        <>
            {!product && (
                <>
                    <Head>
                        <title>Please wait - UPayments</title>
                    </Head>
                    <Loader />
                </>
            )}
            {product && (

                <main data-testid="product-details" className='container product'>
                    <Head>
                        <title>{product.name.substring(0, 1).toUpperCase() + product.name.slice(1, -1)} - UPayments</title>
                    </Head>
                    <div className='flex md:flex-row flex-col gap-7 m-h-96 my-10'>
                        <ProductImage url={product.avatar} alt={product.name} size='md:w-72 w-full' />
                        <section role={'product-images'} className='flex flex-col justify-between gap-5'>
                            <h1 className='text-5xl font-bold'>{product.name}</h1>
                            <h1 className='text-3xl font-bold'>$ {product.price}</h1>
                        </section>
                    </div>
                    <Divider cropX='20px' />
                    <section role='product description'>
                        <h2 className='text-3xl font-bold capitalize'>Description</h2>
                        <p className='my-3 font-light capitalize'>
                            {product.description}
                        </p>
                    </section>
                </main>
            )}
        </>
    </Container>
}

export default ProductDetail