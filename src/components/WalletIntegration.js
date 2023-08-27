import React, { useState, useEffect } from 'react';
import { PublicKey, Connection, clusterApiUrl } from '@solana/web3.js';

const WalletIntegration = () => {
    const [connected, setConnected] = useState(false);
    const [wallet, setWallet] = useState(null);
    const [balanceAmount, setBalance] = useState(1800);
    useEffect(() => {
        const establishConnection = async () => {
            try {
                const rpcUrl ='https://long-morning-waterfall.solana-mainnet.discover.quiknode.pro/518985538e0ba735bd0b04a49dc59beb9bca4177/'; // Replace with your QuickNode Solana RPC URL
                const connectionQuickNode = new Connection(rpcUrl, 'confirmed');


                //const connection = new Connection(clusterApiUrl('mainnet-beta'));
                const walletAvailable = window.solana && window.solana.isPhantom; //phantom Wallet ka te che

                if (walletAvailable) {
                    const connectedWallet = await window.solana.connect(); // true
                    setWallet(connectedWallet);

                    const walletAddress = connectedWallet.publicKey.toString(); //account 1 - Cdk93KCwM6CiT2N5zziww95CjbBkQvHtATT5zrFPsAhJ
                    const publicKey = new PublicKey(walletAddress);

                    const balance = await connectionQuickNode.getBalance(publicKey);
                    setBalance(balance);

                    setConnected(true);
                }
            } catch (error) {
                console.error('Error connecting to Phantom Wallet:', error);
            }
        };

        establishConnection();
    }, []);

    // Render UI based on wallet connection status
    return (
        <div>
            {connected ? (
                <p>Connected to Phantom Wallet Balance: {balanceAmount}</p>
            ) : (
                <p>Phantom Wallet not available or not connected</p>
            )}
        </div>
    );
};

export default WalletIntegration;
