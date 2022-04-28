/* eslint-disable @next/next/no-img-element */

import { FC } from 'react'
import Link from 'next/link'
import { ProductProps } from 'services/product.service'

interface ProductImageProps {
    size?: 'full' | 'w-44' | 'w-52' | 'w-56' | 'w-60' | 'w-72' | 'md:w-72 w-full',
    url: string,
    alt: string
}

interface ProductCardProps {
    product: ProductProps
}

export const ProductImage: FC<ProductImageProps> = ({ size = 'w-full', url, alt }) => {
    return <div className={`common-item bg-white shadow-sm ${size} overflow-hidden`} style={{ aspectRatio: "1" }}>
        <img
            onError={(e) => {
                const el = e.target as HTMLElement
                el.setAttribute('src', 'https://discountseries.com/wp-content/uploads/2017/09/default.jpg')
            }}
            alt={alt}
            src={url}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
    </div>
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    return <Link href={`/product/${product.id}`} passHref={true}>
        <div aria-label='Product' className='flex flex-col gap-3 md:w-52 w-full cursor-pointer'>
            <ProductImage url={product.avatar} alt={product.name} />
            <p role={'Product Name'} className='font-medium text-lg'>{product.name}</p>
            <p role={'Product Price'} className='font-medium text-lg self-center'>${product.price}</p>
        </div>
    </Link>
}

export default ProductCard