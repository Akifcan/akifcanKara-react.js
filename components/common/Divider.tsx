import { FC } from 'react'

interface DividerProps {
    cropX?: string,
    background?: string,
    height?: string
}

const Divider: FC<DividerProps> = ({ cropX = '0px', height = 'h-px', background = 'bg-black' }) => {
    return <div aria-hidden="true" className={`${height} ${background} my-5`} style={{ marginInline: cropX }}></div>
}

export default Divider