import React from 'react';
import {useForm} from "react-hook-form";
import {supabaseClient} from "../supabase";


const AccountInfoForm = ({onSubmit, isLoading = false}) => {
    const {register, handleSubmit, setValue} = useForm();

    const onFormSubmit = (data) => {
        onSubmit(data);
    }

    const setUserInfo = async () => {
        const {data, error} = await supabaseClient.from('user_info').select().single();
        if (error) return;

        setValue('firstName', data?.first_name);
        setValue('lastName', data?.last_name);
        setValue('sex', data?.sex);
    }

    React.useEffect(() => {
        setUserInfo();
    }, []);

    return (
        <section aria-labelledby="payment-details-heading">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
                        <div>
                            <h2 id="payment-details-heading"
                                className="text-lg leading-6 font-medium text-gray-900">
                                Informações pessoais
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Mantenha suas informações pessoais sempre atualizadas.
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-4 gap-6">

                            <div className="col-span-4 sm:col-span-2">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium text-gray-700">
                                    Nome
                                </label>
                                <input
                                    {...register('firstName', {required: 'Insira seu nome'})}
                                    type="text"
                                    name="firstName"
                                    id="first-name"
                                    placeholder="Insira seu nome"
                                    autoComplete="cc-given-name"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                />
                            </div>

                            <div className="col-span-4 sm:col-span-2">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium text-gray-700">
                                    Sobrenome
                                </label>
                                <input
                                    {...register('lastName', {required: 'Insira seu sobrenome'})}
                                    type="text"
                                    name="lastName"
                                    id="last-name"
                                    placeholder="Insira seu sobrenome"
                                    autoComplete="cc-given-name"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                />
                            </div>

                            <fieldset className="col-span-4 sm:col-span-2">
                                <legend className="contents text-base font-medium text-gray-900">Título</legend>
                                <p className="text-sm text-gray-500">Como prefere ser chamado?</p>
                                <div className="mt-4 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            {...register('sex')}
                                            id="gender-male"
                                            name="sex"
                                            type="radio"
                                            value="M"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label htmlFor="gender-male"
                                               className="ml-3 block text-sm font-medium text-gray-700">
                                            Dr.
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            {...register('sex')}
                                            id="gender-female"
                                            name="sex"
                                            type="radio"
                                            value="F"
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label htmlFor="gender-female"
                                               className="ml-3 block text-sm font-medium text-gray-700">
                                            Dra.
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            {...register('sex')}
                                            id="gender-other"
                                            name="sex"
                                            type="radio"
                                            value={undefined}
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                        />
                                        <label htmlFor="gender-other"
                                               className="ml-3 block text-sm font-medium text-gray-700">
                                            Nenhum
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50">
                            Salvar informações
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );

}

export default AccountInfoForm;