import Image from "next/image";
import logoURL from '../../public/empty_results.png'

export default function InvalidPage() {
    return <div style={{position: "absolute", padding:16, zIndex:9999999999, top:0,left:0,  width: "100vw", height:"100vh", background: "var(--col-primary2)"}}>
            <Image src={logoURL} height={500} width={500} alt={"logo"} />
            <h1 style={{backgroundColor:"var(--col-primary)", padding:12,borderRadius:16 , color: "var(--col-primary3)"}}> Hmm, hubo un problema al cargar esta página. Seguramente hay algun problema con la URL.</h1>
    </div>
}
