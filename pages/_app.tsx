import '../styles/globals.css'
import type { AppProps } from 'next/app';
import 'semantic-ui-css/semantic.min.css';
import React from "react";
import {Toaster} from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import Head from "next/head";
import {useConfig} from "../hooks/useConfig";
import {Container} from "semantic-ui-react";
import Footer from "../components/Footer";

// @ts-ignore
export const SidebarContext = React.createContext<[boolean, Function]>(null);
// @ts-ignore
export const CartContext = React.createContext<[CartItem[], Function]>([]);

function MyApp({ Component, pageProps }: AppProps) {
  const { companyName, meta } = useConfig();
  const [visible, setVisible] = React.useState(false)
  const [cart, setCart] = React.useState([])
  return <SidebarContext.Provider value={[visible, setVisible]}>
    <CartContext.Provider value={[cart, setCart]}>
      <Head>
        <title>{ companyName } | Store</title>
        <meta name="description" content={meta.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader/>
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
      <Toaster position="bottom-left"/>
    </CartContext.Provider>
  </SidebarContext.Provider>
}

export default MyApp
