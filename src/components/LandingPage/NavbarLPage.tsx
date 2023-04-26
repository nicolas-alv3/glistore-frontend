import styles from '../../../styles/LandingPage.module.css';
import Image from "next/image";
import React, {useEffect} from "react";
import GButton, {ButtonType} from "../Utils/GButton";
import {loadVariables} from "../../hooks/useConfig";
import {GlistoreConfig} from "../../types";

export default function NavbarLPage() {
    useEffect(() => {
        loadVariables(GlistoreConfig);
    }, [])
    return <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
            <Image src={"/glider_logo.png"} width={120}
                   layout={"intrinsic"} alt={"logo"}
                   objectFit={"cover"}
                   height={120} objectPosition={"center"}/>
            <div>
                Menues
            </div>
            <div className={styles.freeTestButton}>
                <GButton type={ButtonType.PRIMARY} icon={"shopping bag"} text={"Prueba gratis"} />
            </div>
        </div>
    </nav>
}
