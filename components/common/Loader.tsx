import { FC } from 'react'

const Loader: FC = () => {
    return <div data-testid="loader" className='flex justify-center my-10'>
        <div role={'loader'} className='border-solid border-b border-l border-b-4 border-l-4 border-sky-500 w-20 rounded-full loader' style={{ aspectRatio: "1" }}></div>
    </div>
}

export default Loader