import React, { useState, useEffect } from 'react';
import { PublicKey, Connection, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';

const WalletIntegration = () => {
    const [connected, setConnected] = useState(false);
    const [wallet, setWallet] = useState(null);
    const [balanceAmount, setBalance] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const rpcUrl = 'https://long-morning-waterfall.solana-mainnet.discover.quiknode.pro/518985538e0ba735bd0b04a49dc59beb9bca4177/';

    const connection = new Connection(rpcUrl, 'confirmed');

    useEffect(() => {
        const establishConnection = async () => {
            try {
                const walletAvailable = window.solana && window.solana.isPhantom;

                if (walletAvailable) {
                    const connectedWallet = await window.solana.connect();
                    setWallet(connectedWallet);

                    const walletAddress = connectedWallet.publicKey.toString();
                    setWalletAddress(walletAddress);

                    const publicKey = new PublicKey(walletAddress);
                    const balance = await connection.getBalance(publicKey);
                    setBalance(balance);

                    setConnected(true);
                }
            } catch (error) {
                console.error('Error connecting to Phantom Wallet:', error);
            }
        };

        establishConnection();
    }, []);

    const handleButtonClick = async () => {
        if (parseFloat(inputValue) > balanceAmount) {
            alert('The amount is not enough.');
            return;
        }

        try {
            const toAddress = '64z9TxqxVXYThA5wLWoMJUynGjeqmM1vPP5NBr9WRjRy'; // Replace with recipient's Solana address
            const lamportsToSend = Math.floor(parseFloat(inputValue) * Math.pow(10, 9));

            console.log(lamportsToSend)

            const transaction = new Transaction().add(

                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey(toAddress),
                    lamports: lamportsToSend,
                })
            );

            const blockhash = (await connection.getRecentBlockhash()).blockhash;
            transaction.recentBlockhash = blockhash;
            transaction.sign(wallet);

            const signature = await sendAndConfirmTransaction(connection, transaction, [wallet]);

            console.log('Transaction Signature:', signature);
            alert('bbb')
        } catch (error) {
            console.error('Error transferring SOL:', error);
            alert('sss')
        }
    };

    return (
        <div>
            {connected ? (
                <div className='content'>
                    <div className="walletAddress">
                        <p>{walletAddress}</p>
                    </div>

                    <p>Connected to Phantom Wallet Balance: {balanceAmount / Math.pow(10, 9)}</p>

                    <div>
                        <input
                            type="number"
                            placeholder={inputValue}
                            className="input-sol"
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button onClick={handleButtonClick}>Transfer</button>
                    </div>
                </div>
            ) : (
                <p>Phantom Wallet not available or not connected!!!!</p>
            )}
        </div>
    );
};

export default WalletIntegration;