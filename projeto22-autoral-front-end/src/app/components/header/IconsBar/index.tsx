"use client"
import { Person, Search, Shopping } from '@/app/components/UI/icons';
import ProfileMenu from './profileMenu';
import { useState } from 'react';

export default function IconsBar() {
    const [openProfile, setOpenProfile] = useState(false);

    return (
        <ul className="flex gap-x-4">
            <li>
                <button className="h-7 w-7">
                    <Search />
                </button>
            </li>
            <li>
                <button className="h-7 w-7">
                    <Shopping />
                </button>
            </li>
            <li className='relative'>
                <button className="h-7 w-7" onMouseOver={() => setOpenProfile(true)}>
                    <Person />
                </button>
                {
                    openProfile && <ProfileMenu setOpenProfile={() => setOpenProfile(false) }  />
                }
            </li>
        </ul>
    )
}