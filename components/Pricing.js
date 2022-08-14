/* This example requires Tailwind CSS v2.0+ */
import {CheckIcon} from '@heroicons/react/solid'
import Link from "next/link";

const tiers = [
    {
        name: 'Teste Grátis',
        href: '#',
        priceMonthly: 0,
        description: 'Ideal para começar seu teste e avaliar o nosso app',
        includedFeatures: [
            '50MB de armazenamento',
            'Apenas 1 usuário',
            'Backup criptografado na nuvem',
        ],
    },
    {
        name: 'Skop 20',
        href: '#',
        priceMonthly: 49,
        description: 'Ideal para profissionais individuais com pequenos consultórios.',
        includedFeatures: [
            '20GB de armazenamento',
            'Até 3 usuários',
            'Backup criptografado na nuvem',
            'Acesso a todas as funcionalidades',
        ],
    },
    {
        name: 'Skop 100',
        href: '#',
        priceMonthly: 299,
        description: 'Ideal para clínicas com grande volume de pacientes.',
        includedFeatures: [
            '100GB de armazenamento',
            'Usuários ilimitados',
            'Backup criptografado na nuvem',
            'Acesso a todas as funcionalidades',
        ],
    },
    {
        name: 'Skop 500',
        href: '#',
        priceMonthly: 799,
        description: 'Ideal para clínicas com grande volume de pacientes.',
        includedFeatures: [
            '500GB de armazenamento',
            'Usuários ilimitados',
            'Backup criptografado na nuvem',
            'Acesso a todas as funcionalidades',
        ],
    },
]

export default function Example() {
    return (
        <div className="bg-white" id="precos">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:flex-col sm:align-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Nossos planos</h1>
                    <p className="mt-5 text-xl text-gray-500 sm:text-center lg:px-20">
                        Comece realizando um teste grátis no nosso app, realize sua assinatura para desbloquear todo o
                        conteúdo do app e aumente seu armazenamento.
                    </p>
                </div>
                <div
                    className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
                    {tiers.map((tier) => (
                        <div key={tier.name}
                             className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
                            <div className="p-6">
                                <h2 className="text-lg leading-6 font-medium text-gray-900">{tier.name}</h2>
                                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                                <p className="mt-8">
                                    <span
                                        className="text-4xl font-extrabold text-gray-900">R${tier.priceMonthly}</span>{' '}
                                    <span className="text-base font-medium text-gray-500">/mês</span>
                                </p>
                                <Link href="/subscribe" passHref={true}>
                                    <a className="mt-8 block w-full bg-blue-600 border border-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-800">
                                        Assine {tier.name}
                                    </a>
                                </Link>
                            </div>
                            <div className="pt-6 pb-8 px-6">
                                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">Recursos
                                    incluídos</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {tier.includedFeatures.map((feature) => (
                                        <li key={feature} className="flex space-x-3">
                                            <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500"
                                                       aria-hidden="true"/>
                                            <span className="text-sm text-gray-500">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}