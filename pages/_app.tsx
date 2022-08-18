import '../styles/globals.css'
import "react-loading-skeleton/dist/skeleton.css";
import type {AppProps} from 'next/app';
import 'semantic-ui-css/semantic.min.css';
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import PageHeader from "../src/components/PageHeader";
import Head from "next/head";
import {getConfig} from "../src/hooks/getConfig";
import {Container} from "semantic-ui-react";
import Footer from "../src/components/Footer";
import {store} from '../slices/store'
import {Provider} from 'react-redux'
import {useRouter} from "next/router";

function MyApp({Component, pageProps}: AppProps) {
    const {companyName, meta} = getConfig();
    const router = useRouter();

    // Hide splash screen when we are server side
    useEffect(() => {
        if (typeof window !== 'undefined' && router.isReady && router.pathname == "/") {
            const loader = document.getElementById('globalLoader');
            if (loader){
                setTimeout(() => {
                    loader.className = "hidden"
                },2000);
                setTimeout( () => {
                    loader.style.display = 'none';
                }, 3000)
            }
        }
    }, [router.isReady]);

    return <Provider store={store}>
        <Head>
            <title>{companyName} | Store</title>
            <meta name="description" content={meta.description}/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <PageHeader/>
        <Container>
            <Component {...pageProps} />
        </Container>
        <Footer/>
        <Toaster position="bottom-left"/>
    </Provider>
}

export default MyApp
