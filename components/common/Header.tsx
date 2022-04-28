import Link from 'next/link'
import { FC } from 'react'

const Header: FC = () => {
    return <header className='flex justify-between bg-white p-5 rounded-lg shadow-md'>
        <Link passHref={true} href={'/'}>
            <h1 data-testid="title" className='header-title'>UPayments Store</h1>
        </Link>
        <Link passHref={true} href={'/'}>
            <p data-testid="register-title" className='header-title'>Register</p>
        </Link>
    </header>
}

export default Header