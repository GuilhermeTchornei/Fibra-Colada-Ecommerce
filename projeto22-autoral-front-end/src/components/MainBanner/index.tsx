import banner from '@/Banner/adam-kontor-59MCbsZZVAc-unsplash.jpg';
import Image from 'next/image';

export default function MainBanner() {
    return (
        <div className="w-full h-[500px] max-h-[50%] bg-slate-400 overflow-hidden">
            <div className="w-full h-full overflow-hidden flex relative">
                <Image src={banner} alt='' className='max-w-full object-cover object-center' />
                <div className='absolute w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.5)] flex items-end p-4'>
                    <h1 className='text-white text-5xl'>
                        Fazer a vida valer a pena
                    </h1>
                </div>
            </div>
        </div>
    )
}