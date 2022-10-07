
class WhatsappService {
    isMobileBrowser = () => {
        return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) );
    };

    sendWhatsappMessage(msg: string, phoneNumber: string) {
        if(this.isMobileBrowser()){
            window.open(encodeURI(`https://wa.me/${phoneNumber}?text=${msg}`), '_blank');
        }
        else {
            window.open(encodeURI(`https://web.whatsapp.com/send/?phone=${phoneNumber}&text=${msg}`), '_blank');
        }
    }

    getWhatsappLink(phoneNumber: string) {
        return `https://wa.me/${phoneNumber}`;
    }
}

export default new WhatsappService();