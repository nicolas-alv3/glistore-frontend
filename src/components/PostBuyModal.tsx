import GModal from "./GModal";

export default function PostBuyModal({ trigger }) {
    return <GModal title={"¿Pudiste terminar la compra?"} trigger={trigger} id={"Post buy modal"} confirmText={"Vaciar carrito"}>
        Si finalizaste la compra eliminaremos el contenido de tu carrito, si no, lo dejamos como está!
    </GModal>
}