import styles from '../../../styles/LandingPage.module.css';
import Image from "next/image";
import React, {useEffect} from "react";
import GButton, {ButtonType} from "../Utils/GButton";
import {loadVariables} from "../../hooks/useConfig";
import {GlistoreConfig} from "../../types";
import {useGRouter} from "../../hooks/useGRouter";

export default function NavbarLPage() {
    const {router} = useGRouter();
    useEffect(() => {
        loadVariables(GlistoreConfig);
    }, [])
    return <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
            <Image src={"/landingPage/glider_logo.png"} width={120}
                   layout={"intrinsic"} alt={"logo"}
                   objectFit={"cover"}
                   height={120} objectPosition={"center"}/>
            <div>
            </div>
            <div className={styles.freeTestButton}>
                <GButton type={ButtonType.PRIMARY} icon={"shopping bag"} text={"Prueba gratis"} onClick={() => router.push("/onBoarding")} />
            </div>
        </div>
    </nav>
}
