import React from 'react';
import Head from "next/head";
import Navbar from "../components/Navbar";
import {CheckIcon} from "@heroicons/react/outline";
import BillingDetails from "../components/BillingDetails";
import SelectPlanDetails from "../components/SelectPlanDetails";
import {useGlobalStore} from "../store/store";
import LoginForm from "../components/LoginForm";
import PaymentLink from "../components/PaymentLink";
import {supabaseClient} from "../supabase";
import {useRouter} from "next/router";

const SubscribePage = () => {
    const router = useRouter();
    const session = useGlobalStore(state => state.session);
    const [priceId, setPriceId] = React.useState(false);
    const [currentStep, setCurrentStep] = React.useState(2);
    const steps = [
        {id: 0, name: 'Realizar Login'},
        {id: 1, name: 'Detalhes de cobrança'},
        {id: 2, name: 'Escolha seu plano'},
        {id: 3, name: 'Realizar pagamento'},
    ]

    const onLogin = async (data) => {
        setCurrentStep(1);
    }

    const onBilling = async (data) => {
        setCurrentStep(2);
    }

    const onPlan = async (priceId) => {
        setPriceId(priceId);
        setCurrentStep(3);
    }

    const _onStepChange = (stepId) => {
        if (stepId > currentStep) {
            return;
        }

        if (stepId === 0) {
            return;
        }

        setCurrentStep(stepId);
    }

    const _isCurrent = (stepId) => {
        return currentStep === stepId;
    }

    const _isComplete = (stepId) => {
        return currentStep > stepId;
    }

    const getEntitlement = async() => {
        const entitlementResponse = await supabaseClient.rpc('get_entitlements', {
            _user_id: supabaseClient.auth.user().id
        });

        if(!entitlementResponse?.data?.[0]) {
            return;
        }

        router.push('/account/subscription');
    }


    React.useEffect(() => {
        if (session) {
            setCurrentStep(1);
        } else {
            setCurrentStep(0);
        }
    }, [session]);

    React.useEffect(() => {
        getEntitlement();
    }, []);

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
                    <nav aria-label="Progress">
                        <ol role="list"
                            className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0 bg-white">
                            {steps.map((step, stepIdx) => (
                                <li key={step.name} className="relative md:flex-1 md:flex cursor-pointer"
                                    onClick={() => _onStepChange(step.id)}>
                                    {_isComplete(step.id) ? (
                                        <a href={step.href} className="group flex items-center w-full">
                <span className="px-6 py-4 flex items-center text-sm font-medium">
                  <span
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-800">
                    <CheckIcon className="w-6 h-6 text-white" aria-hidden="true"/>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                </span>
                                        </a>
                                    ) : _isCurrent(step.id) ? (
                                        <a className="px-6 py-4 flex items-center text-sm font-medium"
                                           aria-current="step">
                <span
                    className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-blue-600 rounded-full">
                  <span className="text-blue-600">{step.id}</span>
                </span>
                                            <span className="ml-4 text-sm font-medium text-blue-600">{step.name}</span>
                                        </a>
                                    ) : (
                                        <a href={step.href} className="group flex items-center">
                <span className="px-6 py-4 flex items-center text-sm font-medium">
                  <span
                      className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
                </span>
                                        </a>
                                    )}

                                    {stepIdx !== steps.length - 1 ? (
                                        <>
                                            {/* Arrow separator for lg screens and up */}
                                            <div className="hidden md:block absolute top-0 right-0 h-full w-5"
                                                 aria-hidden="true">
                                                <svg
                                                    className="h-full w-full text-gray-300"
                                                    viewBox="0 0 22 80"
                                                    fill="none"
                                                    preserveAspectRatio="none"
                                                >
                                                    <path
                                                        d="M0 -2L20 40L0 82"
                                                        vectorEffect="non-scaling-stroke"
                                                        stroke="currentcolor"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </>
                                    ) : null}
                                </li>
                            ))}
                        </ol>
                    </nav>

                    {currentStep === 0 &&
                        <div className="mt-6 shadow sm:rounded-md sm:overflow-hidden bg-white">
                            <LoginForm onSubmit={onLogin}/>
                        </div>
                    }

                    {currentStep === 1 &&
                        <div className="mt-6">
                            <BillingDetails onSubmit={onBilling}/>
                        </div>
                    }

                    {currentStep === 2 &&
                        <div className="mt-6">
                            <SelectPlanDetails onSubmit={onPlan}/>
                        </div>
                    }

                    {currentStep === 3 &&
                        <PaymentLink priceId={priceId}/>
                    }
                </main>
            </div>
        </>
    );

}

export default SubscribePage;