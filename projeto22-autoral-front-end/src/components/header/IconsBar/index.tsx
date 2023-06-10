"use client"
import { Person, Search, Shopping } from '@/components/UI/icons';
import ProfileMenu from './profileMenu';
import { useState } from 'react';

export default function IconsBar() {
    const [openProfile, setOpenProfile] = useState(false);


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
            <li>
                <button className="h-7 w-7">
                    <Shopping />
                </button>
            </li>
        </ul>
    )
}