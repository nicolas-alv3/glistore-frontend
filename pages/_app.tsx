import '../styles/globals.css'
import "react-loading-skeleton/dist/skeleton.css";
import type {AppProps} from 'next/app';
import 'semantic-ui-css/semantic.min.css';
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import PageHeader from "../src/components/PageHeader";
import {Container} from "semantic-ui-react";
import Footer from "../src/components/Footer";
import {store} from '../slices/store'
import {Provider} from 'react-redux'
import Head from "next/head";
import {useConfig} from "../src/hooks/useConfig";
import { UserProvider } from '@auth0/nextjs-auth0';
import {useRouter} from "next/router";



function MyApp({Component, pageProps}: AppProps) {
    const {config} = useConfig();
    const router = useRouter();

    const preloaderEffect = () => {
        if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
            if (loader){
                setTimeout(() => {
                    loader.className = "hidden"
                },1500);
                setTimeout( () => {
                    loader.style.display = 'none';
                }, 3000)
            }
        }
    }
    // Hide splash screen when we are client side
    useEffect(() => {
        //preloaderEffect()
    }, []);

    const isHomePage = router.pathname === "/"

    return <Provider store={store}>
        <UserProvider>
        <Head>
            <title>{config.companyName}</title>
            <link rel="icon" href={config.logo}/>
        </Head>
            {!isHomePage && <PageHeader/>}
        <Container>
            <Component {...pageProps} />
        </Container>
            <Footer/>
        <Toaster position="bottom-left"/>
        </UserProvider>
    </Provider>
}

export default MyApp
