let Wallet;
export function getWallet(auto) {
    if ('phantom' in window) {
        //@ts-ignore
        const provider = window?.phantom?.solana;
        if (provider?.isPhantom) {
            Wallet = provider;
            return provider;
        }
    }
    if (auto) {
        return
    }
    alert("Please Install Solana's Phantom Wallet");
}