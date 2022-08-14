import Navbar from "../../components/Navbar";
import Head from "next/head";
import AccountInfoForm from "../../components/AccountInfoForm";
import React from "react";
import {supabaseClient} from "../../supabase";
import AccountNavigation from "../../components/AccountNavigation";


export default function AccountPage() {
    const [updatingAccountInfo, setUpdatingAccountInfo] = React.useState(false);

    const updateAccountInfo = async (data) => {
        setUpdatingAccountInfo(true);

        const accountInfo = await supabaseClient.from('user_info').update({
            first_name: data.firstName,
            last_name: data.lastName,
            sex: data.sex
        }).match({user_id: supabaseClient.auth.user().id});

        setUpdatingAccountInfo(false);
    };

    return (
        <>
            <Head>
                <title>Skopdoc: Informações pessoais</title>
            </Head>

            <div className="h-screen bg-gray-100">
                <Navbar/>
                <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                        <AccountNavigation current="/account"/>

                        {/* Informacoes Pessoais */}
                        <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                            <AccountInfoForm onSubmit={updateAccountInfo} isLoading={updatingAccountInfo}/>
                        </div>

                    </div>
                </main>
            </div>
        </>
    )
}