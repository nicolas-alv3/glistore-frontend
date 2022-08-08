import '../styles/globals.css'
import type { AppProps } from 'next/app';
import 'semantic-ui-css/semantic.min.css';
import React from "react";
import {Toaster} from "react-hot-toast";
import PageHeader from "../src/components/PageHeader";
import Head from "next/head";
import {getConfig} from "../src/hooks/getConfig";
import {Container} from "semantic-ui-react";
import Footer from "../src/components/Footer";
import Contexts from "../src/context/Contexts";
import { store } from './store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  const { companyName, meta } = getConfig();

  // @ts-ignore
  return <Contexts>
            <Head>
              <title>{ companyName } | Store</title>
              <meta name="description" content={meta.description} />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <PageHeader/>
            <Provider store={store}>
            <Container>
              <Component {...pageProps} />
            </Container>
            </Provider>
            <Footer />
            <Toaster position="bottom-left"/>
  </Contexts>
}

export default MyApp
