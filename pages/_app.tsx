import '../styles/globals.css'
import "react-loading-skeleton/dist/skeleton.css";
import type {AppProps} from 'next/app';
import 'semantic-ui-css/semantic.min.css';
import React from "react";
import {Toaster} from "react-hot-toast";
import PageHeader from "../src/components/PageHeader";
import Head from "next/head";
import {getConfig} from "../src/hooks/getConfig";
import {Container} from "semantic-ui-react";
import Footer from "../src/components/Footer";
import {store} from '../slices/store'
import {Provider} from 'react-redux'

function MyApp({Component, pageProps}: AppProps) {
    const {companyName, meta} = getConfig();

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
