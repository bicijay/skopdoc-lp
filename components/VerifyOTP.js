import React from 'react';
import {CheckIcon, LockClosedIcon} from "@heroicons/react/outline";
import {useForm} from "react-hook-form";
import {supabaseClient} from "../supabase";
import {Dialog} from '@headlessui/react'
import {useGlobalStore} from "../store/store";

const VerifyOTP = ({verifyingEmail, setVerifyingEmail}) => {
    const setShowLoginModal = useGlobalStore(state => state.setShowLoginModal);
    const {register, handleSubmit, formState: {isSubmitting}} = useForm();
    const [success, setSuccess] = React.useState(false);

    const onSubmit = async (data) => {

        try {
            const verifyOtp = await supabaseClient.auth.verifyOTP({
                type: "magiclink",
                email: verifyingEmail,
                token: data.otp
            });

            if (verifyOtp.error) {
                throw new Error(verifyOtp.error.message);
            }

            setSuccess(true);
            setTimeout(() => {
                setShowLoginModal(false);
                setSuccess(false);
                setVerifyingEmail(false);
            }, 3000);
        } catch (e) {
            alert(e.message);
        }
    }

    if (success) {
        return (
            <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Sucesso na verificação
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Aguarde um momento enquanto te redirecionamos para plataforma.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8">
                <div className="justify-center items-center flex flex-col">
                    <LockClosedIcon className="h-12 w-12 text-gray-600 group-hover:text-blue-400 mb-7"
                                    aria-hidden="true"/>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Código de acesso</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enviamos um código de acesso para {verifyingEmail}
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                autoFocus
                                id="otp-code"
                                name="otp"
                                type="number"
                                {...register('otp', {required: 'Insira seu código de acesso'})}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-md"
                                placeholder="Insira seu código de acesso"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true"/>
                </span>
                            Verificar
                        </button>
                        <p className="mt-4 text-center text-sm text-gray-600">
                            <a href="#" onClick={() => setVerifyingEmail(false)}
                               className="font-medium text-blue-600 hover:text-blue-500">
                                Entrar com outra conta
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default VerifyOTP;