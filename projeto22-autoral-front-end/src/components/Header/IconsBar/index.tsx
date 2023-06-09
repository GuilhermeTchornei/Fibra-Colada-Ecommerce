"use client"
import { Person, Search, Shopping } from '@/components/UI/icons';
import ProfileMenu from './profileMenu';
import { useEffect, useState } from 'react';
import CartResume from './cartResume';
import { useRouter } from 'next/navigation';
import UseCartProducts from '@/hooks/Cart/useCartProducts';
import UseCartUpdate from '@/contexts/CartContext';

export default function IconsBar() {
    const { setUpdateCart, updateCart } = UseCartUpdate();
    const [openProfile, setOpenProfile] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const router = useRouter();

    const {cart, getCart, loading, error} = UseCartProducts();

    useEffect(() => {
        if (updateCart) {
            const getCartAsync = async () => {
                await getCart();
            }
            getCartAsync();
            setUpdateCart(false);
        }
    }, [updateCart]);

    function handleClick() {
        router.push('/cart');
    }


    return (
        <ul className="h-full flex gap-x-4 justify-center items-center">
            <li>
                <button className="h-7 w-7">
                    <Search />
                </button>
            </li>
            <li className='relative'>
                <button className="h-7 w-7" onMouseOver={() => setOpenProfile(true)} onMouseOut={() => setOpenProfile(false)}>
                    <Person />

                </button>
                {
                    openProfile && <ProfileMenu setOpenProfile={(bool: boolean) => setOpenProfile(bool) } />
                }
            </li>
            <li className='relative'>
                <button className="h-7 w-7" onClick={handleClick} onMouseOver={() => setOpenCart(true)} onMouseOut={() => setOpenCart(false)}>
                    <Shopping />
                </button>
                {
                    openCart && <CartResume setOpenCart={(bool: boolean) => setOpenCart(bool)} cart={cart} loading={loading} />
                }
            </li>
        </ul>
    )
}