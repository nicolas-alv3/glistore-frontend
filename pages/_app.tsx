import '../styles/globals.css'
import "react-loading-skeleton/dist/skeleton.css";
import type {AppProps} from 'next/app';
import 'semantic-ui-css/semantic.min.css';
import React, {useEffect} from "react";
import {Toaster} from "react-hot-toast";
import PageHeader from "../src/components/PageHeader";
import {getConfig} from "../src/hooks/getConfig";
import {Container} from "semantic-ui-react";
import Footer from "../src/components/Footer";
import {store} from '../slices/store'
import {Provider} from 'react-redux'
import {NextSeo} from "next-seo";

function MyApp({Component, pageProps}: AppProps) {
    const {companyName, meta} = getConfig();

    // Hide splash screen when we are server side
    useEffect(() => {
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
    }, []);

    return <Provider store={store}>
        <NextSeo
            title={companyName+" | Store"}
            description={meta.description}
        />
        <PageHeader/>
        <Container>
            <Component {...pageProps} />
        </Container>
        <Footer/>
        <Toaster position="bottom-left"/>
    </Provider>
}

export default MyApp
