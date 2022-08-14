import '../styles/globals.css'
import React, {Fragment} from "react";
import {supabaseClient} from "../supabase";
import LoginModal from "../components/LoginModal";
import {useGlobalStore} from "../store/store";

function MyApp({Component, pageProps}) {
    const setSession = useGlobalStore(state => state.setSession);

    const _onAuth = async (session) => {
        if (session) {
            setSession(session);
            return;
        }

        setSession(undefined);
    }

    React.useEffect(() => {
        if (supabaseClient.auth.session()) {
            _onAuth(supabaseClient.auth.session());
        }

        const {data: listener} = supabaseClient.auth.onAuthStateChange(async (event, session) => {
            await _onAuth(session);
        });

        return () => {
            listener?.unsubscribe()
        }
    }, []);

    return (
        <Fragment>
            <LoginModal/>
            <Component {...pageProps} />
        </Fragment>
    )
}

export default MyApp
