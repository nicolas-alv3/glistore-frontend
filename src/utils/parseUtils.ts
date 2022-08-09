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