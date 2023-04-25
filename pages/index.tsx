import type {NextPage} from 'next';
import React from "react";
import NavbarLPage from "../src/components/LandingPage/NavbarLPage";
import styles from '../styles/LandingPage.module.css';
import Image from "next/image";
import GTitle, {GTitleSize} from "../src/components/Utils/GTitle";

const LandingPage: NextPage = () => {
    return (
        <div className={'lp'}>
            <NavbarLPage/>
            <main>
                <div className={styles.bannerContainer}>
                    <div className={styles.title}>
                        <GTitle size={GTitleSize.LARGE} title={"Cualquier persona puede poner en marcha un negocio en cualquier lugar"} />
                    </div>
                    <div className={styles.bannerImg}>
                        <Image src={"/Startup life-pana.svg"}
                               layout='intrinsic'
                               width={1000}
                               height={1000}
                               alt={"logo"}
                               objectFit={"cover"} objectPosition={"center"}/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default LandingPage
