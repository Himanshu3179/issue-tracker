"use client"
import classNames from 'classnames';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/' },
        { name: 'Issues', href: '/issues' }
    ]
    return (
        <nav className='flex space-x-6 px-6 py-4 items-center border-b-4'>
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className='flex space-x-6 items-center'>
                {links.map(({ name, href }) => (
                    <li key={name}>
                        <Link href={href}
                            className={
                                classNames({
                                    'text-black font-bold': pathname === href,
                                    'text-zinc-600 hover:text-black transition-colors': pathname !== href
                                })
                            }
                        >
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
