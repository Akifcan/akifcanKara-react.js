import { FC } from 'react'

interface AlertProps {
    color: string,
    text: string
}

const Alert: FC<AlertProps> = ({ color, text }) => {
    return <div className={`w-full ${color} p-5 common-item`}>
        <p className='capitalize text-white'>{text}</p>
    </div>
}

export default Alert