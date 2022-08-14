import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {LockClosedIcon, XIcon} from '@heroicons/react/outline'
import {useGlobalStore} from "../store/store";
import {useForm} from "react-hook-form";
import {supabaseClient} from "../supabase";
import VerifyOTP from "./VerifyOTP";
import LoginForm from "./LoginForm";

const LoginModal = () => {
    const showLoginModal = useGlobalStore(state => state.showLoginModal);
    const setShowLoginModal = useGlobalStore(state => state.setShowLoginModal);

    return (
        <Transition.Root show={showLoginModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => console.log()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-start sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative bg-white rounded-lg px-4 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                <div className="block absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => setShowLoginModal(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>
                                </div>
                                <LoginForm/>
                            </Dialog.Panel>


                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );

}

export default LoginModal;