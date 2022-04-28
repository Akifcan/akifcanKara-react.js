import { FC } from 'react'
import Header from './Header'

const Container: FC<{ children: JSX.Element }> = ({ children }) => {
    return <div className='container py-10'>
        <Header />
        {children}
    </div>
}

export default Container