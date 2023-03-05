import {store} from "../../slices/store";
import {setCart} from "../../slices/sidebarSlice";

export function saveCartOnReload() {
    if (typeof window !== 'undefined') {
        window.onbeforeunload = function () {
            // Save cart so user do not lose progress
            window.localStorage.setItem("cart", JSON.stringify(store.getState().sidebar.cart))
        };
    }
}

export function getCartFromReload() {
    if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem("cart");
        if (item !== "null" && item) {
            store.dispatch(setCart(JSON.parse(window.localStorage.getItem("cart") as string)));
        }
    }
}

enum Environment {
    PROD = "PROD",
    DEV = "DEV",
    LOCAL = "LOCAL"
}

export function getFrontendURL() {
    switch (process.env.NEXT_PUBLIC_ENVIRONMENT) {
        case (Environment.PROD):
            return "https://glistore.vercel.app";
        case (Environment.DEV):
            return "https://glistore.vercel.app";
        case (Environment.LOCAL):
            return "http://localhost:3000";
        default:
            return "https://glistore.vercel.app";
    }
}

export function getBackendURL() {
    switch (process.env.NEXT_PUBLIC_ENVIRONMENT) {
        case (Environment.PROD):
            return "https://glistore-backend.vercel.app";
        case (Environment.DEV):
            return "https://glistore-backend.vercel.app";
        case (Environment.LOCAL):
            return "http://localhost:3001";
        default:
            return "https://glistore-backend.vercel.app";
    }
}
