import {useState, useRef} from 'react';
import {LockClosedIcon} from "@heroicons/react/outline";
import VerifyOTP from "./VerifyOTP";
import {supabaseClient} from "../supabase";
import {useForm} from "react-hook-form";

const LoginForm = ({onSubmit}) => {
    const emailInput = useRef(null);
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm();
    const [verifyingEmail, setVerifyingEmail] = useState(false);

    const onFormSubmit = async (data) => {
        try {
            const authSubmit = await supabaseClient.auth.signIn({email: data.email});

            if (authSubmit.error) {
                throw new Error(authSubmit.error.message)
            }

            setVerifyingEmail(data.email);
        } catch (e) {
            alert(e.message);
        }
    }

    const onEmailVerified = (verified) => {
        if(verified && onSubmit) {
            onSubmit(true);
        }

        setVerifyingEmail(verified);
    }

    return (
        <div>
            {verifyingEmail ?
                <VerifyOTP verifyingEmail={verifyingEmail} setVerifyingEmail={onEmailVerified}/> :
                <div
                    className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-lg w-full space-y-8">
                        <div className="justify-center items-center flex flex-col">
                            <img
                                className="mx-auto h-20 w-auto mb-8"
                                src="/logo-blue-without-text.png"
                                alt="Skopdoc"
                            />
                            <h2 className="text-center text-3xl font-extrabold text-gray-900">Entrar
                                na
                                minha conta</h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Uma nova conta será criada caso você não seja cadastrado.
                            </p>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
                            <input type="hidden" name="remember" defaultValue="true"/>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        autoFocus
                                        ref={emailInput}
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        {...register('email', {required: 'Insira um e-mail'})}
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                        placeholder="Insira seu endereço de e-mail"
                                    />
                                </div>
                            </div>

                            <div>
                                {/*<div className="my-4">*/}
                                {/*    <ErrorAlert errors={["teste"]}/>*/}
                                {/*</div>*/}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true"/>
                </span>
                                    Continuar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    );

}

export default LoginForm;