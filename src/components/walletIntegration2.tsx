/*
import React, { useState, useEffect } from 'react';
import { PublicKey, Connection } from '@solana/web3.js';

const WalletIntegration2: React.FC = () => {
    const [connected, setConnected] = useState<boolean>(false);
    const [wallet, setWallet] = useState<any | null>(null); // Change 'any' to a more specific type if possible

    useEffect(() => {
        const establishConnection = async () => {
            try {
                const rpcUrl = 'https://long-morning-waterfall.solana-mainnet.discover.quiknode.pro/518985538e0ba735bd0b04a49dc59beb9bca4177/'; // Replace with your QuickNode Solana RPC URL
                const connection = new Connection(rpcUrl, 'confirmed');

                const walletAvailable = window.solana && window.solana.isPhantom;

                if (walletAvailable) {
                    const connectedWallet = await window.solana.connect();
                    setWallet(connectedWallet);

                    const walletAddress = connectedWallet.publicKey.toString();
                    const publicKey = new PublicKey(walletAddress);

                    const balance = await connection.getBalance(publicKey);
                    console.log(balance);

                    setConnected(true);
                }
            } catch (error) {
                console.error('Error connecting to Phantom Wallet:', error);
            }
        };

        establishConnection();
    }, []);

    return (
        <div>
            {connected ? (
                <p>Connected to Phantom Wallet</p>
            ) : (
                <p>Phantom Wallet not available or not connected</p>
            )}
        </div>
    );
};

export default WalletIntegration2;
*/
