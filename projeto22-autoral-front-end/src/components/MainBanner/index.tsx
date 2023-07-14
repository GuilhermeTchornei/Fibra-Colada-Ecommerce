import Image from 'next/image';

interface props {
    data: {
        image: string,
        text: string
    }[]
}

export default function MainBanner({ data }: props) {
    return (
            <div className="w-full h-full overflow-hidden flex relative">
                <Image src={data[0].image} alt='' fill className='max-w-full object-cover object-center' />
                <div className='absolute w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.5)] flex items-end p-4'>
                    <h1 className='text-white text-5xl'>
                        {data[0].text}
                    </h1>
                </div>
            </div>
    )
}