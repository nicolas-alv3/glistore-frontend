import React from "react";
import styles from '../../styles/Home.module.css';
import {Container, Divider, Grid, Header, Icon, List, Segment} from "semantic-ui-react";
import {getConfig} from "../hooks/getConfig";
import WhatsappService from "../../service/WhatsappService";
import Image from "next/image";
import largeLogo from "../../public/logo_pomelo_largo.png";
import smallLogo from "../../public/logo_pomelo_cuadrado.png";

export default function Footer() {
    return <Segment className={styles.footer} id={"footer"} vertical style={{margin: '4em 0em 0em', padding: '2em 0em'}}>
        <Container textAlign='center'>
            <Grid stackable>
                <Grid.Column width={4}>
                        <span className={styles.largeLogoFooter}>
                        <Image src={largeLogo} width={200}
                               layout={"intrinsic"} alt={"logo"}
                               objectFit={"cover"}
                               height={100} objectPosition={"center"}/>
                    </span>
                    <span className={styles.smallLogoFooter}>
                        <Image src={smallLogo} width={150} layout={"intrinsic"}
                               height={150} alt={"logo"} />
                    </span>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Header size={"small"}> Acerca de Pomelo</Header>
                    <Divider/>
                    Somos un emprendimiento joven y familiar en pleno crecimiento, nos centramos en la calidad de la
                    atención y de nuestros productos porque queremos lo mejor para los chicxs!

                </Grid.Column>
                <Grid.Column width={4}>
                    <List size='small'>
                        <Header size={"small"}> Contactanos!</Header>
                    </List>
                    <List link size='big'>
                        <List.Item as='a' href={getConfig().instagramLink}>
                            <Icon name={"instagram"}/>
                            Instagram
                        </List.Item>
                        <List.Item as='a' href={getConfig().facebookLink}>
                            <Icon name={"facebook"}/>
                            Facebook
                        </List.Item>
                        <List.Item as='a' href={WhatsappService.getWhatsappLink()}>
                            <Icon name={"whatsapp"}/>
                            Whatsapp
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