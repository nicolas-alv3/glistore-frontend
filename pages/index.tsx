import type {NextPage} from 'next';
import React from "react";
import NavbarLPage from "../src/components/LandingPage/NavbarLPage";
import styles from '../styles/LandingPage.module.css';
import Image from "next/image";
import GTitle, {GTitleSize} from "../src/components/Utils/GTitle";
import GInput from "../src/components/Utils/GInput";
import GForm from "../src/components/Utils/GForm";
import GButton, {ButtonType} from "../src/components/Utils/GButton";
import {GColors} from "../src/utils/GColors";
import {Divider} from "semantic-ui-react";

function Banner() {
    return <section className={styles.bannerContainer}>
        <div className={styles.title}>
            <GTitle size={GTitleSize.LARGE}
                    title={"Cualquier persona puede poner en marcha un negocio en cualquier lugar"}/>
            <GForm>
                <GInput label={"Correo electrónico"} error={false}/>
                <GButton fluid type={ButtonType.PRIMARY} text={"Prueba gratis"} icon={"shopping bag"}/>
            </GForm>
        </div>
        <div className={styles.bannerImg}>
            <Image src={"/landingPage/Startup life-pana.svg"}
                   layout='intrinsic'
                   width={1000}
                   height={1000}
                   alt={"logo"}
                   objectFit={"cover"} objectPosition={"center"}/>
        </div>
    </section>;
}

function ExampleCard({urlImage, text}) {
    return <div className={styles.exampleCard}>
        <GTitle size={GTitleSize.SMALL} color={GColors.SECONDARY_COLOR} centered>{text}</GTitle>
        <Image src={urlImage}
               layout='fixed'
               style={{borderRadius: 12}}
               width={200}
               height={450}
               alt={urlImage}
               objectFit={"cover"} objectPosition={"center"}/>
    </div>;
}

function Examples() {
    const images = [
        {url: "/landingPage/example-products.png", text: "Visualización de productos"},
        {url: "/landingPage/example-config.png", text: "Customizá tu nombre y descripción"},
        {url: "/landingPage/example-apariencia.png", text: "Apariencia 100% configurable"},
        {url: "/landingPage/example-menu.png", text: "Menu personalizable"},
        {url: "/landingPage/example-cart.png", text: "Carrito de compras"},
        {url: "/landingPage/example-footer.png", text: "Footer de contacto"},
    ]
    return <section className={styles.examplesSection}>
        <GTitle size={GTitleSize.LARGE} title={"Crea tu negocio online"} color={GColors.WHITE_COLOR}/>
        <Divider/>
        <GTitle size={GTitleSize.SMALL}
                title={"Crea un sitio web de comercio electrónico con herramientas potentes que te ayudarán a encontrar clientes, aumentar las ventas y gestionar tu día a día."}
                color={GColors.TERTIARY_COLOR}/>
        <div className={styles.examplesPictures}>
            {
                images.map(({url, text}) => <ExampleCard key={url} urlImage={url} text={text}/>)
            }
        </div>
    </section>;
}

function CallToAction() {
    return <section className={styles.callToAction}>
        <GTitle centered title={"Comienza la aventura de tu negocio con Glistore"} size={GTitleSize.LARGE}/>
        <GTitle centered
                title={"Prueba Glistore gratis y explora todas las herramientas y servicios que necesitas para comenzar, gestionar y hacer cecer tu negocio."}
                size={GTitleSize.SMALL}
                color={GColors.DARKGRAY_COLOR}
        />
        <GButton type={ButtonType.PRIMARY} text={"Prueba gratis"} icon={"shopping bag"} size={"large"} />
    </section>;
}

const LandingPage: NextPage = () => {
    return (
        <div>
            <NavbarLPage/>
            <main id={"main"}>
                <Banner/>
                <Examples/>
                <CallToAction/>
                <GButton fluid type={ButtonType.TRANSPARENT} icon={"arrow up"}><a href={"#main"}>De vuelta al comienzo</a></GButton>
            </main>
        </div>
    )
}

export default LandingPage
