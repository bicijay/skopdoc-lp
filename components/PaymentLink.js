import {useState, useEffect} from 'react';
import {CashIcon, RefreshIcon} from "@heroicons/react/outline";
import {skopdocApi} from "../api";

const PaymentLink = ({priceId}) => {
    const [loading, setLoading] = useState(false);
    const [paymentLink, setPaymentLink] = useState(false);

    const createPaymentLink = async () => {
        setLoading(true);

        try {
            const response = await skopdocApi.get('/subscriptions/checkout-session/' + priceId);
            const url = response?.data?.url;
            setPaymentLink(url);

            window.location.href = url;
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        createPaymentLink();
    }, []);

    return (
        <div className="mt-6 shadow sm:rounded-md sm:overflow-hidden bg-white py-16">
            <div className="justify-center items-center flex flex-col">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <CashIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mt-4">Realize o pagamento</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Aguarde um momento enquanto redirecionamos você ao link de pagamento.
                </p>

                <div className="mt-10 flex flex-col items-center">
                    {(!paymentLink || loading) ?
                        <RefreshIcon className="animate-spin transform rotate-180 text-gray-300 h-12 w-12"/> :
                        <button
                            disabled={!paymentLink || loading}
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                            Acessar o link de pagamento manualmente
                        </button>
                    }
                </div>
            </div>
        </div>
    );

}

export default PaymentLink;