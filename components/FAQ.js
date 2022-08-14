/* This example requires Tailwind CSS v2.0+ */
import {Disclosure} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/outline'

const faqs = [
    {
        id: 1,
        question: 'Preciso pagar algum valor para testar?',
        answer: 'O teste é totalmente grátis e possui tempo ilimitado. Porém, você possui um limite de até 30 fotos armazenadas no plano Skop Free.',
    },
    {
        id: 4,
        question: 'O app possui uma versão web?',
        answer: 'Por enquanto não, porém nossa versão web já esta em desenvolvimento. Após o período de desenvolvimento você conseguirá acessar suas fotos em qualquer dispositivo.',
    },
    {
        id: 5,
        question: 'Onde as minhas fotos ficam armazenadas?',
        answer: 'As fotos ficam armazenadas em nossos servidores de forma isolada e criptografadas de ponta a ponta utilizando SSL no cliente e SSE-KMS nos servidores.',
    },
    {
        id: 2,
        question: 'Posso cancelar minha assinatura a qualquer momento?',
        answer: 'Você pode cancelar sua assinatura a qualquer momento. Lembrando que após o cancelamento suas fotos ficarão armazenadas por um tempo limite nos nossos servidores. Você pode solicitar o backup das suas imagens a qualquer momento.',
    },
    {
        id: 3,
        question: 'Após o cancelamento, por quanto tempo minhas fotos ficam armazenadas?',
        answer: 'Após o cancelamento da sua assinatura, suas fotos ficarão armazenadas por até 3 meses nos nossos servidores. Após esse período, enviaremos um backup das suas fotos para o email cadastrado. Lembrando que você pode pedir o backup a qualquer momento.',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function FAQ() {
    return (
        <div className="bg-white" id="faq">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">Perguntas Frequentes</h2>
                    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-6">
                                {({open}) => (
                                    <>
                                        <dt className="text-lg">
                                            <Disclosure.Button
                                                className="text-left w-full flex justify-between items-start text-gray-400">
                                                <span className="font-medium text-gray-900">{faq.question}</span>
                                                <span className="ml-6 h-7 flex items-center">
                          <ChevronDownIcon
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                              aria-hidden="true"
                          />
                        </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                            <p className="text-base text-gray-500">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}