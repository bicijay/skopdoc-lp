/* This example requires Tailwind CSS v2.0+ */
import {Fragment} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {
    MenuIcon,
    PhoneIcon,
    ViewGridIcon,
    XIcon,
    DocumentTextIcon, GlobeAltIcon
} from '@heroicons/react/outline'
import {ChevronDownIcon} from '@heroicons/react/solid'
import Link from 'next/link'
import {useGlobalStore} from "../store/store";

const solutions = [
    {
        name: 'Documentação',
        description: "Confira nossa documentação para desenvolvedores.",
        href: '#',
        icon: DocumentTextIcon,
    },
    {
        name: 'Integrações',
        description: "Conecte com o prontuário eletrônico ou ERP utilizado na sua clínica.",
        href: '#',
        icon: ViewGridIcon,
    },
    {
        name: 'Parceiros',
        description: "Alguns dos parceiros já integrados com o Skopdoc.",
        href: '#parceiros',
        icon: GlobeAltIcon,
    },
]
const callsToAction = [
    {name: 'Dúvidas sobre integração? Entre em contato', href: '#', icon: PhoneIcon},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const session = useGlobalStore(state => state.session);
    const setShowLoginModal = useGlobalStore(state => state.setShowLoginModal);

    return (
        <Popover className="relative bg-white">
            <div className="100w border-b-2 border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <a href="#">
                                <span className="sr-only">Skopdoc</span>
                                <img
                                    className="h-8 w-auto sm:h-10"
                                    src="/logo.png"
                                    alt="logo skopdoc"
                                />
                            </a>
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <Popover.Button
                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                                <span className="sr-only">Abrir menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true"/>
                            </Popover.Button>
                        </div>
                        <Popover.Group as="nav" className="hidden md:flex space-x-10">
                            <Link href="/" passHref={true}>
                                <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    Home
                                </a>
                            </Link>
                            <a href="#recursos" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                Recursos
                            </a>
                            <a href="#precos" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                Preços
                            </a>
                            <a href="#faq" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                Perguntas Frequentes
                            </a>

                            <Popover className="relative">
                                {({open}) => (
                                    <>
                                        <Popover.Button
                                            className={classNames(
                                                open ? 'text-gray-900' : 'text-gray-500',
                                                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                            )}
                                        >
                                            <span>Desenvolvedor</span>
                                            <ChevronDownIcon
                                                className={classNames(
                                                    open ? 'text-gray-600' : 'text-gray-400',
                                                    'ml-2 h-5 w-5 group-hover:text-gray-500'
                                                )}
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel
                                                className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                                <div
                                                    className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                    <div
                                                        className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                        {solutions.map((item) => (
                                                            <a
                                                                key={item.name}
                                                                href={item.href}
                                                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                            >
                                                                <item.icon
                                                                    className="flex-shrink-0 h-6 w-6 text-blue-600"
                                                                    aria-hidden="true"/>
                                                                <div className="ml-4">
                                                                    <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                    <div
                                                        className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                                                        {callsToAction.map((item) => (
                                                            <div key={item.name} className="flow-root">
                                                                <a
                                                                    href={item.href}
                                                                    className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                                                >
                                                                    <item.icon
                                                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                                                        aria-hidden="true"/>
                                                                    <span className="ml-3">{item.name}</span>
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
                        </Popover.Group>
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            {session ?
                                <Link href="/account" passHref={true}>
                                    <a className="flex-shrink-0 group block">
                                        <div className="flex items-center">
                                            <div>
      <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path
              d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      </span>
                                            </div>
                                            <div className="ml-3 w-36">
                                                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 max-w-12 truncate">{session.user.email}</p>
                                                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Gerenciar
                                                    minha conta</p>
                                            </div>
                                        </div>
                                    </a>
                                </Link> :
                                <a
                                    href="#"
                                    onClick={() => setShowLoginModal(true)}
                                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Minha conta
                                </a>
                            }
                        </div>
                    </div>
                </div>

                <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel focus
                                   className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                        <div
                            className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                                            alt="Workflow"
                                        />
                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button
                                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true"/>
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-8">
                                        {solutions.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                            >
                                                <item.icon className="flex-shrink-0 h-6 w-6 text-blue-600"
                                                           aria-hidden="true"/>
                                                <span
                                                    className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                            <div className="py-6 px-5 space-y-6">
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                        Pricing
                                    </a>

                                    <a href="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                        Docs
                                    </a>
                                </div>
                                <div>
                                    {session ?
                                        <Link href="/account" passHref={true}>
                                            <a className="flex-shrink-0 group block">
                                                <div className="flex items-center">
                                                    <div>
      <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path
              d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      </span>
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-xs font-medium text-gray-700 group-hover:text-gray-900">{session.user.email}</p>
                                                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">Gerenciar
                                                            minha conta</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link> :
                                        <a
                                            href="#"
                                            onClick={() => setShowLoginModal(true)}
                                            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            Minha conta
                                        </a>
                                    }
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </div>
        </Popover>
    )
}