import React from 'react';
import Head from "next/head";
import Navbar from "../components/Navbar";
import {CashIcon, CheckIcon, XIcon} from "@heroicons/react/outline";
import {useRouter} from "next/router";
import Link from "next/link";

const SubscribeCallbackPage = () => {
    const router = useRouter();
    const [status, setStatus] = React.useState();

    React.useEffect(() => {
        if (router?.query?.status) {
            setStatus(router.query.status);
        }
    }, [router]);

    return (
        <>
            <Head>
                <title>Skopdoc: Realizar assinatura</title>
            </Head>
            <Navbar/>
            <div className="h-screen bg-gray-100">
                <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
                    <div className="max-w-7xl mx-auto mb-6 px-6 pt-6 md:px-0 md:pt-0">
                        <h1 className="text-3xl font-bold leading-tight text-gray-900">Realizar assinatura</h1>
                    </div>

                    <div className="mt-6 shadow sm:rounded-md sm:overflow-hidden bg-white py-16">
                        {status &&
                            <div className="justify-center items-center flex flex-col">

                                {status === 'success' ?
                                    <div
                                        className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                                    </div> :
                                    <div
                                        className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                                        <XIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                                    </div>
                                }

                                {status === 'success' ?
                                    <h2 className="text-center text-3xl font-extrabold text-gray-900 mt-4">Pagamento
                                        realizado com sucesso!</h2> :
                                    <h2 className="text-center text-3xl font-extrabold text-gray-900 mt-4">Ocorreu um
                                        erro no pagamento.</h2>
                                }

                                {status === 'success' ?
                                    <p className="mt-2 text-center text-sm text-gray-600">
                                        O pagamento está sendo analisado. Seu plano será ativado minutos após o pagamento...
                                    </p> :
                                    <p className="mt-2 text-center text-sm text-gray-600">
                                        Ocorreu um erro na hora do pagamento. Realize o processo novamente com uma nova
                                        forma de pagamento.
                                    </p>
                                }

                                <div className="mt-10 flex flex-col items-center">
                                    {status === 'success' ?
                                        <Link href="/account" passHref={true}>
                                            <a className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                                                Acessar minha conta
                                            </a>
                                        </Link> :
                                        <Link href="/subscribe" passHref={true}>
                                            <a className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                                                Realizar pagamento novamente
                                            </a>
                                        </Link>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </main>
            </div>
        </>
    );

}

export default SubscribeCallbackPage;