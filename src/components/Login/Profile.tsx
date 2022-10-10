import React from 'react';
import {useUser} from '@auth0/nextjs-auth0';
import GButton, {ButtonType} from "../Utils/GButton";
import Image from "next/image";
import GTitle, {GTitleSize} from "../Utils/GTitle";
import {GColors} from "../../utils/GColors";
import {Dropdown, Icon} from "semantic-ui-react";
import {useRouter} from "next/router";

export default function Profile() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const menuHeader = (user) => <div className={"flex-start p-1"} style={{margin:8}}>
        <GTitle style={{marginRight:8}} size={GTitleSize.SMALL} color={GColors.WHITE_COLOR}>{user.given_name as string}</GTitle>
        <Image src={user.picture as string} alt={user.name || "..."} width={32} height={32} layout={"intrinsic"} style={{borderRadius:"50%"}}/>
    </div>

    const handleRouting = (route) => () => router.push(route)

    return ( <div style={{marginRight:8}}>
        {
            user ? (
                    <Dropdown direction={"left"} trigger={menuHeader(user)} icon={false}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleRouting("/admin/settings")}><Icon name={"setting"}/>Ajustes de la tienda</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleRouting("/api/auth/logout")} ><Icon name={"log out"}/>Cerrar sesión </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            ): <GButton type={ButtonType.TRANSPARENT} text={"Ingresar"} icon={"sign-in"} />
        }
    </div>);
}