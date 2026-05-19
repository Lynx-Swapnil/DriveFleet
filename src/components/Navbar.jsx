'use client';
import { Avatar, Button } from '@heroui/react';
import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { authClient } from '@/lib/auth-client';



const Navbar = () => {
    const { data: session } = authClient.useSession();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    console.log(session);

    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut();
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h1>logo</h1>
                </div>
                <div>
                    <ul className='flex space-x-4'>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/explore-cars">Explore Cars</Link></li>
                        <li><Link href="/add-car">Add Car</Link></li>
                        <li><Link href="/my-bookings">My Bookings</Link></li>
                    </ul>
                </div>
                <div>
                    {user ?
                        <div ref={menuRef} className="relative flex items-center">
                            <button
                                type="button"
                                onClick={() => setMenuOpen((prev) => !prev)}
                                className="rounded-full focus:outline-none"
                                aria-haspopup="menu"
                                aria-expanded={menuOpen}
                            >
                                <Avatar>
                                    <Avatar.Image referrerPolicy='no-referrer' src={user?.image} />
                                    <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                                </Avatar>
                            </button>

                            {menuOpen ? (
                                <div className="absolute right-0 top-full mt-3 w-48 rounded-md border border-gray-200 bg-white p-2 shadow-lg z-50">
                                    <Link href="/add-car" onClick={() => setMenuOpen(false)} className="block rounded px-3 py-2 hover:bg-gray-100">
                                        Add Car
                                    </Link>
                                    <Link href="/my-bookings" onClick={() => setMenuOpen(false)} className="block rounded px-3 py-2 hover:bg-gray-100">
                                        My Bookings
                                    </Link>
                                    <Link href="/my-added-cars" onClick={() => setMenuOpen(false)} className="block rounded px-3 py-2 hover:bg-gray-100">
                                        My Added Cars
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="block w-full rounded px-3 py-2 text-left text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : null}
                        </div> :
                        <>
                            <Link href="/signIn">
                                <Button>login</Button>
                            </Link>
                            <Link href="/signUp">
                                <Button>Sign Up</Button>
                            </Link>
                        </>

                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;