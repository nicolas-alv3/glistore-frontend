export const parse: (string) => string= (text: string) => {
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