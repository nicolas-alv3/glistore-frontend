
class WhatsappService {
    isMobileBrowser = () => {
        const mobileKeywords = ["iphone", "ipad", "android"];
        const isMobileBrowser = mobileKeywords.some(w => navigator.userAgent.toLocaleLowerCase().includes(w));
        console.log("Detecting ", isMobileBrowser ? "Mobile":"Desktop", " browser")
        return isMobileBrowser;
    };

    sendWhatsappMessage(msg: string, phoneNumber: string) {
        if(this.isMobileBrowser()){
            window.open(encodeURI(`https://wa.me/${phoneNumber}?text=${msg}`));
        }
        else {
            window.open(encodeURI(`https://web.whatsapp.com/send/?phone=${phoneNumber}&text=${msg}`));
        }
    }

    getWhatsappLink(phoneNumber: string) {
        return `https://wa.me/${phoneNumber}`;
    }
}

export default new WhatsappService();