import { FC } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Link from 'next/link'

interface FabProps {
    href: string
}

const Fab: FC<FabProps> = ({ href }) => {
    return <Link href={href} passHref={true}>
        <button
            title='Add new product'
            aria-labelledby='Click here for add new product'
            className='fixed md:bottom-10 md:right-10 bottom-5 right-5 bg-black p-6 rounded-full grid place-items-center color-white'>
            <AiOutlinePlus color='white' fontSize={'2rem'} />
        </button>
    </Link>
}

export default Fab