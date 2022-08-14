import React, {Fragment} from 'react';
import {RadioGroup} from '@headlessui/react'
import {CheckCircleIcon} from "@heroicons/react/outline";
import {useForm, Controller} from "react-hook-form";
import InputMask from "react-input-mask";
import {supabaseClient} from "../supabase";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const BillingDetails = ({onSubmit, isLoading}) => {
    const {register, handleSubmit, setValue, watch, control, formState} = useForm();
    const tipoPessoa = watch('tipoPessoa');

    const onFormSubmit = async (data) => {
        try {
            const payload = {
                tipo_pessoa: data.tipoPessoa,
                nome_completo: data?.nomeCompleto?.trim(),
                razao_social: data?.razaoSocial?.trim(),
                cpf: data?.cpf?.trim(),
                cnpj: data?.cnpj?.trim(),
                cep: data?.cep?.trim(),
                logradouro: data?.endereco?.trim(),
                numero: data?.numero?.trim(),
                bairro: data?.bairro?.trim(),
                cidade: data?.cidade?.trim(),
                uf: data?.estado?.trim(),
            };

            const billingRes = await supabaseClient.from('billing_details').select();
            if (billingRes.error) throw new Error(billingRes.error.message);

            const billingInfoId = billingRes.data?.[0]?.id;

            if (billingInfoId) {
                const updateBilling = await supabaseClient.from('billing_details')
                    .update(payload)
                    .match({id: billingInfoId})
                if (updateBilling.error) throw new Error(updateBilling.error.message);
            } else {
                const insertBilling = await supabaseClient.from('billing_details').insert([payload]);
                if (insertBilling.error) throw new Error(insertBilling.error.message);
            }

            onSubmit(data)
        } catch (e) {
            console.log(e);
        }
    }

    const onCepInput = async () => {
        try {
            const formattedCep = watch('cep');
            const response = await fetch(`https://viacep.com.br/ws/${formattedCep}/json`);
            const data = await response.json();

            setValue('endereco', data?.logradouro);
            setValue('bairro', data?.bairro);
            setValue('cidade', data?.localidade);
            setValue('estado', data?.uf);
        } catch (e) {
            setValue('endereco', null);
            setValue('bairro', null);
            setValue('cidade', null);
            setValue('estado', null);
        }
    };

    const setBillingDetails = async () => {
        try {
            const billingRes = await supabaseClient.from('billing_details').select();
            if (billingRes.error) throw new Error(billingRes.error.message);

            const billingDetails = billingRes?.data?.[0];
            if(!billingDetails) return;

            setValue('tipoPessoa', billingDetails?.tipo_pessoa);
            setValue('nomeCompleto', billingDetails?.nome_completo);
            setValue('razaoSocial', billingDetails?.razao_social);
            setValue('cpf', billingDetails?.cpf);
            setValue('cnpj', billingDetails?.cnpj);
            setValue('cep', billingDetails?.cep);
            setValue('endereco', billingDetails?.logradouro);
            setValue('numero', billingDetails?.numero);
            setValue('bairro', billingDetails?.bairro);
            setValue('cidade', billingDetails?.cidade);
            setValue('estado', billingDetails?.uf);
        } catch (e) {
            console.log(e);
        }
    };

    const _renderInputs = () => {
        if (!tipoPessoa) {
            return null;
        }

        if (tipoPessoa === 'PF') {
            return (
                <Fragment>
                    <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="fullName"
                               className="block text-sm font-medium text-gray-700">
                            Nome Completo
                        </label>
                        <input
                            {...register('nomeCompleto', {required: true})}
                            key="fullName"
                            type="text"
                            id="fullName"
                            placeholder="Insira seu nome completo"
                            autoComplete="name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="cpf"
                               className="block text-sm font-medium text-gray-700">
                            CPF
                        </label>
                        <InputMask
                            {...register('cpf', {required: true})}
                            mask="999.999.999-99"
                            key="cpf"
                            type="text"
                            id="cpf"
                            placeholder="Insira seu CPF"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                    </div>
                </Fragment>
            )
        }

        if (tipoPessoa === "PJ") {
            return (
                <Fragment>
                    <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="razaoSocial"
                               className="block text-sm font-medium text-gray-700">
                            Razão Social
                        </label>
                        <input
                            {...register('razaoSocial', {required: true})}
                            key="razaoSocial"
                            type="text"
                            id="razaoSocial"
                            placeholder="Insira a razão social da empresa"
                            autoComplete="organization"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                        <label htmlFor="cnpj"
                               className="block text-sm font-medium text-gray-700">
                            CNPJ
                        </label>
                        <InputMask
                            {...register('cnpj', {required: true})}
                            mask="99.999.999/9999-99"
                            key="cnpj"
                            type="text"
                            id="cnpj"
                            placeholder="Insira o CNPJ da empresa"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                    </div>
                </Fragment>
            )
        }
    }

    React.useEffect(() => {
        setBillingDetails();
    }, [])

    return (
        <section aria-labelledby="payment-details-heading">
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="bg-white py-6 px-4 sm:p-6">
                        <div>
                            <h2 id="payment-details-heading"
                                className="text-lg leading-6 font-medium text-gray-900">
                                Detalhes de cobrança
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Atualize suas informações de cobrança, lembre-se que as notas fiscais serão geradas de
                                acordo com os dados informados aqui.
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-4 gap-6">

                            <div className="col-span-4">
                                <Controller control={control} name="tipoPessoa"
                                            rules={{required: 'Insira o seu tipo de pessoa'}}
                                            render={({field}) => (
                                                <RadioGroup value={field.value} onChange={field.onChange}>
                                                    <div
                                                        className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                                        <RadioGroup.Option
                                                            key={"pf"}
                                                            value="PF"
                                                            className={({checked, active}) =>
                                                                classNames(
                                                                    checked ? 'border-transparent' : 'border-gray-300',
                                                                    active ? 'border-blue-500 ring-2 ring-blue-500' : '',
                                                                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                                                )
                                                            }
                                                        >
                                                            {({checked, active}) => (
                                                                <>
                <span className="flex-1 flex">
                  <span className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      Pessoa Física
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                      Marque essa opção caso seja pessoa física
                    </RadioGroup.Description>
                  </span>
                </span>
                                                                    <CheckCircleIcon
                                                                        className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-blue-600')}
                                                                        aria-hidden="true"
                                                                    />
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'border' : 'border-2',
                                                                            checked ? 'border-blue-500' : 'border-transparent',
                                                                            'absolute -inset-px rounded-lg pointer-events-none'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                        <RadioGroup.Option
                                                            key={"pj"}
                                                            value="PJ"
                                                            className={({checked, active}) =>
                                                                classNames(
                                                                    checked ? 'border-transparent' : 'border-gray-300',
                                                                    active ? 'border-blue-500 ring-2 ring-blue-500' : '',
                                                                    'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                                                )
                                                            }
                                                        >
                                                            {({checked, active}) => (
                                                                <>
                <span className="flex-1 flex">
                  <span className="flex flex-col">
                    <RadioGroup.Label as="span" className="block text-sm font-medium text-gray-900">
                      Pessoa Jurídica
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="mt-1 flex items-center text-sm text-gray-500">
                      Marque essa opção caso seja pessoa jurídica
                    </RadioGroup.Description>
                  </span>
                </span>
                                                                    <CheckCircleIcon
                                                                        className={classNames(!checked ? 'invisible' : '', 'h-5 w-5 text-blue-600')}
                                                                        aria-hidden="true"
                                                                    />
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'border' : 'border-2',
                                                                            checked ? 'border-blue-500' : 'border-transparent',
                                                                            'absolute -inset-px rounded-lg pointer-events-none'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    </div>
                                                </RadioGroup>
                                            )}
                                />
                            </div>

                            {_renderInputs()}
                            {tipoPessoa &&
                                <Fragment>
                                    <div className="col-span-4 sm:col-span-1">
                                        <label htmlFor="cep"
                                               className="block text-sm font-medium text-gray-700">
                                            CEP
                                        </label>
                                        <InputMask
                                            {...register('cep', {required: true})}
                                            mask="99999-999"
                                            onBlur={onCepInput}
                                            type="text"
                                            id="cep"
                                            placeholder="Insira seu CEP"
                                            autoComplete="postal-code"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                        />
                                    </div>
                                    <div className="col-span-4 sm:col-span-2">
                                        <label htmlFor="address"
                                               className="block text-sm font-medium text-gray-700">
                                            Logradouro
                                        </label>
                                        <input
                                            {...register('endereco', {required: true})}
                                            type="text"
                                            id="address"
                                            placeholder="Insira seu endereço"
                                            autoComplete="street-address"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                        />
                                    </div>
                                    <div className="col-span-4 sm:col-span-1">
                                        <label htmlFor="addressNumber"
                                               className="block text-sm font-medium text-gray-700">
                                            Número
                                        </label>
                                        <input
                                            {...register('numero', {required: true})}
                                            type="text"
                                            id="addressNumber"
                                            placeholder="Insira o número"
                                            autoComplete="address-level3"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                        />
                                    </div>
                                    <div className="col-span-4 sm:col-span-1">
                                        <label htmlFor="bairro"
                                               className="block text-sm font-medium text-gray-700">
                                            Bairro
                                        </label>
                                        <input
                                            {...register('bairro', {required: true})}
                                            type="text"
                                            id="bairro"
                                            placeholder="Insira seu bairro"
                                            autoComplete="address-level3"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                        />
                                    </div>
                                    <div className="col-span-4 sm:col-span-2">
                                        <label htmlFor="cidade"
                                               className="block text-sm font-medium text-gray-700">
                                            Cidade
                                        </label>
                                        <input
                                            {...register('cidade', {required: true})}
                                            type="text"
                                            id="cidade"
                                            placeholder="Insira sua cidade"
                                            autoComplete="address-level3"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                        />
                                    </div>
                                    <div className="col-span-4 sm:col-span-1">
                                        <label htmlFor="estado"
                                               className="block text-sm font-medium text-gray-700">
                                            Estado
                                        </label>
                                        <input
                                            {...register('estado', {required: true})}
                                            type="text"
                                            id="estado"
                                            placeholder="Insira seu estado"
                                            autoComplete="address-level3"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                                        />
                                    </div>
                                </Fragment>
                            }
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            disabled={formState.isSubmitting}
                            className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
                        >
                            Salvar informações
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );

}

export default BillingDetails;