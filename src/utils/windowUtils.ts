import {store} from "../../slices/store";
import {setCart} from "../../slices/sidebarSlice";

export function saveCartOnReload() {
    if(typeof window !== 'undefined') {
        window.onbeforeunload = function() {
            // Save cart so user do not lose progress
            window.localStorage.setItem("cart", JSON.stringify(store.getState().sidebar.cart))
        };
    }
}

export function getCartFromReload() {
    if(typeof window !== 'undefined') {
        const item = window.localStorage.getItem("cart");
        if ( item !== "null" && item ) {
            store.dispatch(setCart(JSON.parse(window.localStorage.getItem("cart") as string)));
        }
    }
}