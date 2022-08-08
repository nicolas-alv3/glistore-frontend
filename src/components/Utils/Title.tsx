import {Button, Divider, Header, Icon} from "semantic-ui-react";
import Link from "next/link";
import {useRouter} from "next/router";

interface Props {
    withBackButton?: boolean,
    title: string
}

export default function Title(props: Props) {
    const router = useRouter();
    return <>
        <div style={{display: "flex", alignItems: "flex-end", gap:16, justifyContent:"flex-start"}}>
            {props.withBackButton && <Button color={"facebook"} icon onClick={() => router.back()}><Icon name={"chevron left"}/></Button>}
            <Header size={"huge"}>{props.title}</Header>
        </div>
        <Divider/>
    </>
}