export function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const source2image: any = {
    'amazon': "https://s3-symbol-logo.tradingview.com/amazon--600.png",
    'ebay': 'https://cdn.iconscout.com/icon/free/png-256/free-ebay-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-company-brand-vol-2-pack-logos-icons-2944843.png?f=webp'
}
export function getSourceLogo(source: string) {
    return source2image[source]
}

