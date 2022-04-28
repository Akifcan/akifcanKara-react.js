import { debounce } from '@/helpers/hooks/useDebonce'
import { FC } from 'react'
import Selectbox, { SelectboxItemProps } from '../common/form/Selectbox'

interface NavbarProps {
    items?: SelectboxItemProps[],
    onChange: (value: string) => void,
    onSearch: (value: string) => void
}

const Navbar: FC<NavbarProps> = ({ items, onChange, onSearch }) => {
    return <nav className='flex justify-between my-10 wrap md-gap-0 gap-2'>
        <input
            onChange={(e) => debounce(() => onSearch(e.target.value))}
            placeholder='Apple Watch, Samsung S21, Macbook Pro, ...'
            className='common-item p-3 md:w-1/3 w-full  placeholder:font-semibold' />
        <Selectbox
            onChange={onChange}
            items={items || []}
            customClass='md:w-1/5 w-full'
            placeholder='Categories' />
    </nav>
}

export default Navbar