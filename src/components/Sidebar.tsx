'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CreditCard, List, CheckSquare, Menu, X } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

const navItems = [
    { name: 'Solicitud de Tarjetas', href: '/solicitud', icon: CreditCard },
    { name: 'Tarjetas Solicitadas', href: '/gestion', icon: List },
    { name: 'Tarjetas Aprobadas', href: '/aprobadas', icon: CheckSquare },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-primary-2 flex items-center">
                <div className="absolute left-4">
                    <Image
                        src="/banco02.png"
                        alt="Credit Suisse Logo"
                        width={90}
                        height={50}
                    />
                </div>

                <h1 className="w-full text-center text-white font-bold text-3xl">
                    Banco Credit Suisse
                </h1>
            </div>

            <button
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-primary-1 text-white rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            <div
                className={clsx(
                    'fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 mt-16',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex flex-col h-full">
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                                        isActive
                                            ? 'bg-primary-1 text-white'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-primary-1'
                                    )}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-200">
                        <p className="text-xs text-center text-gray-500">
                            &copy; 2024 Credit Suisse
                        </p>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
