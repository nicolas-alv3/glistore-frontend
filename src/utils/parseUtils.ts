// @ts-ignore
export const parse: (s: string | string[] | undefined) => any = (text: string) => {
    if(text) {
        try {
            return JSON.parse(text);
        }
        catch {
            console.error("There was a problem parsing URL, try adding quotes")
        }
    }
    return "";
}

export const splitURL = (s: string) => s.split(",").filter( c => c!== "")

export function withoutDuplicates<T>(array:T[]): T[] {
    return Array.from(new Set(array));

}

export function moneyPipe(amount: number) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount)
}

