import React from "react";
import styles from '../../styles/Home.module.css';
import {Container, Grid, Icon, List, Segment} from "semantic-ui-react";
import {useConfig} from "../hooks/useConfig";
import WhatsappService from "../../service/WhatsappService";
import Image from "next/image";
import GTitle, {GTitleSize} from "./Utils/GTitle";

export default function Footer() {
    const {config} = useConfig();

    return <Segment className={styles.footer} id={"footer"} vertical
                    style={{margin: '4em 0em 0em', padding: '2em 0em'}}>
        <Container textAlign='center'>
            <Grid stackable>
                <Grid.Column width={4}>
                        <span>
                        <Image src={config.logo || "..."} width={200}
                               layout={"intrinsic"} alt={"logo"}
                               objectFit={"cover"}
                               height={200} objectPosition={"center"}/>
                    </span>
                </Grid.Column>
                <Grid.Column width={6}>
                    <GTitle withDivider centered size={GTitleSize.SMALL}><p>Acerca de {config.companyName}</p></GTitle>
                    <p>
                        {config.description}
                    </p>

                </Grid.Column>
                <Grid.Column width={4}>
                    <List size='small'>
                        <GTitle withDivider centered size={GTitleSize.SMALL}><p>Contactanos!</p></GTitle>
                    </List>
                    <List link size='big'>
                        <List.Item as='a' href={config.instaUser}>
                            <p><Icon name={"instagram"}/>
                                Instagram</p>
                        </List.Item>
                        <List.Item as='a' href={config.fbLink}>
                            <p><Icon name={"facebook"}/>
                                Facebook</p>
                        </List.Item>
                        <List.Item as='a' href={WhatsappService.getWhatsappLink()}>
                            <p><Icon name={"whatsapp"}/>
                                Whatsapp</p>
                        </List.Item>
                    </List>
                </Grid.Column>
            </Grid>
            <List divided link size='small'>
                <List.Item className={styles.footerMeta} as='a' href='https://linktr.ee/nicolas_alvarez'>
                    Proudly developed by <b>Nicolas Alvarez</b>
                </List.Item>
            </List>
        </Container>
    </Segment>
}