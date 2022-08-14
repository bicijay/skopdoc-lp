import React from 'react'
import {RadioGroup} from '@headlessui/react'
import {Controller, useForm} from "react-hook-form";
import {skopdocApi} from "../api";

const plans = [
    {name: 'Hobby', ram: '8GB', cpus: '4 CPUs', disk: '160 GB SSD disk', price: '$40'},
    {name: 'Startup', ram: '12GB', cpus: '6 CPUs', disk: '256 GB SSD disk', price: '$80'},
    {name: 'Business', ram: '16GB', cpus: '8 CPUs', disk: '512 GB SSD disk', price: '$160'},
    {name: 'Enterprise', ram: '32GB', cpus: '12 CPUs', disk: '1024 GB SSD disk', price: '$240'},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SelectPlanDetails = ({onSubmit, isLoading}) => {
    const {handleSubmit, control} = useForm();
    const [plans, setPlans] = React.useState([]);
    const [selectedInterval, setSelectedInterval] = React.useState('month');

    const onFormSubmit = (data) => {
        const priceId = data.selectedPrice.prices.filter((price) => price.interval === selectedInterval)?.[0].id;

        if (priceId) {
            onSubmit(priceId);
        }
    }

    const findPlans = async () => {
        const plansRes = await skopdocApi.get('public/subscriptions/plans');
        const plans = plansRes.data;

        setPlans(plans.reverse());
    }

    React.useEffect(() => {
        findPlans();
    }, []);

    return (
        <section aria-labelledby="payment-details-heading">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="shadow sm:rounded-md sm:overflow-hidden bg-white">
                    <div className="bg-white py-6 px-4 sm:p-6">
                        <div>
                            <h2 id="payment-details-heading"
                                className="text-lg leading-6 font-medium text-gray-900">
                                Escolha seu plano
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Selecione o plano ideal para você ou sua clínica.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-lg pb-12 pt-6 mx-auto">
                        <Controller control={control}
                                    name="selectedPrice"
                                    render={({field}) => (
                                        <RadioGroup value={field.value} onChange={field.onChange}>
                                            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                            <div className="space-y-4">
                                                {plans.map((plan) => (
                                                    <RadioGroup.Option
                                                        key={plan.name}
                                                        value={plan}
                                                        className={({checked, active}) =>
                                                            classNames(
                                                                checked ? 'border-transparent' : 'border-gray-300',
                                                                active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
                                                                'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none'
                                                            )
                                                        }
                                                    >
                                                        {({active, checked}) => (
                                                            <>
                <span className="flex items-center">
                  <span className="text-sm flex flex-col">
                    <RadioGroup.Label as="span" className="font-medium text-gray-900">
                      {plan.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="text-gray-500">
                      <span className="block sm:inline">
                        {plan.desc}
                      </span>{' '}
                    </RadioGroup.Description>
                  </span>
                </span>
                                                                <RadioGroup.Description
                                                                    as="span"
                                                                    className="mt-2 flex text-sm sm:mt-0 sm:flex-col sm:ml-4 sm:text-right"
                                                                >
                                                                    <span
                                                                        className="font-medium text-gray-900">
                                                                        R$ {(plan.prices.filter((price) => price.interval === 'month')?.[0].amount / 100).toFixed(2).replace('.', ',')}
                                                                    </span>
                                                                    <span
                                                                        className="ml-1 text-gray-500 sm:ml-0">/mês</span>
                                                                </RadioGroup.Description>
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'border' : 'border-2',
                                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                                        'absolute -inset-px rounded-lg pointer-events-none'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            </>
                                                        )}
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    )}
                        />
                    </div>

                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
                        >
                            Selecionar plano
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );

}

export default SelectPlanDetails;