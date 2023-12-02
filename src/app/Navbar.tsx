import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";

export default function Navbar() {
    const links = [
        { name: 'Dashboard', href: '/' },
        { name: 'Issues', href: '/issues' }
    ]
    return (
        <nav className='flex space-x-6 px-6 py-4 items-center border-b-4'>
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className='flex space-x-6'>
                {links.map(({ name, href }) => (
                    <li key={name}>
                        <Link href={href}
                            className='text-zinc-600 hover:text-black transition-colors'
                        >
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
