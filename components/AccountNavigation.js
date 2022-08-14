import React from 'react';
import {CreditCardIcon, LogoutIcon, UserIcon} from "@heroicons/react/outline";
import {supabaseClient} from "../supabase";
import {useRouter} from "next/router";
import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const AccountNavigation = ({current}) => {
    const router = useRouter();

    const subNavigation = [
        {name: 'Informações pessoais', href: '/account', icon: UserIcon, current: true},
        {name: 'Sua assinatura', href: '/account/subscription', icon: CreditCardIcon, current: false},
    ]

    const isCurrent = (href) => {
        return href === current;
    }

    const signOut = async () => {
        await supabaseClient.auth.signOut();
        await router.push('/');
    }

    return (
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
                {subNavigation.map((item) => (
                    <Link key={item.name} href={item.href} passHref={true}>
                        <a
                            className={classNames(
                                isCurrent(item.href)
                                    ? 'bg-gray-50 text-blue-600 hover:bg-white'
                                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                                'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                            <item.icon
                                className={classNames(
                                    isCurrent(item.href) ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                                    'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                                )}
                                aria-hidden="true"
                            />
                            <span className="truncate">{item.name}</span>
                        </a>
                    </Link>
                ))}

                <div className="pt-8">
                    <a
                        href="#"
                        onClick={signOut}
                        className="text-red-600 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                    >
                        <LogoutIcon
                            className="text-red-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                            aria-hidden="true"
                        />
                        <span className="truncate">Sair da conta</span>
                    </a>
                </div>
            </nav>
        </aside>
    );

}

export default AccountNavigation;