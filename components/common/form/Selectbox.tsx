import { FC } from 'react'
import { BsChevronDown } from 'react-icons/bs'

export interface SelectboxItemProps { label: string, value: string }


interface SelectboxProps {
    customClass?: string,
    placeholder: string,
    items: SelectboxItemProps[],
    onChange: (value: string) => void
}

const Selectbox: FC<SelectboxProps> = ({ customClass, placeholder, items = [], onChange }) => {
    return <div role={'selectbox'} className={`relative ${customClass}`}>
        <select
            data-value=''
            defaultValue={placeholder}
            onChange={(e) => {
                onChange(e.target.value)
                e.target.setAttribute('value', e.target.value)
            }}
            className="text-neutral-400 common-item px-3 py-3 w-full appearance-none text-gray-400 font-semibold">
            <option value={''}>{placeholder}</option>
            {items.map((item, index) => {
                return <option key={index} value={item.value}>{item.label}</option>
            })}
        </select>
        <span aria-hidden="true" className='absolute right-5 top-4'>
            <BsChevronDown />
        </span>
    </div>

}

export default Selectbox